import React from "react";

export function MedicalDisclaimer() {
  return (
    <div className="rounded-2xl border border-warmGray-200 bg-cream p-4 text-sm text-warmGray-700 dark:border-warmGray-700 dark:bg-warmGray-900 dark:text-warmGray-100">
      <p>
        This intake is required before consultation coordination. It does not replace emergency care or a physician diagnosis.
      </p>
      <label className="mt-3 flex items-start gap-2">
        <input type="checkbox" name="consentAccepted" required className="mt-1" />
        <span>I have read and accept the medical disclaimer and consent to data submission for consultation intake.</span>
      </label>
    </div>
  );
}
