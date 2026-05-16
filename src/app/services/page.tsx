import React from "react";
import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hi%20Dt.%20Ashwini%2C%20I%20am%20an%20NRI%20and%20would%20like%20to%20apply%20for%20a%20Clinical%20Assessment%20Call%20regarding%20my%20parents%27%20health.";

const SERVICES = [
  {
    name: "90-Day Concierge Parental Protocol",
    tag: "NRI Families",
    tagColor: "gold",
    desc: "For NRI families whose parents are in Mumbai. Ashwini coordinates with their doctors, trains their cook, and sends you a bi-weekly clinical dashboard.",
    bullets: [
      "Full clinical intake and medical report review",
      "Personalised meal plan calibrated with existing medications",
      "Cook training (in-home or video call)",
      "Bi-weekly health dashboard sent to you",
      "WhatsApp access for urgent queries",
    ],
    price: "₹45,000 – ₹65,000",
  },
  {
    name: "Diabetes & Heart Health Plan",
    tag: "Most common",
    tagColor: "teal",
    desc: "For Type 2 diabetes, pre-diabetes, high cholesterol and hypertension. Evidence-based protocols that work with your real food culture.",
    bullets: [
      "Detailed report and medication review",
      "Personalised full-day meal plan",
      "Glycaemic index guidance for Indian meals",
      "Follow-up adjustments based on readings",
    ],
    price: "On consultation",
  },
  {
    name: "PCOS & Weight Management Plan",
    tag: "For women",
    tagColor: "teal",
    desc: "For menstrual irregularity, weight gain and fatigue. Cycle-focused, protein-first nutrition that works with Indian kitchen staples.",
    bullets: [
      "Cycle-focused nutrition plan",
      "Protein and strength-focused guidance",
      "Education on long-term PCOS management",
      "Practical Indian food substitutions",
    ],
    price: "On consultation",
  },
  {
    name: "Geriatric & Family Meal Planning",
    tag: "Seniors",
    tagColor: "teal",
    desc: "Adapted nutrition for elderly parents managing multiple conditions. Practical, cook-friendly plans for typical Mumbai households.",
    bullets: [
      "Multi-condition diet coordination",
      "Cook-friendly meal guides",
      "Appetite and texture adaptation",
      "Family meal integration strategies",
    ],
    price: "On consultation",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="container-wide">
        <header className="mb-14 text-center">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            Services
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            Programmes &amp; Consultations
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-400">
            All plans are built around your medical history, reports and real
            life. These are typical structures; final details are personalised.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.name} className="glass-card-elevated flex flex-col p-8">
              <div className="mb-5 flex items-start justify-between gap-3">
                <h2 className="font-heading text-xl font-semibold text-white">{service.name}</h2>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-heading font-semibold ${
                  service.tagColor === "gold"
                    ? "border border-gold-500/30 bg-gold-500/10 text-gold-300"
                    : "border border-teal-500/30 bg-teal-500/10 text-teal-300"
                }`}>
                  {service.tag}
                </span>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">{service.desc}</p>
              <ul className="mb-6 flex-1 space-y-2.5">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-white/5 pt-5">
                <span className="text-sm font-heading font-semibold text-gold-300">{service.price}</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-sm font-heading font-semibold text-gold-300 transition-all hover:bg-gold-500/20"
                >
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="mb-6 text-base text-slate-400">
            Not sure which programme fits your situation?
          </p>
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
