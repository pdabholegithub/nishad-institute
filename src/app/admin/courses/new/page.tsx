import { createCourse } from "@/lib/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCoursePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Course</h1>
          <p className="text-sm text-slate-500">Fill in the details to publish a new course.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <form action={createCourse} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium leading-none">Course Title</label>
              <input id="title" name="title" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. Master React Native 2026" />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium leading-none">Description</label>
              <textarea id="description" name="description" required rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 resize-none" placeholder="Enter a comprehensive course description..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="duration" className="text-sm font-medium leading-none">Duration</label>
                <input id="duration" name="duration" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. 12 Weeks" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="level" className="text-sm font-medium leading-none">Level</label>
                <select id="level" name="level" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium leading-none">Price (₹)</label>
              <input id="price" name="price" type="text" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. 15000" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="technologies" className="text-sm font-medium leading-none">Technologies (Comma separated)</label>
              <input id="technologies" name="technologies" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. React, Node.js, Next.js, Prisma" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="features" className="text-sm font-medium leading-none">Features (Comma separated)</label>
              <input id="features" name="features" required className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="e.g. 1-to-1 Mentorship, Live Zoom, Job Guarantee" />
            </div>
            
            <div className="flex items-center gap-2 pt-2">
               <input type="checkbox" id="popular" name="popular" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
               <label htmlFor="popular" className="text-sm font-medium text-slate-700 dark:text-slate-300">Mark as Popular Course</label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="grid gap-2">
                <label htmlFor="securityPin" className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Security Authorization PIN</label>
                <input id="securityPin" name="securityPin" type="password" required className="flex h-10 w-full rounded-md border-2 border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600" placeholder="Enter PIN to authorize changes" />
                <p className="text-[10px] text-slate-500 italic">This action is sensitive. Please enter the master security PIN to proceed.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex border-t border-slate-200 dark:border-slate-800 justify-end gap-3">
             <Link href="/admin/courses" className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
               Cancel
             </Link>
             <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
               Publish Course
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
