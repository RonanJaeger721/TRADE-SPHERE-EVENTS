import type { Metadata } from "next";
import { Shell } from "@/components/shell";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Trade Sphere Events — Connect. Experience. Create memories.",
    template: "%s | Trade Sphere Events",
  },
  description:
    "Discover the moments worth attending. Trade Sphere Events marketplace design preview for Zimbabwe.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
