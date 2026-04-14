import Link from 'next/link';
import { BookOpen } from 'lucide-react';

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
            <p className="text-sm text-muted-foreground text-balance">
              Empowering the next generation of software engineers through comprehensive, industry-relevant training and hands-on projects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Programs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#qa" className="hover:text-primary transition-colors">QA Automation</Link></li>
              <li><Link href="#fullstack" className="hover:text-primary transition-colors">Full-stack Dev</Link></li>
              <li><Link href="#devops" className="hover:text-primary transition-colors">Cloud & DevOps</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nishad IT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
