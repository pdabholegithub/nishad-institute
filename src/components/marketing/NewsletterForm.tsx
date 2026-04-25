'use client';

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    // In a real app, you'd send this to an API
  };

  if (subscribed) {
    return (
      <div className="py-4 animate-in fade-in zoom-in duration-500">
        <p className="text-primary font-bold">🎉 Thank you for subscribing!</p>
        <p className="text-sm text-muted-foreground">Check your inbox for the welcome guide.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-5 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
        required
      />
      <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-[0.95]">
        Subscribe
      </button>
    </form>
  );
}
