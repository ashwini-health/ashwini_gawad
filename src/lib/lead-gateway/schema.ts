import { z } from "zod";

const MIN_TEXT = 2;

export const leadGatewaySchema = z.object({
  name: z.string().trim().min(MIN_TEXT),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().optional().or(z.literal("")),
  nriCountry: z.string().trim().max(100).optional().or(z.literal("")),
  parentsCity: z.string().trim().min(MIN_TEXT).max(100),
  parentAge1: z.coerce.number().int().min(1).max(120),
  parentAge2: z.coerce.number().int().min(1).max(120),
  primaryAilments: z.string().trim().min(MIN_TEXT),
  currentMedications: z.string().trim().min(MIN_TEXT),
  medicalConditionSummary: z.string().trim().min(MIN_TEXT),
  sourcePage: z.string().trim().max(255).optional().or(z.literal("")),
  consentAccepted: z.literal(true),
});

export type LeadGatewayInput = z.infer<typeof leadGatewaySchema>;
