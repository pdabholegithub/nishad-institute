import { BookOpen, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function StudentDashboard() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Find the exact user ID since auth() might only have email or a NextAuth generated ID
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <div>User not found in system.</div>;
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: user.id },
    include: {
      batch: {
        include: { course: true }
      }
    }
  });

  const activeCoursesCount = enrollments.length;
  
  const totalProgress = enrollments.reduce((sum, enr) => sum + enr.progress, 0);
  const averageProgress = activeCoursesCount > 0 ? Math.round(totalProgress / activeCoursesCount) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Courses</h3>
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{activeCoursesCount}</div>
          <p className="text-xs text-muted-foreground mt-1 text-green-500 font-medium">
            {activeCoursesCount > 0 ? "Keep it up!" : "Enroll to get started"}
          </p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <h3 className="tracking-tight text-sm font-medium">Upcoming Classes</h3>
            <CalendarDays className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{activeCoursesCount > 0 ? 2 : 0}</div>
          <p className="text-xs text-muted-foreground mt-1">Check your schedule</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <h3 className="tracking-tight text-sm font-medium">Assignments Pending</h3>
            <Clock className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{activeCoursesCount > 0 ? 1 : 0}</div>
          <p className="text-xs text-muted-foreground mt-1 text-destructive font-medium">
            {activeCoursesCount > 0 ? "Due soon" : "All clear"}
          </p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 text-muted-foreground pb-2">
            <h3 className="tracking-tight text-sm font-medium">Overall Progress</h3>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-2xl font-bold">{averageProgress}%</div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${averageProgress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Enrolled Courses */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm col-span-4">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="font-semibold leading-none tracking-tight">Active Enrollments</h3>
            <p className="text-sm text-muted-foreground">Resume learning where you left off.</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-6">
              {enrollments.length === 0 ? (
                <div className="text-sm text-muted-foreground py-4 text-center">
                  You are not enrolled in any courses yet.
                </div>
              ) : (
                enrollments.map((enr) => (
                  <div key={enr.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{enr.batch.course.title}</h4>
                        <p className="text-sm text-muted-foreground">Batch: {enr.batch.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 bg-muted rounded-full h-1">
                            <div className="bg-primary h-1 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{enr.progress}% completed</span>
                        </div>
                      </div>
                    </div>
                    <Link href="#" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 shrink-0">
                      Go to Course
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm col-span-3">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="font-semibold leading-none tracking-tight">Next Classes</h3>
            <p className="text-sm text-muted-foreground">Your schedule for the week</p>
          </div>
          <div className="p-6 pt-0">
            {activeCoursesCount === 0 ? (
               <div className="text-sm text-muted-foreground py-4 text-center">
                  Enroll in a course to see your schedule.
               </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center border rounded-md p-2 min-w-[60px] bg-muted/50">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Today</span>
                    <span className="text-xl font-bold">14</span>
                  </div>
                  <div className="space-y-1 border-l-2 border-primary pl-4">
                    <p className="text-sm font-medium leading-none">Class Session</p>
                    <p className="text-sm text-muted-foreground">7:00 PM - 9:00 PM</p>
                    <div className="pt-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Live Zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
