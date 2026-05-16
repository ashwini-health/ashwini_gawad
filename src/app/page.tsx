"use client";

import NextImage from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hi%20Dt.%20Ashwini%2C%20I%27d%20like%20to%20book%20a%20Clinical%20Assessment%20Call.";

/* ─── Animated counter ─── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / 40;
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [isInView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Scroll-reveal wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-midnight-950 text-slate-200">

      {/* ══════════════════════════════════════
          HERO — aspirational, outcome-first
         ══════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,rgba(212,162,41,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(5,200,176,0.06),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 md:px-8 lg:pt-36">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* ── LEFT: copy ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
                  Mumbai · Clinical Nutrition
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-6 font-display text-5xl leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
              >
                Clinical nutrition.<br />
                <span className="text-gradient-gold">Managed properly.</span><br />
                <span className="text-slate-400">Verified by data.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mb-10 max-w-lg text-lg leading-relaxed text-slate-400"
              >
                Dt. Ashwini Gawad — MSc Dietetics, KEM Hospital trained, 25+ years clinical — manages your family&apos;s nutrition end-to-end.
                Coordinates with doctors, trains the household cook, and sends you verified health dashboards.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider text-midnight-950 transition-all duration-300 hover:scale-[1.03] active:scale-95"
                  style={{ background: "linear-gradient(135deg,#e8c865,#d4a229,#e2b93e)", boxShadow: "0 0 28px rgba(212,162,41,0.30)" }}
                >
                  Book a Clinical Assessment
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-400 underline-offset-4 hover:text-gold-400 hover:underline transition-colors"
                >
                  View programmes
                </Link>
              </motion.div>

              {/* credential strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500"
              >
                {["MSc Dietetics", "KEM Hospital Trained", "VLCC Area Head", "IDA Registered"].map((c) => (
                  <span key={c} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-gold-500/60" />
                    {c}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: portrait + stat cards ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-gold-500/12 via-transparent to-teal-500/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 shadow-2xl">
                <NextImage
                  src="/ashwini.gawad.jpeg"
                  alt="Dt. Ashwini Gawad — Senior Clinical Dietitian"
                  width={520}
                  height={620}
                  className="h-auto w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/75 via-midnight-950/15 to-transparent" />

                {/* floating stat card */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-6 left-6 right-6 rounded-xl border border-gold-500/20 bg-midnight-950/85 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-base">⚕️</div>
                    <div className="flex-1">
                      <p className="text-sm font-heading font-bold text-white">Dt. Ashwini Gawad</p>
                      <p className="text-xs text-gold-400/80">Senior Clinical Dietitian, Mumbai</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-display font-bold text-gold-400">25+</p>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">Years</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-midnight-950 to-transparent" />
      </section>

      {/* ══════════════════════════════════════
          METRICS BAR
         ══════════════════════════════════════ */}
      <section className="border-y border-white/6 bg-midnight-900/40">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { val: 25, suffix: "+", label: "Years of practice" },
              { val: 1000, suffix: "+", label: "Clinical cases" },
              { val: 25, suffix: "+", label: "Cities served" },
              { val: 90, suffix: "%+", label: "Programme completion" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} className="text-center">
                <p className="font-display text-3xl font-bold text-gold-400 md:text-4xl">
                  <Counter target={stat.val} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs font-heading uppercase tracking-wider text-slate-500">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BENTO GRID — HOW IT WORKS
         ══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal className="mb-14 text-center">
          <span className="badge mb-4 inline-flex">The Protocol</span>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            One system. Three phases.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 md:text-lg">
            Not a PDF diet plan. A managed clinical engagement with defined deliverables and measurable outcomes.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Large card — Phase 1 */}
          <Reveal className="md:row-span-2" delay={0.05}>
            <div className="h-full rounded-2xl border border-gold-500/15 bg-midnight-900/60 p-8 flex flex-col">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-2xl">🏥</div>
              <span className="mb-3 text-xs font-heading font-bold uppercase tracking-[0.2em] text-gold-400">Phase 1 · Week 1–2</span>
              <h3 className="mb-4 font-display text-2xl text-white">Clinical Intake & Doctor Coordination</h3>
              <ul className="flex-1 space-y-3 text-sm text-slate-400">
                {[
                  "60-min video clinical assessment",
                  "Direct coordination with their physician",
                  "Full lab report and medication review",
                  "Risk stratification and contraindication mapping",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-gold-500/15 bg-gold-500/5 p-4">
                <p className="text-xs text-slate-500">You receive</p>
                <p className="text-sm font-heading font-semibold text-gold-300">Clinical Intake Report with full risk profile</p>
              </div>
            </div>
          </Reveal>

          {/* Phase 2 */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-teal-500/15 bg-midnight-900/60 p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-xl">👨‍🍳</div>
              <span className="mb-2 block text-xs font-heading font-bold uppercase tracking-[0.2em] text-teal-400">Phase 2 · Week 2–4</span>
              <h3 className="mb-3 font-display text-xl text-white">Kitchen Training</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                On-site or video session with the household cook. 28-day meal blueprint built around what&apos;s already in their kitchen.
              </p>
            </div>
          </Reveal>

          {/* Phase 3 */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-gold-500/15 bg-midnight-900/60 p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-xl">📊</div>
              <span className="mb-2 block text-xs font-heading font-bold uppercase tracking-[0.2em] text-gold-400">Phase 3 · Week 4–12</span>
              <h3 className="mb-3 font-display text-xl text-white">Monitoring & Reporting</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Daily WhatsApp check-ins, weekly plan adjustments, bi-weekly clinical dashboard emailed directly to you overseas.
              </p>
            </div>
          </Reveal>

          {/* Deliverable card */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-white/6 bg-gradient-to-br from-midnight-800/80 to-midnight-900/60 p-7">
              <p className="mb-4 text-xs font-heading font-bold uppercase tracking-[0.2em] text-slate-400">What NRI families get</p>
              <div className="space-y-3">
                {[
                  "Bi-weekly clinical PDF dashboard sent to you",
                  "Cook's laminated daily guide",
                  "Emergency glucose/BP escalation protocol",
                  "90-day outcome summary report",
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-400 text-[10px]">✓</span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CLINICAL AUTHORITY — not fear, proof
         ══════════════════════════════════════ */}
      <section className="border-t border-white/6 bg-midnight-900/30">
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* image */}
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8">
                <NextImage
                  src="/ashwini-diet.jpeg"
                  alt="Dt. Ashwini Gawad in clinical practice"
                  width={600}
                  height={700}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-3 p-6">
                  {[
                    { val: "MSc", label: "Dietetics" },
                    { val: "KEM", label: "Hospital Trained" },
                    { val: "VLCC", label: "Area Head" },
                    { val: "IDA", label: "Registered" },
                  ].map((b, i) => (
                    <div key={i} className="rounded-lg border border-white/10 bg-midnight-950/75 px-3 py-2.5 text-center backdrop-blur-sm">
                      <p className="font-display text-lg font-bold text-gold-400">{b.val}</p>
                      <p className="text-[10px] font-heading uppercase tracking-widest text-slate-400">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* copy */}
            <Reveal delay={0.1}>
              <span className="badge mb-6 inline-flex">Clinical Authority</span>
              <h2 className="mb-6 font-display text-4xl text-white md:text-5xl">
                25 years of hospital-grade expertise.
                <span className="text-gradient-gold"> Not Instagram.</span>
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-400">
                <p>
                  Ashwini Gawad holds a <strong className="text-white">Masters in Dietetics</strong> and spent her early career at
                  <strong className="text-gold-300"> KEM Hospital</strong>, one of India&apos;s most rigorous clinical institutions.
                </p>
                <p>
                  She served as <strong className="text-white">Area Technical Head for VLCC Healthcare</strong> across 25+ centres — managing clinical protocols, staff training, and outcome reporting at scale.
                </p>
                <p>Her specialisation spans:</p>
                <ul className="space-y-2">
                  {[
                    "Type 2 Diabetes (HbA1c management)",
                    "Geriatric nutrition and sarcopenia",
                    "Post-cardiac dietary rehabilitation",
                    "PCOS and hormonal nutrition",
                    "Hypertension with comorbid conditions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 rounded-xl border border-gold-500/20 bg-gold-500/5 p-5">
                <p className="font-heading text-sm font-semibold text-gold-300">
                  &ldquo;You&apos;re not getting a generic meal plan. You&apos;re getting a clinical brain that has managed 1,000+ cases — now managing yours.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUTCOMES — real data, not anecdote
         ══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal className="mb-14 text-center">
          <span className="badge mb-4 inline-flex">Clinical Outcomes</span>
          <h2 className="font-display text-4xl text-white md:text-5xl">Real families. Measured results.</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            All outcomes verified. Names changed for privacy.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              flag: "🇨🇦", location: "Toronto, Canada",
              condition: "Father — Type 2 Diabetes",
              before: "HbA1c 9.1", after: "HbA1c 7.3", weeks: "11 weeks",
              quote: "Within two weeks, Ashwini had coordinated with Papa's endocrinologist and completely retrained his cook. His numbers started dropping by week 4. I finally sleep through the night.",
            },
            {
              flag: "🇬🇧", location: "London, UK",
              condition: "Mother — Hypertension + Obesity",
              before: "BP 160/100", after: "BP 128/82", weeks: "8 weeks",
              quote: "Mum's cook was the biggest challenge. Ashwini did a video training session and literally transformed the kitchen. Mum's readings have been stable for the first time in years.",
            },
            {
              flag: "🇺🇸", location: "New Jersey, USA",
              condition: "Father — Post-cardiac, complex medications",
              before: "Poor dietary compliance", after: "Cardiologist approved", weeks: "12 weeks",
              quote: "After Dad's stent, the cardiologist said 'change diet' with no guidance. Ashwini reviewed every medication interaction, built a real plan, and sent me weekly dashboards.",
            },
          ].map((t, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-midnight-900/50 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-2xl">{t.flag}</span>
                  <div>
                    <p className="text-sm font-heading font-semibold text-white">{t.location}</p>
                    <p className="text-xs text-slate-500">{t.condition}</p>
                  </div>
                </div>

                {/* before/after */}
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-danger-500/8 border border-danger-500/15 p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Before</p>
                    <p className="text-sm font-heading font-bold text-danger-400">{t.before}</p>
                  </div>
                  <div className="rounded-lg bg-teal-500/8 border border-teal-500/15 p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">After {t.weeks}</p>
                    <p className="text-sm font-heading font-bold text-teal-400">{t.after}</p>
                  </div>
                </div>

                <blockquote className="flex-1 text-sm leading-relaxed text-slate-400">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES — clean cards
         ══════════════════════════════════════ */}
      <section className="border-t border-white/6 bg-midnight-900/30">
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <Reveal className="mb-14 text-center">
            <span className="badge mb-4 inline-flex">Services</span>
            <h2 className="font-display text-4xl text-white md:text-5xl">Choose your programme</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "90-Day NRI Concierge",
                subtitle: "Most popular",
                desc: "Full-managed protocol: intake, cook training, monitoring, bi-weekly dashboard to you overseas.",
                price: "₹45,000 – ₹65,000",
                highlight: true,
              },
              {
                title: "Diabetes Management",
                subtitle: "12-week programme",
                desc: "HbA1c-focused clinical plan with doctor coordination and glycemic monitoring.",
                price: "From ₹18,000",
                highlight: false,
              },
              {
                title: "PCOS & Hormonal",
                subtitle: "Women's health",
                desc: "Hormonal nutrition, insulin resistance management, cycle-aware meal planning.",
                price: "From ₹15,000",
                highlight: false,
              },
              {
                title: "Geriatric Nutrition",
                subtitle: "Senior care",
                desc: "Sarcopenia, malnutrition risk, medication-food interactions for elderly patients.",
                price: "From ₹15,000",
                highlight: false,
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${s.highlight ? "border-gold-500/30 bg-gold-500/5" : "border-white/8 bg-midnight-900/40"}`}>
                  {s.highlight && (
                    <span className="mb-3 inline-flex w-fit rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-gold-400">
                      Most Popular
                    </span>
                  )}
                  <p className="mb-1 text-[11px] font-heading uppercase tracking-wider text-slate-500">{s.subtitle}</p>
                  <h3 className="mb-3 font-display text-xl text-white">{s.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  <p className={`text-sm font-heading font-bold ${s.highlight ? "text-gold-400" : "text-slate-300"}`}>{s.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
         ══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 to-midnight-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(212,162,41,0.08),transparent)]" />
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-28 text-center md:px-8 md:py-36">
          <Reveal>
            <span className="badge mb-6 inline-flex">Apply Now · Limited to 8 families per quarter</span>
            <h2 className="mb-6 font-display text-4xl text-white md:text-5xl lg:text-6xl">
              Ready for clinical-grade
              <span className="text-gradient-gold"> nutrition management?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400">
              Book a 15-minute clinical assessment call. Ashwini reviews your family&apos;s case and tells you directly whether the programme is the right fit.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full px-10 py-5 font-heading text-base font-bold uppercase tracking-wider text-midnight-950 transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#e8c865,#d4a229,#e8c865)", boxShadow: "0 0 40px rgba(212,162,41,0.30)" }}
            >
              Book Clinical Assessment
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <p className="mt-5 text-xs text-slate-600">
              No payment required to apply &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; Mumbai-based, serving NRI families globally
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
