import type { Metadata } from "next";
import Link from "next/link";
import { PremiumEnquiryForm } from "@/components/PremiumEnquiryForm";

export const metadata: Metadata = {
  title: "Private Nutrition Advisory in India | Ashwini Gawad",
  description:
    "Explore personalised, founder-led nutrition guidance for individuals and households in India. Six-month private advisory proposals start at ₹1 lakh, subject to suitability and agreed scope.",
  // Pilot page must not be indexed until scope, evidence, disclosures and payment route are approved.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Private Nutrition Advisory in India | Ashwini Gawad",
    description: "Apply to discuss private, long-term nutrition guidance in India. Programmes subject to suitability and written scope.",
    type: "website",
  },
};

const principles = [
  { title: "A practical plan", description: "Structured meal guidance built around real Indian food, work, family routines and preferences." },
  { title: "Scheduled professional reviews", description: "Defined review appointments, progress checks and thoughtful adjustments, rather than a one-time generic chart." },
  { title: "Clear boundaries", description: "Written inclusions, duration, support hours and exclusions before enrolment. No surprise promises." },
];

export default function PrivateNutritionPage() {
  return (
    <div className="min-h-screen bg-midnight-950 text-slate-200">
      <section className="border-b border-white/10 bg-gradient-to-b from-gold-500/10 to-midnight-950 px-4 pb-14 pt-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">India · Private nutrition advisory</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-white md:text-6xl">
            Personal nutrition guidance. Built around the life you actually live.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            Explore a personalised, longer-term nutrition service led by Ashwini Gawad.
            For adults and families seeking structured guidance, careful follow-through and practical everyday meals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#enquiry" className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 font-heading font-semibold text-midnight-950">Request programme details</a>
            <span className="text-sm text-slate-300">Six-month individual advisory proposals from <strong className="text-gold-300">₹1,00,000</strong></span>
          </div>
          <p className="mt-4 text-xs text-slate-400">Pricing is a proposed starting level, not a promise of medical outcomes. Personal suitability and exact deliverables are agreed in writing before purchase.</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="font-display text-3xl text-white">What makes this different from a diet chart?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-heading text-lg font-semibold text-gold-300">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-midnight-900/40 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl text-white">A selective, straightforward process</h2>
          <ol className="mt-7 grid gap-5 md:grid-cols-3">
            <li className="rounded-xl border border-white/10 p-5"><strong className="text-gold-300">01 · Enquire</strong><p className="mt-2 text-sm text-slate-300">Share only contact and programme-interest details. No health information is requested.</p></li>
            <li className="rounded-xl border border-white/10 p-5"><strong className="text-gold-300">02 · Discuss fit</strong><p className="mt-2 text-sm text-slate-300">We explain potential scope, time commitments and fee. We may suggest another provider where appropriate.</p></li>
            <li className="rounded-xl border border-white/10 p-5"><strong className="text-gold-300">03 · Agree the service</strong><p className="mt-2 text-sm text-slate-300">Only suitable clients receive a personalised written proposal, consent paperwork and payment terms.</p></li>
          </ol>
          <p className="mt-6 text-sm text-slate-400">Bespoke family and household arrangements can be discussed, but no services, external clinicians or outcomes are guaranteed unless explicitly contracted.</p>
        </div>
      </section>

      <section id="enquiry" className="mx-auto grid max-w-5xl gap-10 px-4 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">First step</p>
          <h2 className="mt-4 font-display text-3xl text-white">Start with a conversation, not a checkout.</h2>
          <p className="mt-5 leading-relaxed text-slate-300">
            High-touch nutrition support is not suitable for everybody. An initial fit discussion helps both sides
            decide whether further assessment and a written proposal make sense.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            Nutrition advice is not a substitute for diagnosis, medication decisions or emergency medical care.
            Clinical information is requested only through a separate, appropriately consented process.
          </p>
          <p className="mt-4 text-sm"><Link href="/contact" className="text-gold-300 underline underline-offset-4">Other enquiries and contact details</Link></p>
        </div>
        <div className="lg:col-span-3"><PremiumEnquiryForm /></div>
      </section>
    </div>
  );
}
