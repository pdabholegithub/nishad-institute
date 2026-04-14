import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

// Since we don't have an Assignments model yet, we'll generate sample assignments
// derived from the student's enrollments — each enrollment gets realistic demo tasks.
const ASSIGNMENT_TEMPLATES = [
  { title: "Setup Development Environment", daysFromNow: -3, type: "Practical", status: "SUBMITTED" },
  { title: "Core Concepts Quiz", daysFromNow: -1, type: "Quiz", status: "SUBMITTED" },
  { title: "Mini Project Submission", daysFromNow: 2, type: "Project", status: "PENDING" },
  { title: "Framework Hands-on Exercise", daysFromNow: 5, type: "Practical", status: "PENDING" },
  { title: "Mid-Term Assessment", daysFromNow: 9, type: "Assessment", status: "UPCOMING" },
];

function getStatusConfig(status: string, daysFromNow: number) {
  if (status === "SUBMITTED") return { label: "Submitted", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", icon: CheckCircle2 };
  if (daysFromNow <= 0 && status === "PENDING") return { label: "Overdue", color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300", icon: AlertCircle };
  if (daysFromNow <= 3) return { label: "Due Soon", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", icon: Clock };
  return { label: "Upcoming", color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300", icon: FileText };
}

export default async function StudentAssignmentsPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  const enrollments = user
    ? await prisma.enrollment.findMany({
        where: { studentId: user.id, paymentStatus: "PAID" },
        include: { batch: { include: { course: true } } },
      })
    : [];

  const today = new Date();

  // Build a list of assignments from the enrollment data
  const assignments = enrollments.flatMap(enr =>
    ASSIGNMENT_TEMPLATES.map((tpl, idx) => {
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + tpl.daysFromNow + idx);
      return {
        id: `${enr.id}-${idx}`,
        title: tpl.title,
        courseName: enr.batch.course.title,
        batchName: enr.batch.name,
        dueDate,
        daysFromNow: tpl.daysFromNow + idx,
        type: tpl.type,
        status: tpl.status,
      };
    })
  ).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const pending = assignments.filter(a => a.status !== "SUBMITTED");
  const submitted = assignments.filter(a => a.status === "SUBMITTED");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {pending.length} pending &bull; {submitted.length} submitted
          </p>
        </div>
        {/* Stats row */}
        <div className="flex gap-3">
          <div className="rounded-lg border bg-card px-4 py-2 text-center shadow-sm">
            <p className="text-xl font-bold text-amber-600">{pending.length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="rounded-lg border bg-card px-4 py-2 text-center shadow-sm">
            <p className="text-xl font-bold text-emerald-600">{submitted.length}</p>
            <p className="text-xs text-muted-foreground">Done</p>
          </div>
        </div>
      </div>

      {enrollments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card p-16 gap-3 text-center">
          <FileText className="h-12 w-12 text-muted-foreground/50" />
          <div>
            <p className="font-semibold text-lg">No Assignments Yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Enroll in a paid course to see your assignments here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Pending / Upcoming */}
          {pending.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pending &amp; Upcoming</h2>
              <div className="space-y-2">
                {pending.map(asgn => {
                  const cfg = getStatusConfig(asgn.status, asgn.daysFromNow);
                  const Icon = cfg.icon;
                  const dueStr = asgn.daysFromNow < 0
                    ? `${Math.abs(asgn.daysFromNow)} day${Math.abs(asgn.daysFromNow) !== 1 ? "s" : ""} ago`
                    : asgn.daysFromNow === 0
                    ? "Due Today"
                    : `Due in ${asgn.daysFromNow} day${asgn.daysFromNow !== 1 ? "s" : ""}`;

                  return (
                    <div key={asgn.id} className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:shadow-sm transition-shadow">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{asgn.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {asgn.courseName} &bull; {asgn.type}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color}`}>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {asgn.dueDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Submitted */}
          {submitted.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Submitted</h2>
              <div className="space-y-2">
                {submitted.map(asgn => (
                  <div key={asgn.id} className="flex items-center gap-4 rounded-xl border bg-card p-4 opacity-70">
                    <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-through text-muted-foreground">{asgn.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{asgn.courseName} &bull; {asgn.type}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 text-xs font-semibold shrink-0">
                      <CheckCircle2 className="h-3 w-3" /> Submitted
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
