import { BookOpen, Briefcase, GraduationCap, Laptop } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const jobs = [
    {
      title: "QA Automation Instructor",
      location: "Pune / Remote",
      type: "Part-time / Full-time",
      description: "Looking for an expert in Playwright/Selenium to lead our automation batches."
    },
    {
      title: "Frontend Developer (Next.js)",
      location: "Remote",
      type: "Contract",
      description: "Help us build the future of EdTech with modern React and Next.js."
    },
    {
      title: "Career Counselor",
      location: "Pune",
      type: "Full-time",
      description: "Guide aspiring students to choose the right career path in IT."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 font-bold mb-12 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-orange-600" />
          <span className="text-xl">Nishad IT Solutions</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Careers</h1>
          <p className="text-slate-500 mb-8 font-medium">Join our mission to empower the next generation of engineers.</p>
          
          <div className="space-y-8 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Why Work With Us?</h2>
              <div className="grid sm:grid-cols-2 gap-4 not-prose mb-8">
                <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <Laptop className="h-5 w-5 text-orange-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Modern Tech</h4>
                    <p className="text-xs text-slate-500">Work with the latest tools and frameworks.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <GraduationCap className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Continuous Learning</h4>
                    <p className="text-xs text-slate-500">Free access to all our institute courses.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="not-prose">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Open Positions</h2>
              <div className="space-y-4">
                {jobs.map((job, i) => (
                  <div key={i} className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all bg-white dark:bg-slate-900/50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{job.title}</h3>
                      <span className="text-[10px] px-2 py-1 rounded bg-orange-50 dark:bg-orange-900/30 text-orange-600 font-bold uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {job.location}
                      </span>
                      <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                        Apply Now &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-orange-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Don&apos;t See a Fit?</h2>
              <p className="mb-6 opacity-90">We are always looking for passionate people to join us. Send your resume to:</p>
              <a href="mailto:careers@nis.com" className="text-xl font-bold underline hover:opacity-80 transition-opacity">
                careers@nis.com
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
