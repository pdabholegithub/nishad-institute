import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default async function StudentCoursesPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  const enrollments = user
    ? await prisma.enrollment.findMany({
        where: { studentId: user.id },
        include: { batch: { include: { course: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const paid = enrollments.filter(e => e.paymentStatus === "PAID");
  const pending = enrollments.filter(e => e.paymentStatus === "PENDING");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {enrollments.length === 0
            ? "You are not enrolled in any courses yet."
            : `You are enrolled in ${enrollments.length} course${enrollments.length !== 1 ? "s" : ""}.`}
        </p>
      </div>

      {enrollments.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card p-16 gap-4 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          <div>
            <p className="font-semibold text-lg">No Active Enrollments</p>
            <p className="text-sm text-muted-foreground mt-1">Contact your admin to get enrolled in a course batch.</p>
          </div>
        </div>
      )}

      {paid.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Active Courses
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {paid.map(enr => (
              <div key={enr.id} className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 w-full" style={{ width: `${enr.progress}%`, background: 'linear-gradient(to right, #3b82f6, #4f46e5)' }} />
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-snug">{enr.batch.course.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Batch: {enr.batch.name}</p>
                      <p className="text-xs text-muted-foreground">Schedule: {enr.batch.schedule}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span className="font-medium text-foreground">{enr.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all" style={{ width: `${enr.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium">Paid</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-medium">{enr.batch.course.level}</span>
                    </div>
                    <Link href={`/student/courses/${enr.batch.courseId}`} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      Continue <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {pending.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" /> Pending Payment
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {pending.map(enr => (
              <div key={enr.id} className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 shadow-sm p-5 flex gap-4 items-center">
                <div className="h-11 w-11 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{enr.batch.course.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Batch: {enr.batch.name}</p>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-1">
                    ₹{enr.batch.course.price} — Payment Pending
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
