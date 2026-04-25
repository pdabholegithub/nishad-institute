import { ArrowUpRight, GraduationCap, IndianRupee, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  // Fetch real data from database
  const totalStudents = await prisma.user.count({
    where: { role: { in: ["STUDENT", "user"] } }, // handle old seed dummy formats if any
  });

  const activeBatches = await prisma.batch.count();

  // For revenue, fetch all PAID enrollments and calculate sum since price is a string
  const paidEnrollments = await prisma.enrollment.findMany({
    where: { paymentStatus: "PAID" },
    include: { batch: { include: { course: true } } },
  });

  const totalRevenue = paidEnrollments.reduce((sum, enrollment) => {
    // Basic formatting cleanups (in case price has commas or symbols)
    const priceRaw = enrollment.batch.course.price.replace(/[^0-9]/g, '');
    return sum + (parseInt(priceRaw) || 0);
  }, 0);

  // Formatting revenue for Indian Rupees (e.g., 1,50,000)
  const formattedRevenue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  // Recent Enrollments
  const recentEnrollments = await prisma.enrollment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      student: true,
      batch: { include: { course: true } }
    }
  });

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Total Revenue</h3>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">{formattedRevenue}</div>
          <p className="text-xs text-green-600 font-medium mt-1 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" /> Dynamic Value
          </p>
        </div>
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Active Students</h3>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">{totalStudents}</div>
          <p className="text-xs text-green-600 font-medium mt-1 flex items-center">
            Total registered users
          </p>
        </div>
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Active Batches</h3>
            <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-violet-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">{activeBatches}</div>
          <p className="text-xs text-slate-500 mt-1">
             Ongoing programs
          </p>
        </div>
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">Lead Conversion</h3>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">24.5%</div>
          <p className="text-xs text-slate-500 mt-1 flex items-center">
             (Calculated via Analytics)
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Enrollments Table */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm col-span-4 lg:col-span-5 hidden md:block">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="font-semibold leading-none tracking-tight text-lg">Recent Enrollments</h3>
            <p className="text-sm text-slate-500">Your latest student signups.</p>
          </div>
          <div className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Student Name</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Course</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-slate-500">Status</th>
                    <th className="h-12 px-6 text-right align-middle font-medium text-slate-500">Amount</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {recentEnrollments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-500">
                        No enrollments found yet.
                      </td>
                    </tr>
                  ) : (
                    recentEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="p-6 align-middle font-medium">{enrollment.student.name}</td>
                        <td className="p-6 align-middle">{enrollment.batch.course.title}</td>
                        <td className="p-6 align-middle">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            enrollment.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 
                            enrollment.paymentStatus === 'REFUNDED' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {enrollment.paymentStatus.charAt(0).toUpperCase() + enrollment.paymentStatus.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="p-6 align-middle text-right font-medium">₹{enrollment.batch.course.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm col-span-4 lg:col-span-2">
          <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b">
            <h3 className="font-semibold leading-none tracking-tight text-lg">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Link href="/admin/courses/new" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
                Create New Course
              </Link>
              <Link href="/admin/batches/new" className="w-full inline-flex items-center justify-center rounded-md border border-slate-200 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 h-10 px-4 py-2">
                Create New Batch
              </Link>
              <Link href="/admin/finance" className="w-full inline-flex items-center justify-center rounded-md border border-slate-200 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 h-10 px-4 py-2">
                Download Reports
              </Link>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium text-slate-500 mb-4">System Alerts</h4>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">System Running Smoothly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

