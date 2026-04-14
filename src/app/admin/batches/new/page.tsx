import { createBatch } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function NewBatchPage() {
  const courses = await prisma.course.findMany({
    orderBy: { title: "asc" }
  });

  const instructors = await prisma.user.findMany({
    where: { role: { in: ["INSTRUCTOR", "ADMIN", "admin"] } },
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/batches" className="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Batch</h1>
          <p className="text-sm text-slate-500">Schedule a new cohort for an existing course.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {courses.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
             <p className="mb-4">You must create at least one Course before scheduling a Batch.</p>
             <Link href="/admin/courses/new" className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
               Create a Course First
             </Link>
          </div>
        ) : (
          <form action={createBatch} className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">Batch Identifier Name</label>
                <input id="name" name="name" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. SEP-2026-JAVA" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="courseId" className="text-sm font-medium leading-none">Associated Course</label>
                <select id="courseId" name="courseId" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <option value="" disabled selected>-- Select a Course --</option>
                  {courses.map(course => (
                     <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="startDate" className="text-sm font-medium leading-none">Start Date</label>
                  <input id="startDate" name="startDate" type="date" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="schedule" className="text-sm font-medium leading-none">Typical Schedule</label>
                  <input id="schedule" name="schedule" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. Mon-Wed-Fri 7:00 PM" />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="instructorId" className="text-sm font-medium leading-none">Assign Instructor (Optional)</label>
                <select id="instructorId" name="instructorId" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <option value="">-- No Instructor Assigned Yet --</option>
                  {instructors.map(instructor => (
                     <option key={instructor.id} value={instructor.id}>{instructor.name} ({instructor.email})</option>
                  ))}
                </select>
              </div>

            </div>
            
            <div className="pt-4 flex border-t border-slate-200 dark:border-slate-800 justify-end gap-3">
               <Link href="/admin/batches" className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                 Cancel
               </Link>
               <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                 Create Batch
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
