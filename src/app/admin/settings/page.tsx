"use client";

import { useState } from "react";
import { Building2, Mail, Shield, Smartphone, Globe, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500">Manage your institute global configuration and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-5">
        <div className="md:col-span-1 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeTab === "general" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            <Building2 className="h-4 w-4" />
            General Profile
          </button>
          <button 
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeTab === "email" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            <Mail className="h-4 w-4" />
            Email Configuration
          </button>
          <button 
            onClick={() => setActiveTab("payment")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeTab === "payment" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            <Globe className="h-4 w-4" />
            Payment Gateway
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeTab === "security" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            <Shield className="h-4 w-4" />
            Security & Access
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${activeTab === "notifications" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            <Smartphone className="h-4 w-4" />
            Notifications
          </button>
        </div>

        <div className="md:col-span-3 lg:col-span-4 space-y-6">
          {activeTab === "general" && (
            <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg">Institute Profile</h3>
                <p className="text-sm text-slate-500">This information will be displayed publicly on invoices and emails.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Institute Name</label>
                  <input 
                    type="text" 
                    defaultValue="Nishad IT Space"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Support Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="hello@nishad-it.com"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Contact Phone Number</label>
                  <input 
                    type="text" 
                    defaultValue="+91 70209 08516"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Business Address</label>
                  <textarea 
                    rows={3}
                    defaultValue="Pune, Maharashtra, India"
                    className="flex w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 resize-none" 
                  />
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg">Email Configuration</h3>
                <p className="text-sm text-slate-500">Manage SMTP settings for automated transactional emails.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">SMTP Provider</label>
                  <select className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                    <option>Resend</option>
                    <option>SendGrid</option>
                    <option>Amazon SES</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">API Key</label>
                  <input 
                    type="password" 
                    defaultValue="re_1234567890abcdef"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors">
                  <Save className="mr-2 h-4 w-4" /> Save Email Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg">Payment Gateway</h3>
                <p className="text-sm text-slate-500">Configure Razorpay credentials for student checkouts.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Razorpay Key ID</label>
                  <input 
                    type="text" 
                    defaultValue="rzp_test_YourKeyIDHere"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Razorpay Key Secret</label>
                  <input 
                    type="password" 
                    defaultValue="••••••••••••••••"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors">
                  <Save className="mr-2 h-4 w-4" /> Save Payment Keys
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg">Security & Access</h3>
                <p className="text-sm text-slate-500">Control who can access the command center.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none">Master Admin Password</label>
                  <input 
                    type="password" 
                    defaultValue="password123"
                    className="flex h-10 w-full md:w-2/3 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600" 
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-slate-500 mt-1">Require a code from an authenticator app to log in to the admin panel.</p>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-white hover:bg-slate-200 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <p className="text-sm text-slate-500">Configure administrative alerts.</p>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center gap-3 space-x-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                  <div className="grid gap-1.5 leading-none">
                    <span className="text-sm font-medium">New Student Enrollment</span>
                    <span className="text-xs text-slate-500">Get an email when a student pays for a course.</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 space-x-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                  <div className="grid gap-1.5 leading-none">
                    <span className="text-sm font-medium">Failed Payments</span>
                    <span className="text-xs text-slate-500">Get alerted if a checkout session fails.</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 space-x-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                  <div className="grid gap-1.5 leading-none">
                    <span className="text-sm font-medium">Daily Summary</span>
                    <span className="text-xs text-slate-500">Receive a daily digest of all activities.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 mt-6">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-red-600 dark:text-red-500">Danger Zone</h3>
                <p className="text-sm text-slate-500 mt-1">Irreversible and destructive actions.</p>
                
                <div className="mt-6 flex items-center justify-between border border-red-100 dark:border-red-900/30 rounded-lg p-4 bg-red-50/50 dark:bg-red-950/20">
                  <div>
                    <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">Pause All Enrollments</h4>
                    <p className="text-xs text-slate-500 mt-1">Temporarily disable the ability for new students to purchase courses.</p>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md border border-red-200 dark:border-red-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors">
                    Pause System
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
