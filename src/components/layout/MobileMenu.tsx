'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, FlaskConical, LayoutDashboard, LogOut, LogIn, UserPlus } from 'lucide-react';
import { logout } from '@/lib/actions';

interface MobileMenuProps {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    } | null;
  } | null;
}

export function MobileMenu({ session }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.email === 'admin@nishad.com';
  const dashboardHref = isAdmin ? '/admin' : '/student';

  return (
    <div className="flex md:hidden">
      <button 
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden animate-in slide-in-from-top-2 duration-300">
          <div className="container flex flex-col gap-6 p-6">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/#courses" 
                onClick={closeMenu}
                className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Courses
              </Link>
              <Link 
                href="/about" 
                onClick={closeMenu}
                className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5 opacity-0" /> {/* Spacer */}
                About Us
              </Link>
              <Link 
                href="/#contact" 
                onClick={closeMenu}
                className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5 opacity-0" /> {/* Spacer */}
                Contact
              </Link>
              <a
                href="https://pdabholegithub.github.io/nishad-it-solutions-playground/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 text-lg font-medium text-primary"
              >
                <FlaskConical className="h-5 w-5" />
                Automation Playground
              </a>
            </nav>

            <div className="h-px bg-border w-full" />

            <div className="flex flex-col space-y-4">
              {session?.user ? (
                <>
                  <Link 
                    href={dashboardHref}
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <form action={logout} onSubmit={closeMenu}>
                    <button 
                      type="submit" 
                      className="flex items-center gap-2 text-lg font-medium text-red-500 hover:text-red-600 transition-colors w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                  >
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </Link>
                  <Link 
                    href="/#courses" 
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    Enroll Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
