import { z } from "zod";

export const PREMIUM_CONSENT_VERSION = "2026-11-v1";
export const PREMIUM_CONSENT_TEXT =
  "I agree to be contacted about this private nutrition advisory enquiry. I understand this is not a medical assessment, and I will not submit health records through this form. I have read the privacy notice.";

const optionalEmail = z.union([z.literal(""), z.email().max(254)]);

export const premiumEnquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^[+0-9()\s.-]{8,25}$/, "Enter a valid contact number"),
  email: optionalEmail,
  city: z.string().trim().min(2).max(100),
  serviceInterest: z.enum(["individual", "family", "unsure"]),
  budgetInterest: z.enum(["1l", "5l", "10l", "unsure"]),
  preferredContact: z.enum(["whatsapp", "phone", "email"]),
  referralSource: z.string().trim().max(150),
  utmSource: z.string().trim().max(150),
  utmMedium: z.string().trim().max(150),
  utmCampaign: z.string().trim().max(150),
  consentAccepted: z.literal(true),
  website: z.string().max(200).default(""), // Invisible honeypot field.
}).superRefine((value, ctx) => {
  if (value.preferredContact === "email" && !value.email) {
    ctx.addIssue({ code: "custom", path: ["email"], message: "Email is required for email contact" });
  }
});

export type PremiumEnquiryInput = z.infer<typeof premiumEnquirySchema>;
