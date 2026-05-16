import React from "react";

const fieldClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-gold-500/40 focus:bg-white/8 focus:ring-1 focus:ring-gold-500/20";
const labelClass = "mb-2 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-slate-500";

export function ClinicalIntakeFields() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name</label>
          <input id="name" name="name" required className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone / WhatsApp</label>
          <input id="phone" name="phone" required className={fieldClass} placeholder="+91 or international" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>Email (optional)</label>
          <input id="email" name="email" type="email" className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="nriCountry" className={labelClass}>Your Country (if NRI)</label>
          <input id="nriCountry" name="nriCountry" className={fieldClass} placeholder="Canada, USA, UK…" />
        </div>
      </div>

      <div>
        <label htmlFor="parentsCity" className={labelClass}>Parents&apos; City</label>
        <input id="parentsCity" name="parentsCity" required className={fieldClass} placeholder="Mumbai, Pune…" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="parentAge1" className={labelClass}>Parent 1 Age</label>
          <input id="parentAge1" name="parentAge1" type="number" min={1} max={120} required className={fieldClass} placeholder="e.g. 68" />
        </div>
        <div>
          <label htmlFor="parentAge2" className={labelClass}>Parent 2 Age (optional)</label>
          <input id="parentAge2" name="parentAge2" type="number" min={1} max={120} className={fieldClass} placeholder="e.g. 65" />
        </div>
      </div>

      <div>
        <label htmlFor="primaryAilments" className={labelClass}>Primary Ailments</label>
        <textarea
          id="primaryAilments"
          name="primaryAilments"
          required
          rows={3}
          className={fieldClass}
          placeholder="e.g. Type 2 diabetes, hypertension, arthritis"
        />
      </div>

      <div>
        <label htmlFor="currentMedications" className={labelClass}>Current Medications</label>
        <textarea
          id="currentMedications"
          name="currentMedications"
          required
          rows={3}
          className={fieldClass}
          placeholder="List medications and dosages if known"
        />
      </div>

      <div>
        <label htmlFor="medicalConditionSummary" className={labelClass}>Brief Health Summary</label>
        <textarea
          id="medicalConditionSummary"
          name="medicalConditionSummary"
          required
          rows={4}
          className={fieldClass}
          placeholder="Describe your parents' current health situation and what you'd like to achieve"
        />
      </div>
    </div>
  );
}
