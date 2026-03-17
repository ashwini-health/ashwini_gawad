import type { LeadGatewayInput } from "@/lib/lead-gateway/schema";
import { normalizeOptionalText, normalizePhone, normalizeText } from "@/lib/lead-gateway/normalizers";

export function mapLeadGatewayInput(input: LeadGatewayInput) {
  const ailments = input.primaryAilments
    .split(",")
    .map((item) => normalizeText(item))
    .filter(Boolean);

  return {
    user: {
      name: normalizeText(input.name),
      phone: normalizePhone(input.phone),
      email: normalizeOptionalText(input.email),
      city: normalizeText(input.parentsCity),
    },
    intake: {
      nri_country: normalizeOptionalText(input.nriCountry),
      parents_city: normalizeText(input.parentsCity),
      parent_ages: [input.parentAge1, input.parentAge2],
      primary_ailments: ailments,
      current_medications: normalizeText(input.currentMedications),
      medical_condition_summary: normalizeText(input.medicalConditionSummary),
      source_page: normalizeOptionalText(input.sourcePage),
    },
  };
}
