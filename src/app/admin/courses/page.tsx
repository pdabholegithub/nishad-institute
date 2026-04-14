import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

export default async function CoursesListPage() {
  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
          <p className="text-sm text-slate-500">View and manage all institute courses.</p>
        </div>
        <Link 
          href="/admin/courses/new" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Link>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm">
        <div className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Course Info</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Duration</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Level</th>
                  <th className="h-12 px-6 text-right align-middle font-medium text-slate-500">Price</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 border-t">
                      <div className="flex flex-col items-center justify-center">
                         <BookOpen className="h-8 w-8 text-slate-400 mb-2" />
                         <p>No courses found. Create your first course to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id} className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-6 align-middle">
                        <div className="font-medium text-base">{course.title}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          {course.popular && <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">POPULAR</span>}
                          {course.technologies.split(',').slice(0, 3).join(', ')}
                        </div>
                      </td>
                      <td className="p-6 align-middle">{course.duration}</td>
                      <td className="p-6 align-middle">
                        <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">
                          {course.level}
                        </span>
                      </td>
                      <td className="p-6 align-middle text-right font-medium">₹{course.price}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
