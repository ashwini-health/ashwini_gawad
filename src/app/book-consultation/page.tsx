import React from "react";
import { LeadGatewayForm } from "@/components/lead-gateway/LeadGatewayForm";

export default function BookConsultationPage() {
  return (
    <div className="bg-cream px-4 py-20 md:px-6 lg:px-8 dark:bg-warmGray-950">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-300">
            Book Consultation
          </p>
          <h1 className="mb-3 font-heading text-3xl font-semibold text-warmGray-900 md:text-4xl dark:text-warmGray-50">
            Complete Clinical Intake
          </h1>
          <p className="max-w-3xl text-sm text-warmGray-700 md:text-base dark:text-warmGray-200">
            Please complete this intake form. After submission and review, consultation coordination continues securely.
          </p>
        </header>

        <LeadGatewayForm />
      </div>
    </div>
  );
}
