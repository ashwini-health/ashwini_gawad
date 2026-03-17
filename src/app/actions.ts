"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import {
  LEAD_EVENT_NAMES,
  LEAD_GATEWAY_INTAKE_VERSION,
  MEDICAL_DISCLAIMER,
  type LeadGatewayActionState,
} from "@/lib/lead-gateway/constants";
import { mapLeadGatewayInput } from "@/lib/lead-gateway/mappers";
import { leadGatewaySchema } from "@/lib/lead-gateway/schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function submitLeadGateway(
  _previousState: LeadGatewayActionState,
  formData: FormData,
): Promise<LeadGatewayActionState> {
  const parseResult = leadGatewaySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    nriCountry: formData.get("nriCountry"),
    parentsCity: formData.get("parentsCity"),
    parentAge1: formData.get("parentAge1"),
    parentAge2: formData.get("parentAge2"),
    primaryAilments: formData.get("primaryAilments"),
    currentMedications: formData.get("currentMedications"),
    medicalConditionSummary: formData.get("medicalConditionSummary"),
    sourcePage: formData.get("sourcePage") ?? "/book-consultation",
    consentAccepted: formData.get("consentAccepted") === "on",
  });

  if (!parseResult.success) {
    return { ok: false, error: "Please complete all required fields." };
  }

  const supabase = createSupabaseAdminClient();
  const mapped = mapLeadGatewayInput(parseResult.data);

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("phone", mapped.user.phone)
    .maybeSingle();

  let userId = existingUser?.id;

  if (!userId) {
    const { data: insertedUser, error: userInsertError } = await supabase
      .from("users")
      .insert({
        ...mapped.user,
        source_page: mapped.intake.source_page,
        utm_params: {},
      })
      .select("id")
      .single();

    if (userInsertError || !insertedUser) {
      return { ok: false, error: "Failed to create user record." };
    }

    userId = insertedUser.id;
  }

  const { data: intake, error: intakeError } = await supabase
    .from("lead_intakes")
    .insert({
      user_id: userId,
      intake_version: LEAD_GATEWAY_INTAKE_VERSION,
      ...mapped.intake,
      utm_params: {},
    })
    .select("id")
    .single();

  if (intakeError || !intake) {
    return { ok: false, error: "Failed to create intake record." };
  }

  const requestHeaders = await headers();
  const ipAddress = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = createHash("sha256").update(ipAddress).digest("hex");
  const userAgent = requestHeaders.get("user-agent");

  const { error: consentError } = await supabase.from("lead_consents").insert({
    intake_id: intake.id,
    consent_type: MEDICAL_DISCLAIMER.consentType,
    consent_version: MEDICAL_DISCLAIMER.consentVersion,
    consent_text_snapshot: MEDICAL_DISCLAIMER.consentTextSnapshot,
    accepted: true,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (consentError) {
    return { ok: false, error: "Failed to capture consent." };
  }

  const { error: eventsError } = await supabase.from("lead_events").insert([
    {
      user_id: userId,
      intake_id: intake.id,
      event_name: LEAD_EVENT_NAMES.LEAD_SUBMITTED,
      metadata: {},
    },
    {
      user_id: userId,
      intake_id: intake.id,
      event_name: LEAD_EVENT_NAMES.CONSENT_CAPTURED,
      metadata: {},
    },
  ]);

  if (eventsError) {
    return { ok: false, error: "Failed to write lead events." };
  }

  return { ok: true, intakeId: intake.id };
}
