'use client';

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "917020908516";
  const message = "Hi Nishad IT Solutions! I'm interested in your courses. Can I get more details?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 transition-all hover:scale-110 active:scale-95 group overflow-hidden"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <MessageCircle className="h-7 w-7 fill-white" />
      
      {/* Tooltip */}
      <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
        Chat with a Counselor
      </span>
    </a>
  );
}
