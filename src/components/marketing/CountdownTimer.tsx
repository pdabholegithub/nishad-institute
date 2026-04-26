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
          <div className="bg-slate-900/50 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 min-w-[60px] shadow-lg">
            <span className="text-xl md:text-2xl font-black text-primary tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-1.5">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
