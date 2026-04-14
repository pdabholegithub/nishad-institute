import Link from "next/link";
import { ArrowRight, Code2, Cpu, CheckCircle2, LayoutTemplate, Phone, Mail, MapPin, Star } from "lucide-react";
import { CourseCatalog } from "@/components/marketing/CourseCatalog";
import prisma from "@/lib/prisma";
import { ContactForm } from "@/components/marketing/ContactForm";

export const dynamic = 'force-dynamic';


export default async function Home() {
  // Fetch real stats from DB
  const [totalStudents, totalCourses, totalBatches] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.course.count(),
    prisma.batch.count(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40 bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 h-[400px] w-[700px] rounded-full bg-primary/20 opacity-20 blur-[120px]"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Admissions Open — Summer 2026 Batches
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance mb-6">
            Launch Your IT Career <br className="hidden md:inline" />
            With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              Industry Experts
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 text-balance">
            Master Software Testing, Full-Stack Development, and DevOps with our intensive,
            project-based curriculum designed for actual job readiness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#courses"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2 w-full sm:w-auto"
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
            >
              Book a Free Counseling Session
            </Link>
          </div>
          {/* Social Proof Strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Live Zoom Sessions</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 1-to-1 Mentorship</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Job Placement Support</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Lifetime Access to Notes</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white dark:bg-slate-900" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Nishad IT Solutions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don&apos;t just teach theory; we build practical skills through real-world scenarios so you can crack interviews with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Practical Approach</h3>
              <p className="text-muted-foreground">Every concept is accompanied by hands-on labs and real-world project scenarios from top tech companies.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <LayoutTemplate className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Industry Standard Stack</h3>
              <p className="text-muted-foreground">Learn the exact tech stacks, frameworks, and patterns used by modern enterprises and hot startups.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                <Cpu className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Placement Assistance</h3>
              <p className="text-muted-foreground">Get resume building workshops, mock interviews, and direct referrals to our network of hiring partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog — real data from Prisma */}
      <CourseCatalog />

      {/* Dynamic Stats Section */}
      <section className="py-20 border-y bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{totalStudents > 0 ? `${totalStudents}+` : "500+"}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Students Enrolled</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{totalCourses > 0 ? totalCourses : "10+"}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Expert Courses</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary">{totalBatches > 0 ? totalBatches : "35+"}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Batches Run</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-primary flex items-center justify-center gap-1">
                4.9 <Star className="h-7 w-7 fill-primary text-primary" />
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900" id="about">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real feedback from real learners who transformed their careers with us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Priya Patel", role: "QA Engineer @ TCS", text: "The QA Automation course was extremely practical. I landed my first job within 2 months of completing the program. Highly recommend!", rating: 5 },
              { name: "Rahul Sharma", role: "Full-Stack Dev @ Infosys", text: "Best investment I ever made. The mentors have real industry experience and the batch schedule was perfect for working professionals.", rating: 5 },
              { name: "Sneha Deshpande", role: "DevOps Engineer @ Wipro", text: "The DevOps curriculum is up-to-date with the latest tools. The live sessions and hands-on projects gave me the confidence I needed.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Lead Capture Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t" id="contact">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Left: info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
                <p className="text-muted-foreground text-lg">
                  Have questions about our courses? Our counselors are ready to guide you towards the right program for your career goals.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Call Us</p>
                    <p className="font-semibold">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email Us</p>
                    <p className="font-semibold">hello@nishad-it.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Location</p>
                    <p className="font-semibold">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-blue-600/10 border border-primary/20 p-6">
                <p className="font-semibold mb-2">🎁 Free Demo Class</p>
                <p className="text-sm text-muted-foreground">Fill out the form and we will schedule a free demo class so you can experience our teaching style firsthand.</p>
              </div>
            </div>
            {/* Right: Contact Form (Client Component) */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
