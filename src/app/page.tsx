import Link from "next/link";
import { ArrowRight, Code2, Cpu, CheckCircle2, LayoutTemplate, Phone, Mail, MapPin, Star, FlaskConical, ExternalLink, Zap, ChevronRight, FileText, Download, Bookmark, Terminal } from "lucide-react";
import { CourseCatalog } from "@/components/marketing/CourseCatalog";
import prisma from "@/lib/prisma";
import { ContactForm } from "@/components/marketing/ContactForm";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { CountdownTimer } from "@/components/marketing/CountdownTimer";
import { unstable_cache } from "next/cache";

// Cache the page for 60 seconds, revalidate in background (ISR)
export const revalidate = 60;

// Cached DB query — only hits the DB once per 60s, not on every request
const getHomeStats = unstable_cache(
  async () => {
    const [totalStudents, totalCourses, totalBatches] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.course.count(),
      prisma.batch.count(),
    ]);
    return { totalStudents, totalCourses, totalBatches };
  },
  ["home-stats"],
  { revalidate: 60 }
);

const getUpcomingBatches = unstable_cache(
  async () => {
    const now = new Date();
    return prisma.batch.findMany({
      where: {
        startDate: {
          gte: now
        }
      },
      take: 4,
      orderBy: {
        startDate: 'asc'
      },
      include: {
        course: {
          select: {
            title: true
          }
        }
      }
    });
  },
  ["upcoming-batches"],
  { revalidate: 60 }
);

const getFAQs = unstable_cache(
  async () => prisma.fAQ.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
  ["faqs-list"],
  { revalidate: 60 }
);

const getTestimonials = unstable_cache(
  async () => prisma.testimonial.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' }, take: 6 }),
  ["testimonials-list"],
  { revalidate: 60 }
);

const getSiteSettings = unstable_cache(
  async () => {
    const settings = await prisma.siteSetting.findMany();
    return settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);
  },
  ["site-settings"],
  { revalidate: 60 }
);

export default async function Home() {
  const { totalStudents, totalCourses, totalBatches } = await getHomeStats();
  const upcomingBatches = await getUpcomingBatches();
  const faqs = await getFAQs();
  const testimonials = await getTestimonials();
  const settings = await getSiteSettings();

  const countdownDate = settings['countdown_date'] || '2026-06-01T00:00:00';

  // Fallback data if DB is empty
  const defaultFAQs = [
    { question: "Do I need a technical background to start?", answer: "No! Our courses are designed to take you from scratch to an expert level. We start with basics and gradually move to advanced concepts." },
    { question: "Will I get a certificate after completion?", answer: "Yes, you will receive an industry-recognized certificate from Nishad IT Solutions upon successful completion of your course and projects." },
    { question: "Is job placement assistance provided?", answer: "Absolutely. We offer dedicated placement support, including resume building, mock interviews, and referrals to our hiring partners." },
    { question: "Are the classes live or pre-recorded?", answer: "Most of our primary sessions are 100% Live Zoom sessions with expert mentors, accompanied by recorded backups for your future reference." }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;

  const defaultTestimonials = [
    { name: "Priya Patel", role: "QA Engineer @ TCS", text: "The QA Automation course was extremely practical. I landed my first job within 2 months of completing the program. Highly recommend!", rating: 5 },
    { name: "Rahul Sharma", role: "Full-Stack Dev @ Infosys", text: "Best investment I ever made. The mentors have real industry experience and the batch schedule was perfect for working professionals.", rating: 5 },
    { name: "Sneha Deshpande", role: "DevOps Engineer @ Wipro", text: "The DevOps curriculum is up-to-date with the latest tools. The live sessions and hands-on projects gave me the confidence I needed.", rating: 5 },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div className="flex flex-col min-h-screen">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Nishad IT Solutions",
            "url": "https://nishad-institute.vercel.app/",
            "logo": "https://nishad-institute.vercel.app/images/logo.png",
            "description": "Premium IT training institute for QA Automation, Full-stack Development, and DevOps.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://github.com/pdabholegithub",
              "https://pdabholegithub.github.io/nishad-it-solutions-playground/"
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b12_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 h-[400px] w-[700px] rounded-full bg-primary/20 opacity-20 blur-[120px]"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Summer 2026 Admissions Open
            </div>
            <CountdownTimer targetDate={countdownDate} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance mb-6">
            Launch Your IT Career <br className="hidden md:inline" />
            With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-600">
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
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] gap-2 w-full sm:w-auto"
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              Book a Free Counseling
            </Link>
          </div>
          {/* Social Proof Strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Live Zoom Sessions</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> 1-to-1 Mentorship</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Job Placement Support</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Lifetime Access to Notes</span>
          </div>
        </div>
      </section>

      {/* FAQ Section (Enhancement) */}
      <section className="py-16 bg-muted/50 dark:bg-slate-950" id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to know about our courses and support.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {displayFAQs.map((faq, i) => (
              <details key={i} className="group rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all duration-300 open:ring-2 open:ring-primary/20">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold hover:text-primary transition-colors">
                  {faq.question}
                  <span className="ml-4 transition-transform group-open:rotate-180">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners Section (Enhancement) */}
      <section className="py-12 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Our Students are Hired By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "HCLTech"].map((company) => (
              <span key={company} className="text-2xl md:text-3xl font-black text-slate-400 dark:text-slate-600 tracking-tighter">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-10 bg-background" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
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
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <LayoutTemplate className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Industry Standard Stack</h3>
              <p className="text-muted-foreground">Learn the exact tech stacks, frameworks, and patterns used by modern enterprises and hot startups.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Placement Assistance</h3>
              <p className="text-muted-foreground">Get resume building workshops, mock interviews, and direct referrals to our network of hiring partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog — real data from Prisma */}
      <CourseCatalog />

      {/* Upcoming Batches Section (New) */}
      {upcomingBatches.length > 0 && (
        <section className="py-16 bg-white dark:bg-slate-900 border-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Upcoming Live Batches</h2>
                <p className="text-muted-foreground">Secure your spot in our next live masterclass. Limited seats per batch to ensure personal attention.</p>
              </div>
              <Link href="#contact" className="text-secondary font-bold flex items-center gap-2 hover:underline">
                View full schedule <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-background">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Course Name</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Batch Name</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Start Date</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500">Schedule</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {upcomingBatches.map((batch) => (
                      <tr key={batch.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-5">
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {batch.course.title}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-bold px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20">
                            {batch.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-medium">
                          {new Date(batch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-5 text-sm text-muted-foreground">
                          {batch.schedule}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <Link href="#contact" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all">
                            Enroll Now
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Stats Section */}
      <section className="py-12 border-y bg-slate-50 dark:bg-slate-950">
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

      {/* === LIVE PLAYGROUND BANNER === */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-orange-100 dark:border-orange-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-primary p-1 shadow-2xl shadow-secondary/20">
            <div className="relative rounded-[calc(1.5rem-4px)] bg-slate-950 px-8 py-12 md:px-16 md:py-16 overflow-hidden">
              {/* Background glow blobs */}
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
              
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left content */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-amber-400">
                    <Zap className="h-3.5 w-3.5 fill-amber-400" />
                    Interactive Learning Environment
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    Practice with Our{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">
                      Live Automation Playground
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg max-w-xl mx-auto lg:mx-0">
                    Experiment with QA automation scripts, explore frameworks, and sharpen your skills in our dedicated browser-based Automation Playground — no setup required.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {["Playwright", "Selenium", "Python", "JavaScript", "Java", "API Testing"].map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right CTA */}
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shadow-lg shadow-primary/30 animate-pulse">
                    <FlaskConical className="h-10 w-10 text-white" />
                  </div>
                  <a
                    href="https://pdabholegithub.github.io/nishad-it-solutions-playground/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-indigo-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-secondary/30 hover:from-secondary/90 hover:to-indigo-800 transition-all hover:scale-105 hover:shadow-secondary/50"
                  >
                    Open Automation Playground
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="text-xs text-slate-500">Opens in a new tab • Free to use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white dark:bg-slate-900" id="about">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real feedback from real learners who transformed their careers with us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-orange-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
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

      {/* --- NEW: FREE RESOURCES / STUDY VAULT SECTION --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden" id="resources">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Master the Tech Stack with our <br />
                <span className="text-primary">Free Study Resources</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                We believe in empowering learners. Access our curated collection of expert-written cheat sheets, interview guides, and technical notes.
              </p>
            </div>
            <Link href="/signup" className="group inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4 font-bold shadow-sm hover:border-primary transition-all">
              <Bookmark className="h-5 w-5 text-primary group-hover:fill-primary transition-all" />
              Access Full Study Vault
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Playwright Cheat Sheet", 
                desc: "Quick reference for locators, assertions, and auto-waiting strategies.", 
                icon: Terminal, 
                color: "bg-orange-500",
                type: "PDF Guide"
              },
              { 
                title: "QA Interview Blueprint", 
                desc: "Top 50 technical and behavioral questions asked at TCS, Infosys & Wipro.", 
                icon: FileText, 
                color: "bg-indigo-500",
                type: "E-Book"
              },
              { 
                title: "Java Collections Ref", 
                desc: "Master ArrayList, HashMap, and Streams with visual diagrams.", 
                icon: Code2, 
                color: "bg-amber-500",
                type: "Cheat Sheet"
              },
              { 
                title: "DevOps Roadmap 2026", 
                desc: "Complete guide to mastering AWS, Docker, and Kubernetes this year.", 
                icon: Cpu, 
                color: "bg-emerald-500",
                type: "Strategy Map"
              }
            ].map((resource, i) => (
              <div key={i} className="group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`h-10 w-10 rounded-xl ${resource.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <resource.icon className={`h-5 w-5 ${resource.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-1 block">{resource.type}</span>
                <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors">{resource.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {resource.desc}
                </p>
                <Link href="/signup" className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white group/btn hover:text-primary transition-colors">
                  <Download className="h-3.5 w-3.5 text-primary group-hover/btn:translate-y-0.5 transition-transform" />
                  Download Now
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle_at_top_right,var(--primary),transparent)]" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Want the complete collection?</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">Get instant access to over 500+ pages of high-quality notes and framework templates by joining our community.</p>
              </div>
              <Link href="/signup" className="shrink-0 rounded-2xl bg-primary text-white px-8 py-4 font-black shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all">
                Join Now Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section (Enhancement) */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-primary/10 blur-[80px] -z-10" />
            <h2 className="text-3xl font-bold tracking-tight">Stay Ahead in Tech</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Join 1,000+ engineers receiving our weekly newsletter on QA automation trends, Playwright tips, and interview secrets.
            </p>
            <NewsletterForm />
            <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Contact / Lead Capture Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950 border-t" id="contact">
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
                    <p className="font-semibold">+91 70209 08516</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email Us</p>
                    <p className="font-semibold text-slate-900 dark:text-white">hello@nis.com</p>
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
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-orange-600/10 border border-primary/20 p-6">
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
