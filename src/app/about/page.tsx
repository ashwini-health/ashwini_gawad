import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            About
          </p>
          <h1 className="mb-5 font-display text-3xl font-semibold text-white md:text-4xl">
            Dietitian Ashwini Gawad
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-400">
            Clinical Dietitian and wellness leader with 25+ years of experience
            across hospitals, pharmaceutical organisations and national wellness
            chains like VLCC and Talwalkars.
          </p>
        </header>

        <div className="space-y-6 text-base leading-relaxed text-slate-300">
          <p>
            Ashwini&apos;s work began at KEM Hospital, Mumbai, where she
            planned therapeutic diets for critical care, paediatric and
            geriatric patients. She later worked with Novartis India on medical
            nutrition products, helping clinicians integrate evidence-based
            supplements into patient care.
          </p>
          <p>
            Over the next decade, she led slimming and nutrition training across
            25+ VLCC centres in West, South and Central India, designing
            protocols, training dietitians and physiotherapists, and supporting
            franchisees to grow their wellness revenue while maintaining
            clinical safety.
          </p>
          <p>
            Today, she combines that clinical depth and business experience to
            offer grounded, realistic counselling for families who want
            long-term health rather than short &ldquo;diet seasons&rdquo;.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            { stat: "25+", label: "Years of clinical experience" },
            { stat: "2,500+", label: "Families counselled" },
            { stat: "KEM", label: "Hospital trained, Mumbai" },
          ].map((item) => (
            <div key={item.label} className="glass-card p-6 text-center">
              <p className="font-display text-3xl font-semibold text-gold-400">{item.stat}</p>
              <p className="mt-2 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card-elevated p-8">
          <h2 className="mb-4 font-heading text-lg font-semibold text-white">Credentials</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              KEM Hospital, Mumbai — clinical diet therapy in critical care, paediatrics, geriatrics
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              Novartis India — medical nutrition integration, pharmaceutical-grade supplement protocols
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              VLCC — Area Head, led 25+ centres across West, South and Central India
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              Charitable Trust Hospital OPD — current clinical practice, Borivali (E), Mumbai
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
