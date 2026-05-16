"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/success-stories", label: "Results" },
  { href: "/clinical-insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hi%20Dt.%20Ashwini%2C%20I%20am%20an%20NRI%20and%20would%20like%20to%20apply%20for%20a%20Clinical%20Assessment%20Call%20regarding%20my%20parents%27%20health.";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-midnight-950/90 backdrop-blur-md">
      <nav className="container-wide flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg">
            <span className="font-heading text-sm font-black text-midnight-950">AG</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              Dietitian
            </span>
            <span className="font-display text-base font-semibold text-white">
              Ashwini Gawad
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-heading font-medium transition-colors ${
                isActive(item.href)
                  ? "text-gold-400"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-gold-400 to-gold-300" />
              )}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-5 py-2.5 text-sm font-heading font-semibold text-gold-300 transition-all hover:bg-gold-500/20 hover:text-gold-200"
          >
            Book Call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 lg:hidden"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            {open ? (
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-midnight-950/98 px-4 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-heading font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-gold-500/10 text-gold-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 py-3 font-heading text-sm font-semibold text-gold-300"
              onClick={() => setOpen(false)}
            >
              Book Clinical Call via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
