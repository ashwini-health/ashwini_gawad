"use client";

import React, { useActionState } from "react";
import { submitLeadGateway } from "@/app/actions";
import { ClinicalIntakeFields } from "@/components/lead-gateway/ClinicalIntakeFields";
import { GatewaySuccessState } from "@/components/lead-gateway/GatewaySuccessState";
import { MedicalDisclaimer } from "@/components/lead-gateway/MedicalDisclaimer";
import { initialLeadGatewayActionState } from "@/lib/lead-gateway/constants";

export function LeadGatewayForm() {
  const [state, formAction, pending] = useActionState(submitLeadGateway, initialLeadGatewayActionState);

  if (state.ok && state.intakeId) {
    return <GatewaySuccessState intakeId={state.intakeId} />;
  }

  return (
    <form action={formAction} className="glass-card-elevated space-y-6 p-8">
      <input type="hidden" name="sourcePage" value="/book-consultation" />
      <ClinicalIntakeFields />
      <MedicalDisclaimer />

      {state.error ? (
        <p className="rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-4 font-heading text-sm font-semibold text-midnight-950 shadow-xl transition-all hover:shadow-gold-500/20 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting intake…" : "Submit Clinical Intake"}
      </button>
    </form>
  );
}
