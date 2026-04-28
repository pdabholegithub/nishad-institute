"use client";

import Link from "next/link";
import { BookOpen, KeyRound, Mail, ArrowRight, AlertCircle } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [showDemo, setShowDemo] = React.useState(false);
  const [pinInput, setPinInput] = React.useState("");
  const [pinError, setPinError] = React.useState(false);

  const handleUnlockDemo = () => {
    // For demo purposes, we check against the same PIN. 
    // In a production app, this would be a server-side check.
    if (pinInput === "Nishad@2026") {
      setShowDemo(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Pane - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 font-bold mb-8">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl text-foreground">Nishad IT Space</span>
            </Link>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/#courses" className="font-medium text-primary hover:text-primary/80">
                Enroll in a course today
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form action={dispatch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Email address
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <input
                    data-testid="login-email"
                    type="email"
                    name="email"
                    required
                    className="block w-full rounded-md border-0 py-2.5 pl-10 ring-1 ring-inset ring-input focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                    placeholder="student@nis.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/80 text-sm">
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <input
                    data-testid="login-password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-2.5 pl-10 ring-1 ring-inset ring-input focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-100 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <LoginButton />
              
              <div className="relative mt-12">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Restricted Demo Access</span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl border border-dashed border-border bg-slate-50/50 dark:bg-slate-900/50">
                {!showDemo ? (
                  <div className="space-y-3">
                    <p className="text-[10px] text-center text-muted-foreground uppercase font-semibold">Enter Security PIN to unlock credentials</p>
                    <div className="flex gap-2">
                      <input 
                        type="password" 
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Security PIN"
                        className={`flex-1 h-9 rounded-md border ${pinError ? 'border-red-500' : 'border-input'} bg-background px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary`}
                      />
                      <button 
                        type="button"
                        onClick={handleUnlockDemo}
                        className="h-9 px-3 rounded-md bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
                      >
                        Unlock
                      </button>
                    </div>
                    {pinError && <p className="text-[10px] text-red-500 text-center">Invalid PIN. Access denied.</p>}
                  </div>
                ) : (
                  <div className="text-center space-y-2 animate-in fade-in zoom-in duration-300">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-1">
                      <span className="h-1 w-1 rounded-full bg-green-600 animate-pulse"></span>
                      UNLOCKED
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Admin</p>
                        <p className="text-xs font-medium">admin@nis.com</p>
                        <p className="text-[10px] text-slate-400">password123</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Student</p>
                        <p className="text-xs font-medium">student@nis.com</p>
                        <p className="text-[10px] text-slate-400">password123</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Pane - Visual Area */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-950 p-12">
        <div className="max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <BookOpen className="mx-auto h-24 w-24 text-primary opacity-20" />
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Your Gateway to Tech Excellence
          </h2>
          <p className="text-lg leading-8 text-slate-300 mx-auto max-w-xl text-balance">
            Log in to access your course materials, join live masterclasses, and collaborate with your peers and mentors in real-time.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="h-2 w-2 rounded-full bg-primary/40"></span>
            <span className="h-2 w-2 rounded-full bg-primary/40"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        data-testid="login-submit"
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="flex w-full justify-center items-center rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group transition-all disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in securely"}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
