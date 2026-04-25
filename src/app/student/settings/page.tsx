import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <p className="text-muted-foreground">
          Manage your account settings and email preferences.
        </p>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 pb-4 border-b">
          <h3 className="font-semibold leading-none tracking-tight">Notifications</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Choose what updates you want to receive.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none">Class Reminders</label>
              <p className="text-sm text-muted-foreground">Receive an email 1 hour before live sessions.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium leading-none">Marketing Emails</label>
              <p className="text-sm text-muted-foreground">Receive updates about new courses and offers.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 pb-4 border-b">
          <h3 className="font-semibold leading-none tracking-tight">Theme</h3>
          <p className="text-sm text-muted-foreground mt-1.5">Customize your dashboard appearance.</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-primary rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-slate-50 border shadow-sm"></div>
              <span className="text-sm font-medium">Light</span>
            </div>
            <div className="border border-muted rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 opacity-50">
              <div className="h-10 w-10 rounded-full bg-slate-950 border shadow-sm"></div>
              <span className="text-sm font-medium">Dark (Coming Soon)</span>
            </div>
            <div className="border border-muted rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 opacity-50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-slate-50 to-slate-950 border shadow-sm"></div>
              <span className="text-sm font-medium">System</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
