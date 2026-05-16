import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NPD & Ready-to-Cook Products | Dt. Ashwini Gawad",
};

export default function NpdPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            NPD
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            New Food Product Development
          </h1>
          <p className="max-w-2xl text-base text-slate-400">
            Building healthy, Indian, ready-to-cook mixes and nutrition kits for elderly
            adults, working women and children — grounded in clinical nutrition.
          </p>
        </header>

        <div className="space-y-6">
          {[
            {
              title: "Elderly Nutrition Kits",
              desc: "Ready-to-prepare meal mixes designed for seniors managing diabetes, cardiac issues and reduced appetite. Cook-friendly, portion-controlled, high-protein.",
            },
            {
              title: "Women's Wellness Blends",
              desc: "Protein and micronutrient blends calibrated for PCOS, thyroid conditions and postpartum recovery. Based on Indian kitchen staples.",
            },
            {
              title: "Children's Nutrition Mixes",
              desc: "School-age nutrition mixes that hide vegetables and legumes in familiar formats — parathas, dosas, ladoos. Evidence-based formulations.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-card p-6">
              <h3 className="mb-2 font-heading text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-card-elevated p-6 text-center">
          <p className="text-sm text-slate-400">
            Interested in product development collaboration?{" "}
            <a href="mailto:ashwini.gawad@gmail.com" className="text-gold-300 hover:text-gold-200">
              Contact Ashwini directly.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
