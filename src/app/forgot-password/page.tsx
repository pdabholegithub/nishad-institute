"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
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

  return (
    <div className="flex min-h-screen">
      {/* Left Pane - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 font-bold mb-8">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl text-foreground">Automation Playground</span>
            </Link>
            
            <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to login
            </Link>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <div className="mt-10">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 shadow-sm p-8 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-500">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-emerald-900 shadow-sm flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-50">Check your email</h3>
                <p className="text-emerald-800/80 dark:text-emerald-200/80 text-sm max-w-xs">
                  If an account exists with that email, we have sent password reset instructions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Email address
                  </label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <input
                      data-testid="forgot-email"
                      type="email"
                      name="email"
                      required
                      className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-2 pl-10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
                      placeholder="student@nishad.com"
                    />
                  </div>
                </div>

                <button
                  data-testid="forgot-submit"
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center items-center rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Right Pane - Visual Area */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-950 p-12">
        <div className="max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <BookOpen className="mx-auto h-24 w-24 text-primary opacity-20" />
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Secure Account Recovery
          </h2>
          <p className="text-lg leading-8 text-slate-300 mx-auto max-w-xl text-balance">
            We take your security seriously. Follow the instructions sent to your registered email to safely regain access to your courses and dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
