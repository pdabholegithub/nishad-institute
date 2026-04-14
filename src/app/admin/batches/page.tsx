import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Layers } from "lucide-react";

export default async function BatchesListPage() {
  const batches = await prisma.batch.findMany({
    orderBy: { startDate: "asc" },
    include: {
      course: true,
      instructor: true,
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Batch Management</h1>
          <p className="text-sm text-slate-500">View and manage scheduled cohorts for your courses.</p>
        </div>
        <Link 
          href="/admin/batches/new" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Batch
        </Link>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm">
        <div className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Batch Name</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Course</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Schedule</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Instructor</th>
                  <th className="h-12 px-6 text-right align-middle font-medium text-slate-500">Start Date</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {batches.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 border-t">
                      <div className="flex flex-col items-center justify-center">
                         <Layers className="h-8 w-8 text-slate-400 mb-2" />
                         <p>No batches found. Create your first batch to start enrolling students.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  batches.map(batch => (
                    <tr key={batch.id} className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-6 align-middle font-medium">{batch.name}</td>
                      <td className="p-6 align-middle text-slate-500">{batch.course.title}</td>
                      <td className="p-6 align-middle">
                        <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">
                          {batch.schedule}
                        </span>
                      </td>
                      <td className="p-6 align-middle text-slate-500">{batch.instructor ? batch.instructor.name : 'Unassigned'}</td>
                      <td className="p-6 align-middle text-right font-medium">
                        {batch.startDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
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
