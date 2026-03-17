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
    <form action={formAction} className="space-y-5 rounded-3xl border border-warmGray-200 bg-white p-6 shadow-md dark:border-warmGray-700 dark:bg-warmGray-900">
      <input type="hidden" name="sourcePage" value="/book-consultation" />
      <ClinicalIntakeFields />
      <MedicalDisclaimer />

      {state.error ? <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-terracotta-500 to-terracotta-600 px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Submitting intake..." : "Submit Clinical Intake"}
      </button>
    </form>
  );
}
