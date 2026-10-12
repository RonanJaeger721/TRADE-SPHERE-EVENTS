-- DRAFT FOUNDATION SCHEMA. NOT APPLIED TO A LIVE DATABASE.
-- Target: Supabase PostgreSQL. Requires Supabase auth schema.
-- Review and test policies, service-role boundaries and atomic functions before launch.
create extension if not exists pgcrypto;
create type public.user_role as enum ('customer','organiser','admin');
create type public.event_status as enum ('draft','pending','published','suspended','completed','cancelled');
create type public.booking_status as enum ('reserved','expired','cancelled','paid','refunded');
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null, phone text,
 role public.user_role not null default 'customer', created_at timestamptz not null default now()
);
create table public.organisers (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id),
 name text not null, approved_at timestamptz, created_at timestamptz not null default now()
);
create table public.organiser_staff (
 organiser_id uuid references public.organisers(id), user_id uuid references public.profiles(id),
 primary key (organiser_id,user_id)
);
create table public.categories (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique);
create table public.events (
 id uuid primary key default gen_random_uuid(), organiser_id uuid not null references public.organisers(id),
 category_id uuid references public.categories(id), slug text not null unique, name text not null,
 description text not null, image_path text, venue text not null, address text, city text not null,
 starts_at timestamptz not null, ends_at timestamptz not null, booking_opens_at timestamptz not null,
 booking_closes_at timestamptz not null, timezone text not null default 'Africa/Harare',
 status public.event_status not null default 'draft', is_demo boolean not null default false,
 created_at timestamptz not null default now(), check (ends_at>starts_at), check (booking_closes_at>booking_opens_at)
);
create table public.ticket_categories (
 id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id),
 name text not null, price_minor integer not null check (price_minor>=0), currency char(3) not null default 'USD',
 capacity integer not null check (capacity>0), sale_starts_at timestamptz not null, sale_ends_at timestamptz not null,
 unique(id,event_id), check (sale_ends_at>sale_starts_at)
);
create table public.seats (
 id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id),
 ticket_category_id uuid not null, section text not null, row_label text not null, seat_label text not null,
 foreign key(ticket_category_id,event_id) references public.ticket_categories(id,event_id),
 unique(event_id,section,row_label,seat_label), unique(id,event_id)
);
create table public.bookings (
 id uuid primary key default gen_random_uuid(), customer_id uuid not null references public.profiles(id),
 event_id uuid not null references public.events(id), reference text not null unique,
 idempotency_key uuid not null unique, status public.booking_status not null default 'reserved',
 expires_at timestamptz not null, total_minor integer not null check(total_minor>=0),
 currency char(3) not null default 'USD', created_at timestamptz not null default now(), unique(id,event_id)
);
create table public.booking_items (
 id uuid primary key default gen_random_uuid(), booking_id uuid not null, event_id uuid not null,
 ticket_category_id uuid not null, quantity integer not null check(quantity>0), unit_price_minor integer not null check(unit_price_minor>=0),
 foreign key(booking_id,event_id) references public.bookings(id,event_id),
 foreign key(ticket_category_id,event_id) references public.ticket_categories(id,event_id)
);
-- One active hold per seat. Expired holds released by the future transactional reserve function.
create table public.seat_holds (
 seat_id uuid primary key, event_id uuid not null, booking_id uuid not null, expires_at timestamptz not null,
 foreign key(seat_id,event_id) references public.seats(id,event_id),
 foreign key(booking_id,event_id) references public.bookings(id,event_id)
);
create table public.payment_attempts (
 id uuid primary key default gen_random_uuid(), booking_id uuid not null references public.bookings(id),
 provider text not null, merchant_reference text not null unique, provider_reference text unique,
 amount_minor integer not null check(amount_minor>=0), currency char(3) not null, status text not null,
 verified_at timestamptz, created_at timestamptz not null default now()
);
create table public.tickets (
 id uuid primary key default gen_random_uuid(), booking_item_id uuid not null references public.booking_items(id),
 event_id uuid not null references public.events(id), ordinal integer not null check(ordinal>0),
 token_hash text not null unique, attendee_name text not null, seat_id uuid,
 status text not null check(status in ('issued','checked_in','cancelled','refunded')),
 foreign key(seat_id,event_id) references public.seats(id,event_id),
 unique(booking_item_id,ordinal), unique(seat_id), unique(id,event_id)
);
create table public.check_ins (
 ticket_id uuid primary key, event_id uuid not null, operator_id uuid not null references public.profiles(id),
 checked_in_at timestamptz not null default now(), foreign key(ticket_id,event_id) references public.tickets(id,event_id)
);
create table public.sponsored_placements (
 id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id),
 starts_at timestamptz not null, ends_at timestamptz not null, approved_by uuid references public.profiles(id), check(ends_at>starts_at)
);
create table public.audit_logs (
 id bigint generated always as identity primary key, actor_id uuid references public.profiles(id),
 action text not null, entity_type text not null, entity_id uuid, metadata jsonb not null default '{}', created_at timestamptz not null default now()
);
create index event_discovery_idx on public.events(status,starts_at,city,category_id);
create index reservation_expiry_idx on public.bookings(status,expires_at);
create index booking_customer_idx on public.bookings(customer_id,created_at);
create index ticket_event_idx on public.tickets(event_id,status);
create index payment_booking_idx on public.payment_attempts(booking_id);
-- Default deny: policies added with authentication in Milestone 2. Never enable broad writes.
do $$ declare r record; begin
 for r in select tablename from pg_tables where schemaname='public' and tablename in
 ('profiles','organisers','organiser_staff','categories','events','ticket_categories','seats','bookings','booking_items','seat_holds','payment_attempts','tickets','check_ins','sponsored_placements','audit_logs')
 loop execute format('alter table public.%I enable row level security',r.tablename); end loop;
end $$;
create policy published_events_read on public.events for select using(status='published' and is_demo=false);
create policy categories_read on public.categories for select using(true);
-- No client write policies, admin role self-updates or public payment/ticket reads.
