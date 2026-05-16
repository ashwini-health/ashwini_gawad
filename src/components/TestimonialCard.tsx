import React from "react";

interface TestimonialCardProps {
  name: string;
  context: string;
  quote: string;
  result?: string;
}

export function TestimonialCard({ name, context, quote, result }: TestimonialCardProps) {
  const initial = (name || "").trim().charAt(0).toUpperCase() || "?";

  return (
    <article className="glass-card-elevated flex flex-col p-8 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4 font-display text-5xl leading-none text-gold-500/30">&ldquo;</div>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-300">{quote}</p>
      {result && (
        <div className="mb-6 rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 text-sm text-teal-300">
          {result}
        </div>
      )}
      <div className="flex items-center gap-4 border-t border-white/5 pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-sm font-heading font-black text-midnight-950">
          {initial}
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-slate-500">{context}</p>
        </div>
      </div>
    </article>
  );
}
