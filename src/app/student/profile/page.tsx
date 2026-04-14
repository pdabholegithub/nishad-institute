import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Mail, CalendarDays, BookOpen, TrendingUp } from "lucide-react";

export default async function StudentProfilePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
    include: {
      enrollments: {
        include: { batch: { include: { course: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) return <div>User not found.</div>;

  const initials = user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  const paidCount = user.enrollments.filter(e => e.paymentStatus === "PAID").length;
  const avgProgress = user.enrollments.length > 0
    ? Math.round(user.enrollments.reduce((s, e) => s + e.progress, 0) / user.enrollments.length)
    : 0;

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Your account information and learning summary.</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-5">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-background flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
              {initials}
            </div>
            <div className="pb-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>Joined {user.createdAt.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card shadow-sm p-4 text-center space-y-1">
          <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mx-auto">
            <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-2xl font-bold">{user.enrollments.length}</p>
          <p className="text-xs text-muted-foreground">Enrolled</p>
        </div>
        <div className="rounded-xl border bg-card shadow-sm p-4 text-center space-y-1">
          <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto">
            <CalendarDays className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-bold">{paidCount}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="rounded-xl border bg-card shadow-sm p-4 text-center space-y-1">
          <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center mx-auto">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold">{avgProgress}%</p>
          <p className="text-xs text-muted-foreground">Progress</p>
        </div>
      </div>

      {/* Enrolled Courses Summary */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-5 border-b">
          <h3 className="font-semibold">Enrolled Courses</h3>
        </div>
        <div className="divide-y">
          {user.enrollments.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground text-center">Not enrolled in any courses yet.</p>
          ) : (
            user.enrollments.map(enr => (
              <div key={enr.id} className="flex items-center gap-4 p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{enr.batch.course.title}</p>
                  <p className="text-xs text-muted-foreground">{enr.batch.name}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    enr.paymentStatus === "PAID"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : enr.paymentStatus === "REFUNDED"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  }`}>
                    {enr.paymentStatus}
                  </span>
                  <span className="text-xs text-muted-foreground">{enr.progress}% done</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
