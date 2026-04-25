import Link from 'next/link';
import { BookOpen, Menu, FlaskConical } from 'lucide-react';
import { auth } from '@/auth';
import { logout } from '@/lib/actions';

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                Nishad IT Solutions
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/#courses" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">
              Courses
            </Link>
            <Link href="/about" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">
              About Us
            </Link>
            <Link href="/#contact" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">
              Contact
            </Link>
            <a
              href="https://pdabholegithub.github.io/nishad-it-solutions-playground/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors py-1 border border-emerald-500/30 hover:border-emerald-500/60 rounded-full px-3 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/60"
            >
              <FlaskConical className="h-3.5 w-3.5" />
              Playground
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <>
                <Link 
                  href={((session.user as any).role === 'ADMIN' || session.user?.email === 'admin@nishad.com') ? "/admin" : "/student"}
                  className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left"
                >
                  Dashboard
                </Link>
                <form action={logout}>
                  <button type="submit" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">
                  Sign In
                </Link>
                <Link href="/signup" className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">
                  Sign Up
                </Link>
                <Link 
                  href="/#courses" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Enroll Now
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
