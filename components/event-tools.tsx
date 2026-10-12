"use client";
import { useState, useEffect } from "react";
export function Countdown({ date }: { date: string }) {
  const [text, setText] = useState("Calculating event countdown…");
  useEffect(() => {
    const update = () => {
      const diff = new Date(date).getTime() - Date.now();
      setText(
        diff <= 0
          ? "This demonstration event has started"
          : Math.floor(diff / 86400000) +
              " days · " +
              (Math.floor(diff / 3600000) % 24) +
              " hours · " +
              (Math.floor(diff / 60000) % 60) +
              " minutes",
      );
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [date]);
  return <p className="countdown">{text}</p>;
}
export function Share() {
  const [message, setMessage] = useState("Share experience");
  return (
    <button
      className="button outline"
      onClick={async () => {
        try {
          if (navigator.share)
            await navigator.share({
              title: document.title,
              url: location.href,
            });
          else {
            await navigator.clipboard.writeText(location.href);
            setMessage("Link copied");
          }
        } catch {
          setMessage("Copy the address from your browser");
        }
      }}
    >
      {message} ↗
    </button>
  );
}
