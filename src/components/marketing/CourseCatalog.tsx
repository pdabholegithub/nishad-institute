import { CheckCircle2, Clock, BarChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma";

export async function CourseCatalog() {
  const coursesData = await prisma.course.findMany({
    orderBy: {
      popular: 'desc'
    }
  });

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t" id="courses">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Popular Programs</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-aligned curriculum designed to take you from a beginner to an employable professional with hands-on labs and live mentorship.
          </p>
        </div>

        {coursesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card p-16 gap-4 text-center max-w-md mx-auto">
            <p className="text-muted-foreground text-sm">Courses are being prepared. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {coursesData.map((course) => {
            const courseTech = course.technologies.split(',');
            const courseFeatures = course.features.split(',');

            return (
              <div 
                key={course.id} 
                className={cn(
                  "relative group flex flex-col rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden",
                  course.popular && "ring-2 ring-primary border-primary"
                )}
              >
                {course.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {course.duration}</span>
                      <span className="flex items-center"><BarChart className="w-4 h-4 mr-1" /> {course.level}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{course.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-primary">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {courseTech.slice(0, 4).map((tech) => (
                        <span key={tech} className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                          {tech}
                        </span>
                      ))}
                      {courseTech.length > 4 && (
                        <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                          +{courseTech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {courseFeatures.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-muted/30 border-t mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground font-medium mb-1">Course Fee</div>
                    <div className="text-xl font-bold">₹{parseInt(course.price).toLocaleString()}</div>
                  </div>
                  <Link 
                    href={`/enroll?course=${course.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Enroll <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
