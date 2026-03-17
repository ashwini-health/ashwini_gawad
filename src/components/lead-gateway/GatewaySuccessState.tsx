import React from "react";

type GatewaySuccessStateProps = {
  intakeId: string;
};

export function GatewaySuccessState({ intakeId }: GatewaySuccessStateProps) {
  return (
    <div className="rounded-3xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
      <h2 className="font-heading text-xl font-semibold">Intake submitted successfully</h2>
      <p className="mt-2 text-sm">
        Your clinical intake has been recorded. Our team will review it and continue consultation coordination securely.
      </p>
      <p className="mt-2 text-xs">Reference ID: {intakeId}</p>
    </div>
  );
}
