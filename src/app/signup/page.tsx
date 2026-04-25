"use client";

import Link from "next/link";
import { BookOpen, KeyRound, Mail, User, ArrowRight, AlertCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { registerUser } from "@/lib/actions";

export default function SignupPage() {
  const [errorMessage, dispatch] = useFormState(registerUser, undefined);

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 font-bold mb-8">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl text-foreground">Nishad IT Space</span>
            </Link>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form action={dispatch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <input
                    data-testid="signup-name"
                    type="text"
                    name="name"
                    required
                    className="block w-full rounded-md border-0 py-2.5 pl-10 ring-1 ring-inset ring-input focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Email address
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <input
                    data-testid="signup-email"
                    type="email"
                    name="email"
                    required
                    className="block w-full rounded-md border-0 py-2.5 pl-10 ring-1 ring-inset ring-input focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <input
                    data-testid="signup-password"
                    type="password"
                    name="password"
                    required
                    className="block w-full rounded-md border-0 py-2.5 pl-10 ring-1 ring-inset ring-input focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-background"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-100 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <SignupButton />
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-950 p-12">
        <div className="max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <BookOpen className="mx-auto h-24 w-24 text-primary opacity-20" />
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Start Your Journey Today
          </h2>
          <p className="text-lg leading-8 text-slate-300 mx-auto max-w-xl text-balance">
            Create an account to browse courses, enroll in live masterclasses, and kickstart your IT career.
          </p>
        </div>
      </div>
    </div>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-between mt-6">
      <button
        data-testid="signup-submit"
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="flex w-full justify-center items-center rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group transition-all disabled:opacity-50"
      >
        {pending ? "Creating account..." : "Sign up securely"}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
