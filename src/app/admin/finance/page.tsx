import prisma from "@/lib/prisma";
import { IndianRupee, TrendingUp, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default async function FinancePage() {
  const enrollments = await prisma.enrollment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      student: true,
      batch: { include: { course: true } }
    }
  });

  const paidEnrollments = enrollments.filter(e => e.paymentStatus === "PAID");
  
  const totalRevenue = paidEnrollments.reduce((sum, enrollment) => {
    const priceRaw = enrollment.batch.course.price.replace(/[^0-9]/g, '');
    return sum + (parseInt(priceRaw) || 0);
  }, 0);

  const formattedRevenue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finance & Invoices</h1>
          <p className="text-sm text-slate-500">Manage revenue, track payments, and export invoices.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 transition-colors">
          <Download className="mr-2 h-4 w-4 text-slate-500" /> Export CSV
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-500">Gross Revenue</h3>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <IndianRupee className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{formattedRevenue}</div>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> Verified via Razorpay
          </p>
        </div>
        
        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-500">Successful Transactions</h3>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{paidEnrollments.length}</div>
          <p className="text-xs text-slate-500 mt-1">Completed payments</p>
        </div>

        <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-500">Pending Payments</h3>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {enrollments.filter(e => e.paymentStatus === "PENDING").length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Awaiting checkout completion</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-lg">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course Item</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                enrollments.map((env) => (
                  <tr key={env.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {env.id.split('-')[0].toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {env.student.name}
                      <div className="text-xs text-slate-500 font-normal">{env.student.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {env.batch.course.title}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {env.createdAt.toLocaleDateString("en-IN", { 
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {env.paymentStatus === 'PAID' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                          <CheckCircle2 className="h-3 w-3" /> Paid
                        </span>
                      ) : env.paymentStatus === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                          <AlertCircle className="h-3 w-3" /> Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-slate-100">
                      ₹{env.batch.course.price}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
