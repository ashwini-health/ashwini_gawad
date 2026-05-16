import React from "react";
import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Initial enquiry",
    body: "Send a WhatsApp message with your concern, your parents' age, their city, and whether you prefer in-person or online coordination. Ashwini responds within 24 hours on working days.",
  },
  {
    n: "02",
    title: "Clinical assessment call",
    body: "A 45–60 minute call covering their medical reports, medications, symptoms, lifestyle, sleep, stress and current meals. This replaces the standard first appointment.",
  },
  {
    n: "03",
    title: "Personalised plan design",
    body: "A clearly structured plan is shared — full-day meal examples, protein targets, practical guidelines for eating out, social events and travel. All calibrated with their existing medications.",
  },
  {
    n: "04",
    title: "Cook training",
    body: "For the Concierge Protocol: Ashwini meets the household cook in-person or via video call to demonstrate correct preparation, portion control and oil substitutions.",
  },
  {
    n: "05",
    title: "Bi-weekly dashboard",
    body: "You receive a structured health update every two weeks: weight trend, blood sugar readings, adherence notes and any plan adjustments. You stay fully informed from abroad.",
  },
  {
    n: "06",
    title: "Long-term maintenance",
    body: "Once readings stabilise and the routine feels natural, we refine a lighter maintenance plan your parents can continue independently. You always have WhatsApp access for urgent questions.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-14">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            Process
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            What working together looks like
          </h1>
          <p className="max-w-3xl text-base text-slate-400">
            A step-by-step structure so you always know where you are in your
            parents&apos; health journey and what comes next.
          </p>
        </header>

        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`flex gap-6 rounded-2xl border p-6 transition-all ${
                i === 0
                  ? "border-gold-500/20 bg-gold-500/5"
                  : "glass-card"
              }`}
            >
              <div className="shrink-0">
                <span className="font-display text-2xl font-semibold text-gold-500/40">{step.n}</span>
              </div>
              <div>
                <h3 className="mb-2 font-heading text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-base text-slate-400">Ready to get started?</p>
          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 font-heading font-semibold text-midnight-950 shadow-lg transition-all hover:shadow-gold-500/20 hover:shadow-xl"
          >
            Complete Clinical Intake &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
