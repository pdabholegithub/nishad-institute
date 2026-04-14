import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { enrollStudent, updatePaymentStatus } from "@/lib/actions";

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const student = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      enrollments: {
        include: {
          batch: { include: { course: true } }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!student) return notFound();

  // Fetch all batches for the enrollment form (exclude already enrolled ones)
  const enrolledBatchIds = student.enrollments.map(e => e.batchId);
  const availableBatches = await prisma.batch.findMany({
    where: { id: { notIn: enrolledBatchIds } },
    include: { course: true },
    orderBy: { startDate: "asc" }
  });

  const initials = student.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  const averageProgress = student.enrollments.length > 0
    ? Math.round(student.enrollments.reduce((s, e) => s + e.progress, 0) / student.enrollments.length)
    : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/students" className="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-sm text-slate-500">View and manage this student&apos;s courses.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student Info Card */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6 space-y-5 lg:col-span-1">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-bold">{student.name}</h2>
              <p className="text-sm text-slate-500">{student.email}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              {student.role}
            </span>
          </div>
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Courses</span>
              <span className="font-semibold">{student.enrollments.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Avg. Progress</span>
              <span className="font-semibold">{averageProgress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Member Since</span>
              <span className="font-semibold text-xs">
                {student.createdAt.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all" style={{ width: `${averageProgress}%` }} />
          </div>
          <p className="text-xs text-center text-slate-500">{averageProgress}% overall completion</p>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enroll in New Batch */}
          <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b">
              <h3 className="font-semibold text-lg leading-none">Enroll in a Batch</h3>
              <p className="text-sm text-slate-500">Assign this student to an available course batch.</p>
            </div>
            <div className="p-6">
              {availableBatches.length === 0 ? (
                <p className="text-sm text-slate-500">This student is already enrolled in all available batches, or no batches exist yet.</p>
              ) : (
                <form action={enrollStudent} className="flex flex-col sm:flex-row gap-3">
                  <input type="hidden" name="studentId" value={student.id} />
                  <select
                    name="batchId"
                    required
                    className="flex-1 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <option value="" disabled>-- Select a Batch --</option>
                    {availableBatches.map(batch => (
                      <option key={batch.id} value={batch.id}>
                        {batch.name} — {batch.course.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shrink-0"
                  >
                    Enroll Now
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* enrollments list */}
          <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b">
              <h3 className="font-semibold text-lg leading-none">Active Enrollments</h3>
              <p className="text-sm text-slate-500">All enrolled courses and payment statuses.</p>
            </div>
            <div className="p-6 space-y-4">
              {student.enrollments.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-6 text-slate-500">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                  <p className="text-sm">No enrollments yet. Use the form above to enroll this student.</p>
                </div>
              ) : (
                student.enrollments.map(enr => (
                  <div key={enr.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex-1 space-y-2">
                      <p className="font-semibold text-sm">{enr.batch.course.title}</p>
                      <p className="text-xs text-slate-500">Batch: {enr.batch.name} &bull; ₹{enr.batch.course.price}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 max-w-[120px]">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${enr.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{enr.progress}%</span>
                      </div>
                    </div>
                    {/* Payment Status Changer */}
                    <form action={updatePaymentStatus} className="flex items-center gap-2">
                      <input type="hidden" name="enrollmentId" value={enr.id} />
                      <input type="hidden" name="studentId" value={student.id} />
                      <select
                        name="paymentStatus"
                        defaultValue={enr.paymentStatus}
                        className="h-8 rounded-md border border-input bg-white dark:bg-slate-900 px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="REFUNDED">Refunded</option>
                      </select>
                      <button
                        type="submit"
                        className="inline-flex h-8 items-center justify-center rounded-md bg-slate-900 dark:bg-slate-50 px-3 text-xs font-medium text-white dark:text-slate-900 hover:opacity-90 transition-opacity shrink-0"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
