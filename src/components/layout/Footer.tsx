import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Nishad IT</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-balance leading-relaxed">
              Empowering the next generation of software engineers through comprehensive, industry-relevant training and hands-on projects.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Programs</h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/#courses" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">QA Automation</Link></li>
              <li><Link href="/#courses" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">Full-stack Dev</Link></li>
              <li><Link href="/#courses" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">Cloud & DevOps</Link></li>
              <li>
                <a
                  href="https://pdabholegithub.github.io/nishad-it-solutions-playground/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors py-0.5"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live Playground
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">About Us</Link></li>
              <li><Link href="/careers" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">Careers</Link></li>
              <li><Link href="/#contact" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Legal</h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">Privacy Policy</Link></li>
              <li><Link href="/terms" className="relative hover:text-primary transition-colors py-0.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Nishad IT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
