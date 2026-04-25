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
      <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 shadow-sm p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[360px] animate-in fade-in zoom-in duration-500">
        <div className="h-20 w-20 rounded-full bg-white dark:bg-emerald-900 shadow-sm flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">Message Received!</h3>
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
              data-testid="contact-firstname"
              id="firstName"
              name="firstName"
              required
              placeholder="Rajesh"
              className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
            <input
              data-testid="contact-lastname"
              id="lastName"
              name="lastName"
              required
              placeholder="Kumar"
              className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="contactEmail" className="text-sm font-medium">Email Address</label>
          <input
            data-testid="contact-email"
            id="contactEmail"
            name="email"
            type="email"
            required
            placeholder="rajesh@email.com"
            className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="contactPhone" className="text-sm font-medium">Phone Number</label>
          <input
            data-testid="contact-phone"
            id="contactPhone"
            name="phone"
            type="tel"
            required
            placeholder="+91 70209 08516"
            className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="interestedCourse" className="text-sm font-medium">Interested Course</label>
          <select
            data-testid="contact-course"
            id="interestedCourse"
            name="course"
            className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
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
            className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700 resize-none"
          />
        </div>
        <button
          data-testid="contact-submit"
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
