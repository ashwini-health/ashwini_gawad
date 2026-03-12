// src/app/page.tsx
"use client";

import NextImage from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Constants ─── */
const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hi%20Dt.%20Ashwini%2C%20I%20am%20an%20NRI%20and%20would%20like%20to%20apply%20for%20a%20Clinical%20Assessment%20Call%20regarding%20my%20parents%27%20health.";

/* ─── Animated section wrapper ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Floating particles background ─── */
function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold-500/10"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Credential badge component ─── */
function CredentialBadge({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 backdrop-blur-sm">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

/* ─── Stats counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                  */
/* ═══════════════════════════════════════════════════════════ */

export default function FunnelPage() {
  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 1 — HERO                          */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,200,101,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(5,200,176,0.04),transparent_50%)]" />
        <ParticleField />

        {/* Decorative line */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        <div className="relative z-10 container-wide px-4 pb-20 pt-16 md:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr,1fr] lg:gap-16">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="badge mb-6">
                <span className="h-2 w-2 animate-pulse rounded-full bg-gold-400" />
                Accepting 8 Families This Quarter
              </div>

              <h1 className="mb-6 font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
                Your Parents Are in Mumbai.{" "}
                <br className="hidden sm:block" />
                Their Diabetes Is{" "}
                <span className="text-gradient-gold">Unmanaged.</span>
                <br className="hidden sm:block" />
                <span className="text-slate-400">
                  And You&apos;re 12,000 km Away.
                </span>
              </h1>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                The <strong className="text-white">90-Day Concierge Parental Health Protocol</strong> — built by a{" "}
                <strong className="text-gold-300">25-year veteran Clinical Dietitian</strong> who
                coordinates with their Mumbai doctors, trains their household
                cook, and sends you a bi-weekly clinical dashboard.{" "}
                <em className="text-teal-400">So you stop worrying at 3 AM.</em>
              </p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-cta"
                  className="group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-heading text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #e8c865, #d4a229, #e2b93e)",
                    color: "#0c0c1a",
                    boxShadow: "0 0 30px rgba(232,200,101,0.35)",
                  }}
                >
                  Apply for Clinical Assessment Call
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <span className="text-xs text-slate-500">
                  No payment required to apply
                </span>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-2">
                <CredentialBadge icon="🏥" text="KEM Hospital Trained" />
                <CredentialBadge icon="🏢" text="Former VLCC Area Head" />
                <CredentialBadge icon="📊" text="500+ Clinical Cases" />
              </div>
            </motion.div>

            {/* Right — Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-500/20 via-transparent to-teal-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <NextImage
                  src="/ashwini.gawad.jpeg"
                  alt="Dt. Ashwini Gawad — Senior Clinical Dietitian"
                  width={500}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-midnight-950/20 to-transparent" />

                {/* Floating credential card */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-6 left-6 right-6 rounded-xl border border-gold-500/20 bg-midnight-950/80 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-lg">
                      ⚕️
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold text-white">
                        Dt. Ashwini Gawad
                      </p>
                      <p className="text-xs text-gold-400">
                        25+ Years Clinical Experience
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-midnight-950 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 2 — VSL VIDEO                     */}
      {/* ═══════════════════════════════════════════ */}
      <AnimatedSection className="section-padding relative bg-midnight-950">
        <div className="container-narrow">
          <div className="mb-8 text-center">
            <span className="badge-teal mb-4 inline-flex">Clinical Briefing</span>
            <h2 className="mb-4 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              Watch Before You Apply
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-base">
              This 4-minute clinical briefing explains exactly how the Protocol works
              — and whether your family qualifies.
            </p>
          </div>

          {/* Video Player Placeholder */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(232,200,101,0.06)]">
            <div className="relative aspect-video bg-gradient-to-br from-midnight-800 to-midnight-900">
              {/* Play button overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-500/50 bg-gold-500/20 backdrop-blur-sm"
                >
                  <svg className="ml-1 h-8 w-8 text-gold-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <p className="text-sm font-heading text-slate-400">
                  Video Coming Soon — Recording in Progress
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-danger-500" />
                <span className="text-xs font-heading uppercase tracking-widest text-slate-500">
                  Clinical Briefing
                </span>
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-slate-600">
                4:00
              </div>
            </div>
          </div>

          {/* VSL Framework Reference (for recording) */}
          <div className="mt-8 glass-card p-6">
            <p className="mb-4 text-center text-xs font-heading uppercase tracking-[0.2em] text-gold-400">
              What You&apos;ll Learn in This Video
            </p>
            <div className="grid gap-4 sm:grid-cols-5">
              {[
                { time: "0:00", title: "The Wake-Up Call", desc: "Why 3 AM panic calls from India are a symptom of a broken system" },
                { time: "0:30", title: "The Real Problem", desc: "Why local doctors and Instagram dietitians are failing your parents" },
                { time: "1:30", title: "The Clinician", desc: "25 years of hospital-grade credentials you can trust" },
                { time: "2:30", title: "The Protocol", desc: "The 3-phase system: Assess → Train → Monitor" },
                { time: "3:30", title: "Next Steps", desc: "How to apply (if you qualify)" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="mb-2 text-sm font-heading font-bold text-gold-300">
                    {item.time}
                  </div>
                  <div className="mb-1 text-xs font-heading font-semibold text-white">
                    {item.title}
                  </div>
                  <div className="text-[11px] leading-relaxed text-slate-500">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 3 — PAIN POINTS                   */}
      {/* ═══════════════════════════════════════════ */}
      <AnimatedSection className="section-padding relative">
        {/* Dark red gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-[#120a0a] to-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.04),transparent_70%)]" />

        <div className="container-narrow relative z-10">
          <div className="mb-12 text-center">
            <span className="badge-danger mb-4 inline-flex">The Reality</span>
            <h2 className="mb-4 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              You Already Know Something Is Wrong
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-500 md:text-base">
              You&apos;re not reading this by accident. One of these scenarios
              kept you awake last night.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📊",
                scenario:
                  "Your father told you his sugar was \"fine.\" Then you saw his lab report: HbA1c at 9.2. He doesn't understand what that number means. Neither does his cook.",
                label: "The Denial",
              },
              {
                icon: "🍳",
                scenario:
                  "Your mother's cook makes the same oil-heavy paratha and sabzi every day. You've tried explaining over video call. She smiles, nods, and changes nothing.",
                label: "The Kitchen",
              },
              {
                icon: "⏱️",
                scenario:
                  "The local doctor spent 4 minutes with your parents. You spent 4 hours on Google decoding the prescription. You still don't know if they should eat rice.",
                label: "The System",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative rounded-2xl border border-danger-700/20 bg-danger-500/[0.03] p-6 transition-all duration-300 hover:border-danger-600/30 hover:bg-danger-500/[0.06]"
              >
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-danger-500/40 to-transparent" />
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{card.icon}</span>
                  <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-danger-400">
                    {card.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {card.scenario}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 4 — CLINICAL AUTHORITY             */}
      {/* ═══════════════════════════════════════════ */}
      <AnimatedSection className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(232,200,101,0.05),transparent_50%)]" />

        <div className="container-wide relative z-10">
          <div className="mb-12 text-center">
            <span className="badge mb-4 inline-flex">Clinical Authority</span>
            <h2 className="mb-4 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              This Is Not Another Instagram Dietitian
            </h2>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr,1.3fr] lg:gap-16">
            {/* Left — Photo + Credentials */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold-500/10 to-transparent blur-xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/20">
                <NextImage
                  src="/ashwini-diet.jpeg"
                  alt="Dt. Ashwini Gawad — Clinical Setting"
                  width={600}
                  height={700}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent" />

                {/* Credential overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: "25+", label: "Years" },
                      { val: "500+", label: "Cases" },
                      { val: "25+", label: "Centres" },
                      { val: "KEM", label: "Trained" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-white/10 bg-midnight-950/70 p-3 text-center backdrop-blur-sm"
                      >
                        <div className="text-xl font-display font-bold text-gold-400">
                          {s.val}
                        </div>
                        <div className="text-[10px] font-heading uppercase tracking-widest text-slate-400">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Copy */}
            <div>
              <div className="space-y-5 text-sm leading-relaxed text-slate-300 md:text-base">
                <p>
                  There are 10,000 &ldquo;certified nutritionists&rdquo; on Instagram who
                  completed a weekend course and now sell{" "}
                  <span className="text-danger-400">₹999 meal plans</span>.
                </p>
                <p>
                  <strong className="text-white">Ashwini Gawad is not one of them.</strong>
                </p>
                <p>
                  She is a{" "}
                  <strong className="text-gold-300">
                    Board-Certified Clinical Dietitian
                  </strong>{" "}
                  with 25+ years of hospital-grade experience. She was the{" "}
                  <strong className="text-white">
                    Area Technical Head at VLCC Healthcare
                  </strong>
                  , responsible for clinical nutrition protocols across 25+ centres
                  in Western, Southern and Central India.
                </p>
                <p>She has personally managed 500+ clinical cases involving:</p>
                <ul className="space-y-2 pl-0">
                  {[
                    "Uncontrolled Type 2 Diabetes (HbA1c > 8.0)",
                    "Post-cardiac event dietary rehabilitation",
                    "Geriatric malnutrition and sarcopenia",
                    "PCOS with insulin resistance",
                    "Hypertension with comorbid obesity",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Her training comes from{" "}
                  <strong className="text-teal-400">KEM Hospital</strong> — one
                  of India&apos;s most prestigious government medical institutions —
                  not from a weekend webinar.
                </p>
                <div className="mt-6 rounded-xl border border-gold-500/20 bg-gold-500/[0.04] p-5">
                  <p className="font-heading text-sm font-semibold text-gold-300">
                    When you hire her, you are not paying for a PDF.
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    You are paying for a 25-year clinical brain that coordinates
                    your parents&apos; entire nutritional ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 5 — THE PROTOCOL (How It Works)   */}
      {/* ═══════════════════════════════════════════ */}
      <AnimatedSection className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(5,200,176,0.04),transparent_60%)]" />

        <div className="container-narrow relative z-10">
          <div className="mb-16 text-center">
            <span className="badge-teal mb-4 inline-flex">The Concierge Protocol</span>
            <h2 className="mb-4 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              The 90-Day Concierge Parental Health Protocol
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-base">
              Not a diet plan. A fully managed clinical nutrition system for your
              parents — with verified reporting sent directly to you overseas.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-gold-500/40 via-teal-500/40 to-gold-500/40 md:left-1/2" />

            {[
              {
                phase: "Phase 1",
                weeks: "Week 1–2",
                title: "Clinical Intake & Doctor Coordination",
                color: "gold",
                icon: "🏥",
                items: [
                  "60-minute video assessment of your parents' full medical history",
                  "Direct coordination call with their existing Mumbai physician",
                  "Review of all lab reports, medications, and contraindications",
                ],
                deliverable:
                  "A Clinical Intake Summary with risk stratification",
              },
              {
                phase: "Phase 2",
                weeks: "Week 2–4",
                title: "Kitchen Takeover & Cook Training",
                color: "teal",
                icon: "👨‍🍳",
                items: [
                  "On-site or video training session with the household cook",
                  "Customized 28-day meal blueprint using existing kitchen ingredients",
                  "Protein targets, glycemic load management, and medication-meal timing",
                ],
                deliverable:
                  "The Cook's Daily Guide (laminated for the kitchen)",
              },
              {
                phase: "Phase 3",
                weeks: "Week 4–12",
                title: "Monitoring & Dashboard Reporting",
                color: "gold",
                icon: "📊",
                items: [
                  "Daily WhatsApp check-ins for blood sugar / BP readings",
                  "Weekly plan adjustments based on real data",
                  "Bi-weekly Clinical Dashboard emailed to you overseas",
                  "Emergency protocol for glucose spikes or adverse readings",
                ],
                deliverable:
                  "Bi-weekly PDF dashboard with trends, compliance, and clinical recommendations",
              },
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className={`relative mb-12 flex flex-col gap-4 pl-16 md:w-[calc(50%-2rem)] md:pl-0 ${idx % 2 === 0
                  ? "md:mr-auto md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12 md:text-left"
                  }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 md:top-1 ${idx % 2 === 0
                    ? "md:left-auto md:right-[-2.625rem]"
                    : "md:left-[-2.625rem]"
                    } ${phase.color === "teal"
                      ? "border-teal-500 bg-teal-500/20"
                      : "border-gold-500 bg-gold-500/20"
                    }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${phase.color === "teal" ? "bg-teal-400" : "bg-gold-400"
                      }`}
                  />
                </div>

                {/* Card */}
                <div
                  className={`glass-card-elevated p-6 text-left ${phase.color === "teal"
                    ? "border-teal-500/20"
                    : "border-gold-500/20"
                    }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{phase.icon}</span>
                    <div>
                      <div
                        className={`text-xs font-heading font-bold uppercase tracking-[0.2em] ${phase.color === "teal"
                          ? "text-teal-400"
                          : "text-gold-400"
                          }`}
                      >
                        {phase.phase} — {phase.weeks}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {phase.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <span
                          className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${phase.color === "teal"
                            ? "bg-teal-500"
                            : "bg-gold-500"
                            }`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`rounded-lg border p-3 ${phase.color === "teal"
                      ? "border-teal-500/20 bg-teal-500/[0.05]"
                      : "border-gold-500/20 bg-gold-500/[0.05]"
                      }`}
                  >
                    <p className="text-xs text-slate-500">You receive:</p>
                    <p
                      className={`text-sm font-heading font-semibold ${phase.color === "teal"
                        ? "text-teal-300"
                        : "text-gold-300"
                        }`}
                    >
                      {phase.deliverable}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 6 — TESTIMONIALS                   */}
      {/* ═══════════════════════════════════════════ */}
      <AnimatedSection className="section-padding relative bg-midnight-950">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <span className="badge mb-4 inline-flex">Success Stories</span>
            <h2 className="mb-4 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              Families Who Stopped Worrying
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-base">
              Names changed for privacy. The clinical outcomes are real and
              verified.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                flag: "🇨🇦",
                location: "Toronto, Canada",
                condition: "Father — Type 2 Diabetes",
                result: "HbA1c dropped from 9.1 → 7.3",
                timeline: "11 weeks",
                quote:
                  "I was tired of guessing from 12,000 km away. Within two weeks, Ashwini had coordinated with Papa's endocrinologist and retrained his cook. His numbers started dropping by week 4. I finally sleep at night.",
              },
              {
                flag: "🇬🇧",
                location: "London, UK",
                condition: "Mother — Hypertension + Obesity",
                result: "BP stabilized, cook follows structured plan",
                timeline: "8 weeks",
                quote:
                  "Mum's cook was the biggest blocker. She'd nod and then fry everything in ghee. Ashwini did a 90-minute video session with her and literally transformed the kitchen. Mum's BP readings are now consistent for the first time in years.",
              },
              {
                flag: "🇺🇸",
                location: "New Jersey, USA",
                condition: "Father — Post-cardiac, medication conflicts",
                result: "Cardiologist noted 'significant dietary improvement'",
                timeline: "12 weeks",
                quote:
                  "After Dad's stent, the cardiologist said 'change diet' but never explained how. Ashwini reviewed every medication interaction, built a plan around his actual kitchen, and sent me weekly dashboards. His cardiologist was impressed at the follow-up.",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card-elevated flex flex-col p-6"
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{testimonial.flag}</span>
                    <div>
                      <p className="text-xs font-heading font-semibold text-white">
                        {testimonial.location}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {testimonial.condition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mb-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Result */}
                <div className="rounded-lg border border-teal-500/20 bg-teal-500/[0.05] p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Clinical Outcome</p>
                      <p className="text-sm font-heading font-bold text-teal-400">
                        {testimonial.result}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Timeline</p>
                      <p className="text-sm font-heading font-semibold text-white">
                        {testimonial.timeline}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 7 — PRICING                        */}
      {/* ═══════════════════════════════════════════ */}
      <AnimatedSection className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,200,101,0.05),transparent_50%)]" />

        <div className="container-narrow relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge mb-6 inline-flex">The Investment</span>
            <h2 className="mb-2 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              ₹70,000
            </h2>
            <p className="mb-2 text-sm text-slate-500">
              for the complete 90-Day Protocol
            </p>
            <p className="mb-8 text-lg text-gold-300 opacity-80">
              ≈ $840 CAD &nbsp;|&nbsp; ≈ $630 USD &nbsp;|&nbsp; ≈ £510 GBP
            </p>

            {/* Value breakdown */}
            <div className="glass-card-elevated mx-auto max-w-2xl p-8 text-left">
              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                That is{" "}
                <strong className="text-gold-300">₹778/day</strong> for a senior
                clinical dietitian to personally manage your parents&apos;
                nutrition, coordinate with their doctors, train their cook, and
                send you verified clinical reports.
              </p>

              <div className="mb-6 space-y-3">
                <p className="text-xs font-heading font-semibold uppercase tracking-[0.15em] text-slate-500">
                  For Context
                </p>
                {[
                  {
                    item: "A single ER visit for a diabetic emergency",
                    cost: "₹25,000 – ₹1,50,000",
                  },
                  {
                    item: "Monthly cost of unmanaged diabetes complications",
                    cost: "₹15,000+",
                  },
                  {
                    item: "Your peace of mind",
                    cost: "Priceless",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-sm text-slate-400">{row.item}</span>
                    <span
                      className={`text-sm font-heading font-bold ${i === 2 ? "text-gold-400" : "text-danger-400"
                        }`}
                    >
                      {row.cost}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-gold-500/20 bg-gold-500/[0.04] p-4 text-center">
                <p className="text-sm text-slate-300">
                  This is not a subscription. It is a{" "}
                  <strong className="text-white">
                    90-day clinical engagement with a defined outcome.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════ */}
      {/*  SECTION 8 — CTA (Application Only)         */}
      {/* ═══════════════════════════════════════════ */}
      <section id="apply" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-midnight-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(232,200,101,0.08),transparent_60%)]" />
        {/* Top gold line */}
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="container-narrow relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="badge mb-6 inline-flex">Limited Enrollment</span>
            <h2 className="mb-6 font-display text-3xl text-white md:text-4xl lg:text-5xl">
              Apply for a Clinical Assessment Call
            </h2>

            <div className="mb-8 space-y-4 text-sm leading-relaxed text-slate-400 md:text-base">
              <p>
                We accept a maximum of{" "}
                <strong className="text-gold-300">
                  8 new families per quarter
                </strong>{" "}
                to ensure clinical quality is never compromised.
              </p>
              <p>
                This is not a sales call. It is a{" "}
                <strong className="text-white">
                  15-minute clinical screening
                </strong>{" "}
                where Ashwini will review your parents&apos; latest lab reports
                and determine if the Protocol is appropriate for their condition.
              </p>
              <p className="text-slate-500">
                If we are not the right fit, we will tell you directly and refer
                you to the appropriate specialist — free of charge.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="final-cta"
                className="group inline-flex items-center gap-3 rounded-full px-10 py-5 font-heading text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #e8c865, #d4a229, #e8c865)",
                  color: "#0c0c1a",
                  boxShadow: "0 0 40px rgba(232,200,101,0.35)",
                }}
              >
                Apply for Your Clinical Assessment
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <p className="mb-12 text-xs text-slate-600">
              Limited to 8 families per quarter &nbsp;•&nbsp; No obligation
              &nbsp;•&nbsp; No payment required to apply
            </p>

            {/* Trust footer */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-t border-white/5 pt-8">
              <CredentialBadge icon="🏥" text="KEM Hospital Trained" />
              <CredentialBadge icon="🏢" text="Former VLCC Area Head" />
              <CredentialBadge icon="📊" text="500+ Clinical Cases" />
              <CredentialBadge icon="🇮🇳" text="Mumbai, India" />
            </div>

            {/* Copyright */}
            <p className="mt-8 text-[11px] text-slate-700">
              © {new Date().getFullYear()} Dt. Ashwini Gawad. All rights reserved.
              Clinical Dietitian, Mumbai.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
