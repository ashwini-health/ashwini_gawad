import React from "react";

type GatewaySuccessStateProps = {
  intakeId: string;
};

export function GatewaySuccessState({ intakeId }: GatewaySuccessStateProps) {
  return (
    <div className="rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10">
        <svg className="h-7 w-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-heading text-xl font-semibold text-white">Intake submitted successfully</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        Your clinical intake has been recorded. Dt. Ashwini will review it within 24 hours and reach out via WhatsApp to coordinate your consultation.
      </p>
      <p className="mt-4 text-xs text-slate-600">Reference ID: {intakeId}</p>
    </div>
  );
}
