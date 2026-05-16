import React from "react";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            Resources
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            Articles &amp; Guides
          </h1>
          <p className="max-w-3xl text-base text-slate-400">
            Short, practical pieces on Indian diets for diabetes, heart health,
            PCOS and healthy ageing.
          </p>
        </header>

        <div className="glass-card-elevated flex flex-col items-center gap-4 p-12 text-center">
          <div className="text-5xl">📚</div>
          <h2 className="font-heading text-xl font-semibold text-white">Content coming soon</h2>
          <p className="max-w-lg text-sm text-slate-400">
            Clinical guides, meal planning templates and evidence-based articles are being prepared. Check the{" "}
            <Link href="/clinical-insights" className="text-gold-300 hover:text-gold-200 underline underline-offset-4">
              Clinical Insights
            </Link>{" "}
            section for published posts.
          </p>
        </div>
      </div>
    </div>
  );
}
