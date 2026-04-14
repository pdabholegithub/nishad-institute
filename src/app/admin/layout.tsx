import Link from "next/link";
import { 
  BarChart3,
  Users,
  BookOpen,
  Settings,
  Bell,
  LogOut,
  GraduationCap,
  CreditCard,
  Layers
} from "lucide-react";

import { auth } from "@/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userName = session?.user?.name || "Admin";
  const userInitials = userName.substring(0, 2).toUpperCase();
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r bg-slate-900 md:flex">
        <div className="flex h-14 items-center border-b border-slate-800 px-4 lg:h-[60px] lg:px-6 bg-slate-950">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6 text-blue-500" />
            <span className="text-slate-100">Nishad Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
             <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overview
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-slate-50"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            
            <div className="mt-6 mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Management
            </div>
            <Link
              href="/admin/students"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-slate-50"
            >
              <Users className="h-4 w-4" />
              Student Directory
            </Link>
            <Link
              href="/admin/courses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-slate-50"
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </Link>
            <Link
              href="/admin/batches"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-slate-50"
            >
              <Layers className="h-4 w-4" />
              Batch Management
            </Link>
            <Link
              href="/admin/finance"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-slate-50"
            >
              <CreditCard className="h-4 w-4" />
              Finance &amp; Invoices
            </Link>
            
            <div className="mt-8 mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              System
            </div>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:bg-slate-800 hover:text-slate-50"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t border-slate-800 p-4">
          <form action={async () => {
             "use server";
             const { signOut } = await import("@/auth");
             await signOut();
          }}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white dark:bg-slate-900 px-4 lg:h-[60px] lg:px-6 justify-between shadow-sm">
          <div className="w-full flex-1">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Institute Command Center
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-blue-600 border-2 border-background"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center font-bold text-slate-100 text-sm">
              {userInitials}
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
