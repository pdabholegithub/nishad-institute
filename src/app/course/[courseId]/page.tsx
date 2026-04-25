import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, CheckCircle2, ChevronLeft, Award, LayoutGrid, Timer } from "lucide-react";
import courseModulesData from "@/data/courseModules.json";
import { auth } from "@/auth";
import { CheckoutButton } from "@/components/marketing/CheckoutButton";

interface CourseModule {
  id: string;
  title: string;
  lessons: { title: string }[];
}

interface CourseData {
  id: string;
  title: string;
  modules: CourseModule[];
}

export default async function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const session = await auth();
  const course = await prisma.course.findUnique({
    where: { id: params.courseId }
  });

  if (!course) {
    notFound();
  }

  // Get syllabus from our JSON data or fallback to basic data
  const courseSyllabus = (courseModulesData as Record<string, CourseData>)[course.id];
  
  const features = course.features.split(',');
  const techs = course.technologies.split(',');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 lg:py-24 border-b border-slate-800 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl opacity-30" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link href="/#courses" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Courses
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/50">
              {course.level}
            </span>
            {course.popular && (
              <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/50 flex items-center gap-1">
                <Award className="h-4 w-4" /> Most Popular
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            {course.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-8 text-sm font-bold text-slate-300 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              <span>Live Support</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Certification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          
          {/* Syllabus Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black flex items-center gap-3">
                  <LayoutGrid className="h-8 w-8 text-secondary" /> 
                  Curriculum Roadmap
                </h2>
                <p className="text-muted-foreground mt-2">A comprehensive journey from basics to advanced industry standards.</p>
              </div>
            </div>

            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-8 before:bottom-8 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
              {courseSyllabus?.modules.map((module, i) => (
                <div key={module.id} className="relative pl-12 group">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 h-10 w-10 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center z-10 group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-sm">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-primary">{i + 1}</span>
                  </div>
                  
                  <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                    <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                      {module.title}
                      <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Module {i + 1}</span>
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                      {module.lessons.map((lesson, j) => (
                        <li key={j} className="flex items-start gap-3 group/item">
                          <CheckCircle2 className="h-5 w-5 text-primary/40 group-hover/item:text-primary transition-colors shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80 leading-snug">{lesson.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies */}
          <section className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Technologies You&apos;ll Master</h2>
            <div className="flex flex-wrap gap-4">
              {techs.map(tech => (
                <div key={tech} className="bg-white dark:bg-slate-800 text-foreground px-6 py-3 rounded-xl font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform cursor-default">
                  {tech.trim()}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Floating Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl sticky top-24 ring-1 ring-primary/5">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Enrollment Open</h3>
                <div className="text-5xl font-black tracking-tighter">
                  ₹{parseInt(course.price).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">One-time payment • Lifetime access</p>
              </div>
              
              <div className="space-y-3">
                {session?.user ? (
                  <CheckoutButton 
                    courseId={course.id} 
                    price={course.price} 
                    courseTitle={course.title}
                    userEmail={session.user.email as string}
                    userName={session.user.name as string}
                  />
                ) : (
                  <Link 
                    href="/signup"
                    className="flex w-full justify-center items-center rounded-2xl bg-primary px-3 py-5 text-lg font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Join Course Now
                  </Link>
                )}
                <Link 
                  href="/#contact"
                  className="flex w-full justify-center items-center rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-transparent px-3 py-4 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Book Demo Class
                </Link>
              </div>

              <div className="pt-8 space-y-5 border-t border-slate-100 dark:border-slate-800">
                <p className="font-black text-xs uppercase tracking-widest text-slate-400">Everything Included</p>
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/20 transition-colors">
                      <CheckCircle2 className="h-3 w-3 text-secondary" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{f.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
