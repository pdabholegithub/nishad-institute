'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, FlaskConical, LayoutDashboard, LogOut, LogIn, UserPlus, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
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

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.email === 'admin@nis.com';
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
        <div className="fixed inset-0 top-16 z-[100] bg-white dark:bg-slate-950 md:hidden animate-in slide-in-from-top-2 duration-500 overflow-y-auto pb-20">
          <div className="container flex flex-col gap-8 p-6">
            <div className="flex flex-col space-y-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary/80 mb-1 ml-1">Main Navigation</p>
              <nav className="grid gap-3">
                {[
                  { href: "/#courses", label: "Courses", icon: BookOpen },
                  { href: "/about", label: "About Us", icon: BookOpen },
                  { href: "/#contact", label: "Contact", icon: BookOpen }
                ].map((item, idx) => (
                  <Link 
                    key={idx}
                    href={item.href} 
                    onClick={closeMenu}
                    className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors border border-slate-100 dark:border-slate-700">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-base font-bold text-slate-800 dark:text-slate-100">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col space-y-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary/80 mb-1 ml-1">Interactive Labs</p>
              <a
                href="https://pdabholegithub.github.io/nishad-it-solutions-playground/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-between p-5 rounded-2xl border-2 border-primary/20 bg-primary/[0.03] hover:bg-primary/[0.06] transition-all group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <FlaskConical className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-slate-900 dark:text-white">Automation Playground</span>
                    <span className="block text-[10px] text-primary font-black uppercase tracking-tighter">Live Learning Environment</span>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-primary" />
              </a>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

            <div className="flex flex-col space-y-4">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-1">Secure Portal Access</p>
              <div className="grid gap-3">
                {session?.user ? (
                  <>
                    <Link 
                      href={dashboardHref}
                      onClick={closeMenu}
                      className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-base font-bold shadow-sm"
                    >
                      <LayoutDashboard className="h-6 w-6 text-slate-400" />
                      Student Dashboard
                    </Link>
                    <form action={logout} onSubmit={closeMenu}>
                      <button 
                        type="submit" 
                        className="flex items-center gap-4 p-5 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 text-red-600 text-base font-bold w-full shadow-sm"
                      >
                        <LogOut className="h-6 w-6" />
                        Log Out Safely
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      href="/login" 
                      onClick={closeMenu}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/30 transition-all gap-3 shadow-sm"
                    >
                      <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                        <LogIn className="h-6 w-6 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold">Sign In</span>
                    </Link>
                    <Link 
                      href="/signup" 
                      onClick={closeMenu}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/30 transition-all gap-3 shadow-sm"
                    >
                      <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold">Sign Up</span>
                    </Link>
                    <Link 
                      href="/#courses" 
                      onClick={closeMenu}
                      className="col-span-2 flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Join Academy Now
                      <ArrowRight className="h-6 w-6" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
