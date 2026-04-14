import prisma from "@/lib/prisma";
import Link from "next/link";
import { Users, BookOpen } from "lucide-react";

export default async function StudentDirectoryPage() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    include: {
      enrollments: {
        include: {
          batch: { include: { course: true } }
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Directory</h1>
          <p className="text-sm text-slate-500">
            {students.length} registered student{students.length !== 1 ? "s" : ""} in the system.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Student</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Email</th>
                <th className="h-12 px-6 text-center align-middle font-medium text-slate-500">Enrollments</th>
                <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Joined On</th>
                <th className="h-12 px-6 text-right align-middle font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 border-t">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="h-8 w-8 text-slate-400" />
                      <p>No students found in the system yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                students.map(student => {
                  const initials = student.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
                  return (
                    <tr key={student.id} className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 px-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {initials}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-4 px-6 align-middle text-slate-500">{student.email}</td>
                      <td className="p-4 px-6 align-middle text-center">
                        {student.enrollments.length === 0 ? (
                          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                            Not Enrolled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                            <BookOpen className="h-3 w-3" />
                            {student.enrollments.length} course{student.enrollments.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </td>
                      <td className="p-4 px-6 align-middle text-slate-500">
                        {student.createdAt.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="p-4 px-6 align-middle text-right">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
