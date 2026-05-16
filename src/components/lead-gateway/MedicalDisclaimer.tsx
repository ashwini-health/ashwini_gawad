import React from "react";

export function MedicalDisclaimer() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
      <p>
        This intake is required before consultation coordination. It does not replace emergency care or a physician diagnosis.
      </p>
      <label className="mt-3 flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consentAccepted"
          required
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-gold-400"
        />
        <span className="text-slate-400">
          I have read and accept the medical disclaimer and consent to data submission for consultation intake.
        </span>
      </label>
    </div>
  );
}
