import { BookOpen, Target, Users, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 font-bold mb-12 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xl">Nishad IT Solutions</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight mb-6">About Nishad IT Solutions</h1>
          
          <div className="space-y-8 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
              <p>
                At Nishad IT Solutions, our mission is to bridge the gap between academic education and industry requirements. 
                We provide high-quality, practical training in software testing, development, and infrastructure management 
                to empower the next generation of IT professionals.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <Target className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Practical Focus</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">100% hands-on learning with real-world projects and industry scenarios.</p>
              </div>
              <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                <Users className="h-8 w-8 text-amber-600 mb-4" />
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Expert Mentorship</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Learn from professionals currently working in top-tier tech companies.</p>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Story</h2>
              <p>
                Founded in Pune, Maharashtra, Nishad IT Solutions started with a simple vision: to make quality IT education 
                accessible and job-oriented. Over the years, we have trained hundreds of students who are now successfully 
                placed in leading MNCs across the globe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Why We Are Different</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Industry-Aligned Curriculum:</strong> We update our courses every quarter to match current market trends.</li>
                <li><strong>Small Batch Sizes:</strong> We ensure personalized attention to every student.</li>
                <li><strong>Placement Support:</strong> Dedicated assistance for resume building and interview preparation.</li>
                <li><strong>Lifetime Support:</strong> Our relationship doesn&apos;t end with the course; we support our alumni throughout their careers.</li>
              </ul>
            </section>

            <div className="mt-12 p-8 rounded-2xl bg-slate-900 text-white text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="mb-6 text-slate-400">Join our next batch and transform your career with industry-recognized certification.</p>
              <Link href="/#courses" className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium hover:bg-blue-700 transition-colors">
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
