'use client';

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate a small network delay for realistic feel
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card shadow-sm p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[360px]">
        <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold">Message Received!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Thank you for reaching out. Our team will contact you within 24 hours to schedule your free demo class.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8">
      <h3 className="text-xl font-bold mb-1">Request a Free Demo</h3>
      <p className="text-sm text-muted-foreground mb-6">No commitment required. Just fill in your details below.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
            <input
              id="firstName"
              name="firstName"
              required
              placeholder="Rajesh"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              required
              placeholder="Kumar"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="contactEmail" className="text-sm font-medium">Email Address</label>
          <input
            id="contactEmail"
            name="email"
            type="email"
            required
            placeholder="rajesh@email.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="contactPhone" className="text-sm font-medium">Phone Number</label>
          <input
            id="contactPhone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="interestedCourse" className="text-sm font-medium">Interested Course</label>
          <select
            id="interestedCourse"
            name="course"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="">-- Select a course --</option>
            <option value="qa">QA Automation Engineering</option>
            <option value="fullstack">Full-Stack Web Development</option>
            <option value="devops">Cloud &amp; DevOps Mastery</option>
            <option value="java">Core Java Fundamentals</option>
            <option value="other">Other / Not Sure Yet</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="contactMessage" className="text-sm font-medium">Message (Optional)</label>
          <textarea
            id="contactMessage"
            name="message"
            rows={3}
            placeholder="Tell us about your background and goals..."
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
