export type LeadGatewayActionState = {
  ok: boolean;
  intakeId?: string;
  error?: string;
};

export const initialLeadGatewayActionState: LeadGatewayActionState = {
  ok: false,
};

export const LEAD_GATEWAY_INTAKE_VERSION = "v1";

export const MEDICAL_DISCLAIMER = {
  consentType: "MEDICAL_DISCLAIMER",
  consentVersion: "v1",
  consentTextSnapshot:
    "I confirm I am submitting accurate health information for my parents. I understand this intake does not replace emergency medical care or a doctor diagnosis. I consent to being contacted for consultation coordination.",
} as const;

export const LEAD_EVENT_NAMES = {
  LEAD_SUBMITTED: "LEAD_SUBMITTED",
  CONSENT_CAPTURED: "CONSENT_CAPTURED",
} as const;
