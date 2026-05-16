import React from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Corporate Professional",
    context: "Stress, irregular meals, pre-diabetes",
    quote: "With hectic meetings and travel, I had almost given up on a proper routine. The plan helped me stabilise my sugar and start eating at sane times.",
    result: "Fasting sugar reduced and energy improved over 12 weeks.",
  },
  {
    name: "Homemaker, 65 yrs",
    context: "Arthritis, weight gain, poor appetite",
    quote: "We adjusted my portions and meal timings to fit my pain and sleep pattern. I felt lighter, and my digestion improved.",
    result: "Gradual, safe weight loss with better mobility and appetite.",
  },
  {
    name: "Young Woman, 27 yrs",
    context: "PCOS, severe hair fall",
    quote: "Once I understood the link between protein, sleep and hormones, things started changing. The food was simple and Indian, not fancy.",
    result: "Hair fall reduced and cycles became more regular over a few months.",
  },
  {
    name: "NRI Family — Toronto",
    context: "Parents in Mumbai, diabetes + hypertension",
    quote: "My parents refused to change their food habits until Ashwini visited them at home and worked with their cook. The bi-weekly reports gave me real peace of mind.",
    result: "HbA1c down 1.2 points in 90 days. BP medication reduced.",
  },
  {
    name: "Retired Professional, 70 yrs",
    context: "Post-surgery recovery, poor appetite",
    quote: "After my bypass, I had no appetite and was losing too much weight. The plan was soft, tasty and helped me rebuild strength without stress.",
    result: "Regained 4 kg of healthy weight. Energy levels normalised.",
  },
  {
    name: "Mother of Two, 38 yrs",
    context: "Thyroid, fatigue, weight plateau",
    quote: "I had tried everything and nothing shifted the weight. Understanding how my thyroid medication interacted with my diet was the missing piece.",
    result: "7 kg weight loss over 5 months. Fatigue significantly improved.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="container-wide">
        <header className="mb-14 text-center">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            Results
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            Real transformations from real people
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-400">
            Case outlines are anonymised to protect privacy, but the journeys
            and outcomes are real.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-base text-slate-400">
            Want results like these for your parents?
          </p>
          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-3.5 font-heading font-semibold text-midnight-950 shadow-lg transition-all hover:shadow-gold-500/20 hover:shadow-xl"
          >
            Apply for the 90-Day Protocol &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
