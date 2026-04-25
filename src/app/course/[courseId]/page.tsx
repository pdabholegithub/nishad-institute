import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Calendar, Clock, CheckCircle2, ChevronLeft, Award, FileText } from "lucide-react";

export default async function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.courseId }
  });

  if (!course) {
    notFound();
  }

  const isMockInterview = course.duration.includes("Session");
  let syllabus = [];

  if (course.title.includes("Python")) {
    syllabus = [
      { week: "Week 1", title: "Python Fundamentals & Data Structures", topics: ["Variables, Loops, and Functions", "Lists, Dictionaries, and Sets", "Object-Oriented Programming (OOP) in Python", "File Handling & Error Exception"] },
      { week: "Week 2", title: "Pytest Framework Deep Dive", topics: ["Introduction to Pytest and Fixtures", "Parameterization & Markers", "Mocking and Patching", "Generating Allure Reports"] },
      { week: "Week 3", title: "API Automation with Python", topics: ["Requests Library Mastery", "Automating RESTful APIs", "Validating JSON schemas", "Auth tokens & Headers management"] },
      { week: "Week 4", title: "Web Automation & CI/CD", topics: ["Playwright with Python basics", "Page Object Model implementation", "GitHub Actions for Python tests", "Final Python Automation Project"] }
    ];
  } else if (course.title.includes("AI")) {
    syllabus = [
      { week: "Week 1", title: "Introduction to AI in QA", topics: ["Understanding LLMs (ChatGPT, Claude)", "Prompt Engineering basics for testers", "Identifying AI use cases in test cycles", "Security & Privacy considerations"] },
      { week: "Week 2", title: "AI-Assisted Test Generation", topics: ["Generating test scenarios with AI", "Writing automated scripts via prompts", "Converting manual test cases to code", "Reviewing AI-generated code quality"] },
      { week: "Week 3", title: "AI for Defect Analysis", topics: ["Analyzing server logs with AI", "Root cause analysis via LLMs", "Predictive analysis for flaky tests", "Automating bug report generation"] },
      { week: "Week 4", title: "Building an AI-Powered Framework", topics: ["Integrating OpenAI APIs in automation", "Self-healing test concepts", "Continuous Integration with AI tools", "Final Capstone AI Project"] }
    ];
  } else if (course.duration.includes("Session")) {
    syllabus = [
      { week: "Phase 1", title: "Pre-Interview Assessment", topics: ["Resume Review & Optimization", "Identifying target roles and companies", "Setting expectations"] },
      { week: "Phase 2", title: "The Mock Interview (60 Mins)", topics: ["Live Coding & Technical Questions", "Behavioral & HR Round Simulation", "System Design for QA"] },
      { week: "Phase 3", title: "Feedback & Strategy", topics: ["Detailed performance breakdown", "Areas of improvement", "Customized 2-week preparation roadmap"] }
    ];
  } else {
    // Default / Playwright / General QA
    syllabus = [
      { week: "Week 1", title: "Core Fundamentals & Setup", topics: ["Environment Configuration", "Language Basics (JS/TS/Java)", "Version Control (Git/GitHub)", "Writing your first automation script"] },
      { week: "Week 2", title: "Advanced Locators & Frameworks", topics: ["Deep dive into XPath & CSS Selectors", "Handling dynamic elements", "Wait strategies (Implicit vs Explicit)", "Page Object Model (POM) Design"] },
      { week: "Week 3", title: "API Testing & Integration", topics: ["REST API Concepts", "Automating API requests", "Data-Driven Testing", "Mocking and Intercepting Network Requests"] },
      { week: "Week 4", title: "CI/CD & Real-World Projects", topics: ["Jenkins / GitHub Actions Integration", "Cross-browser testing", "Building a portfolio project", "Interview Preparation & Resume Review"] }
    ];
  }
  const features = course.features.split(',');
  const techs = course.technologies.split(',');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link href="/#courses" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Courses
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold border border-primary/50">
              {course.level}
            </span>
            {course.popular && (
              <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold border border-amber-500/50 flex items-center gap-1">
                <Award className="h-4 w-4" /> Most Popular
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {course.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Duration: {course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Self-Paced + Live Support</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>{isMockInterview ? '1-on-1 Session' : 'Certificate of Completion'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Syllabus Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> 
              {isMockInterview ? 'Session Breakdown' : '30-Day Curriculum Plan'}
            </h2>
            <div className="space-y-6">
              {syllabus.map((item, i) => (
                <div key={i} className="bg-card border rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  <div className="pl-4">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">{item.week}</span>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.topics.map((topic, j) => (
                        <li key={j} className="flex items-start text-muted-foreground text-sm">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Technologies Covered</h2>
            <div className="flex flex-wrap gap-3">
              {techs.map(tech => (
                <div key={tech} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium shadow-sm border border-border/50">
                  {tech.trim()}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Floating Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 shadow-xl sticky top-24">
            <h3 className="text-lg font-bold mb-2">Enrollment Summary</h3>
            <p className="text-muted-foreground text-sm mb-6">Secure your spot today and get instant access to the dashboard.</p>
            
            <div className="text-4xl font-extrabold mb-6">
              ₹{parseInt(course.price).toLocaleString()}
            </div>
            
            <Link 
              href="/signup"
              className="flex w-full justify-center items-center rounded-xl bg-primary px-3 py-4 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
            >
              Enroll Now for ₹{parseInt(course.price).toLocaleString()}
            </Link>

            <div className="mt-8 space-y-4 pt-6 border-t">
              <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">What&apos;s Included</p>
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-sm text-foreground/90">{f.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
