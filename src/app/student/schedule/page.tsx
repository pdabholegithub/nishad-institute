import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { CalendarDays, VideoIcon, MapPin } from "lucide-react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekDays() {
  const today = new Date();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    week.push(d);
  }
  return week;
}

export default async function StudentSchedulePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  const enrollments = user
    ? await prisma.enrollment.findMany({
        where: { studentId: user.id, paymentStatus: "PAID" },
        include: { batch: { include: { course: true } } },
      })
    : [];

  const weekDays = getWeekDays();
  const today = new Date();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your upcoming classes for the next 7 days.
        </p>
      </div>

      {/* Week strip */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, idx) => {
          const isToday = day.toDateString() === today.toDateString();
          return (
            <div
              key={idx}
              className={`flex flex-col items-center rounded-xl py-3 px-1 border transition-colors ${
                isToday
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                {DAYS_OF_WEEK[day.getDay()]}
              </span>
              <span className={`text-lg font-bold mt-0.5 ${isToday ? "" : "text-foreground"}`}>
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Classes list */}
      {enrollments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card p-16 gap-3 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
          <div>
            <p className="font-semibold text-lg">No Classes Scheduled</p>
            <p className="text-sm text-muted-foreground mt-1">
              Enroll in a course with Paid status to see your schedule.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Upcoming Sessions</h2>
          {enrollments.map((enr, idx) => {
            // Stagger start days for visual variety
            const classDay = new Date(today);
            classDay.setDate(today.getDate() + (idx % 3) * 2);

            return (
              <div
                key={enr.id}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 hover:shadow-sm transition-shadow"
              >
                {/* Date Block */}
                <div className="flex flex-col items-center justify-center border rounded-lg p-2.5 min-w-[56px] bg-muted/50 shrink-0">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                    {DAYS_OF_WEEK[classDay.getDay()]}
                  </span>
                  <span className="text-xl font-bold text-foreground leading-none mt-0.5">
                    {classDay.getDate()}
                  </span>
                </div>

                {/* Left accent bar */}
                <div className="w-1 self-stretch rounded-full bg-primary shrink-0" />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{enr.batch.course.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Batch: {enr.batch.name}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> Schedule: {enr.batch.schedule}
                  </p>
                </div>

                {/* Badge */}
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <VideoIcon className="h-3 w-3" />
                    Live Zoom
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
