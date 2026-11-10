"use server";

import { premiumEnquirySchema, PREMIUM_CONSENT_TEXT, PREMIUM_CONSENT_VERSION } from "@/lib/premium-enquiry/schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type PremiumEnquiryState = { ok: boolean; error?: string };
export const initialPremiumEnquiryState: PremiumEnquiryState = { ok: false };

export async function submitPremiumEnquiry(
  _previousState: PremiumEnquiryState,
  formData: FormData,
): Promise<PremiumEnquiryState> {
  const parsed = premiumEnquirySchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    city: formData.get("city"),
    serviceInterest: formData.get("serviceInterest"),
    budgetInterest: formData.get("budgetInterest"),
    preferredContact: formData.get("preferredContact"),
    referralSource: formData.get("referralSource") ?? "",
    utmSource: formData.get("utmSource") ?? "",
    utmMedium: formData.get("utmMedium") ?? "",
    utmCampaign: formData.get("utmCampaign") ?? "",
    consentAccepted: formData.get("consentAccepted") === "on",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { ok: false, error: "Please check the required fields, consent, and preferred contact method." };
  }
  const input = parsed.data;
  // Quietly acknowledge automated spam without storing it.
  if (input.website) return { ok: true };

  try {
    const db = createSupabaseAdminClient();
    // Prevent rapid accidental repeat submissions without revealing whether a person is in our CRM.
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recent, error: lookupError } = await db
      .from("premium_enquiries")
      .select("id")
      .eq("phone", input.phone)
      .gte("created_at", oneHourAgo)
      .limit(1)
      .maybeSingle();
    if (lookupError) throw lookupError;
    if (recent) return { ok: true };

    const { error } = await db.from("premium_enquiries").insert({
      full_name: input.fullName,
      phone: input.phone,
      email: input.email || null,
      city: input.city,
      service_interest: input.serviceInterest,
      budget_interest: input.budgetInterest,
      preferred_contact: input.preferredContact,
      referral_source: input.referralSource || null,
      source_page: "/private-nutrition",
      utm_params: {
        source: input.utmSource,
        medium: input.utmMedium,
        campaign: input.utmCampaign,
      },
      consent_accepted: true,
      consent_version: PREMIUM_CONSENT_VERSION,
      consent_text_snapshot: PREMIUM_CONSENT_TEXT,
    });
    if (error) throw error;
    return { ok: true };
  } catch (error) {
    // Do not include PII or database diagnostics in client responses or logs.
    console.error("Premium enquiry submission failed", error instanceof Error ? error.name : "unknown");
    return { ok: false, error: "We could not record your enquiry. Please contact us using the WhatsApp link below." };
  }
}
