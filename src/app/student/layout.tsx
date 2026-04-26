import Link from "next/link";
import { 
  BookOpen, 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  User, 
  Settings,
  Bell,
  LogOut
} from "lucide-react";

import { auth } from "@/auth";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userName = session?.user?.name || "Student";
  const userInitials = userName.substring(0, 2).toUpperCase();
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="">Automation Playground</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Main Menu
            </div>
            <Link
              href="/student"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/student/courses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BookOpen className="h-4 w-4" />
              My Courses
            </Link>
            <Link
              href="/student/schedule"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CalendarDays className="h-4 w-4" />
              Schedule
            </Link>
            <Link
              href="/student/assignments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              Assignments
            </Link>
            
            <div className="mt-8 mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Settings
            </div>
            <Link
              href="/student/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/student/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Preferences
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <form action={async () => {
             "use server";
             const { signOut } = await import("@/auth");
             await signOut();
          }}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 justify-between">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-foreground">Welcome back, {userName}!</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-muted-foreground hover:bg-muted focus-visible:outline-none">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-bold text-primary text-sm">
              {userInitials}
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
