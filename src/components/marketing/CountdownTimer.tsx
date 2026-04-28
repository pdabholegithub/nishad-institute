'use client';

import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const finalTarget = targetDate ? new Date(targetDate) : new Date('2026-06-01T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = finalTarget.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hrs', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-slate-950 dark:bg-slate-900 rounded-2xl p-4 min-w-[70px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-2xl md:text-3xl font-black text-primary tabular-nums drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-black text-slate-500 mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
