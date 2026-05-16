import React from "react";
import { LeadGatewayForm } from "@/components/lead-gateway/LeadGatewayForm";

export default function BookConsultationPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            Book Consultation
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            Complete Clinical Intake
          </h1>
          <p className="max-w-3xl text-base text-slate-400">
            Please complete this intake form. After submission and review,
            consultation coordination continues securely over WhatsApp.
          </p>
        </header>

        <LeadGatewayForm />
      </div>
    </div>
  );
}
