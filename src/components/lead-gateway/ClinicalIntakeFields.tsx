import React from "react";

export function ClinicalIntakeFields() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
            Full Name
          </label>
          <input id="name" name="name" required className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
            Phone
          </label>
          <input id="phone" name="phone" required className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
            Email (optional)
          </label>
          <input id="email" name="email" type="email" className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
        </div>
        <div>
          <label htmlFor="nriCountry" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
            NRI Country (optional)
          </label>
          <input id="nriCountry" name="nriCountry" className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
        </div>
      </div>

      <div>
        <label htmlFor="parentsCity" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
          Parents&apos; City
        </label>
        <input id="parentsCity" name="parentsCity" required className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="parentAge1" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
            Parent Age 1
          </label>
          <input id="parentAge1" name="parentAge1" type="number" min={1} max={120} required className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
        </div>
        <div>
          <label htmlFor="parentAge2" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
            Parent Age 2
          </label>
          <input id="parentAge2" name="parentAge2" type="number" min={1} max={120} required className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
        </div>
      </div>

      <div>
        <label htmlFor="primaryAilments" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
          Primary Ailments (comma-separated)
        </label>
        <textarea id="primaryAilments" name="primaryAilments" required rows={3} className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
      </div>

      <div>
        <label htmlFor="currentMedications" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
          Current Medications
        </label>
        <textarea id="currentMedications" name="currentMedications" required rows={3} className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
      </div>

      <div>
        <label htmlFor="medicalConditionSummary" className="mb-1 block text-xs font-heading font-semibold uppercase tracking-[0.16em] text-warmGray-600 dark:text-warmGray-300">
          Medical Condition Summary
        </label>
        <textarea id="medicalConditionSummary" name="medicalConditionSummary" required rows={4} className="w-full rounded-xl border border-warmGray-300 bg-white px-3 py-2 text-sm text-warmGray-900" />
      </div>
    </div>
  );
}
