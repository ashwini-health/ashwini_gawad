"use client";

import { useActionState, type FormEvent } from "react";
import { submitPremiumEnquiry } from "@/app/private-nutrition/actions";
import { PREMIUM_CONSENT_TEXT } from "@/lib/premium-enquiry/schema";

const inputClass =
  "mt-1 block w-full rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-white placeholder-slate-500 outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400";
const labelClass = "block text-sm font-medium text-slate-200";

const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hello%20Ashwini%2C%20I%20would%20like%20to%20enquire%20about%20private%20nutrition%20advisory%20in%20India.";

export function PremiumEnquiryForm() {
  const [state, action, pending] = useActionState(submitPremiumEnquiry, { ok: false });
  const fillAttribution = (event: FormEvent<HTMLFormElement>) => {
    const params = new URLSearchParams(window.location.search);
    const form = event.currentTarget;
    const entries = [
      ["utmSource", "utm_source"],
      ["utmMedium", "utm_medium"],
      ["utmCampaign", "utm_campaign"],
    ];
    for (const [fieldName, paramName] of entries) {
      const input = form.elements.namedItem(fieldName);
      if (input instanceof HTMLInputElement) {
        input.value = params.get(paramName)?.slice(0, 150) ?? "";
      }
    }
  };

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-teal-400/40 bg-teal-500/10 p-7">
        <h3 className="font-display text-2xl text-white">Enquiry received</h3>
        <p className="mt-3 text-slate-300">
          Your initial request has been recorded. If the service may be a fit, Ashwini&apos;s team will contact you
          using your chosen method. This form is not a clinical assessment, appointment confirmation, or payment request.
        </p>
        <p className="mt-3 text-slate-400">For a scheduling question, you can also contact us directly.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full bg-gold-400 px-5 py-3 font-semibold text-midnight-950">
          Message on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={fillAttribution} className="space-y-5 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-7" aria-label="Private nutrition advisory enquiry">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-300">Confidential initial enquiry</p>
        <h2 className="mt-2 font-display text-2xl text-white">Request programme details</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          No payment is collected here. Do not enter medical history, prescriptions, reports or diagnoses in this form.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClass}>Full name <span aria-hidden="true">*</span>
          <input name="fullName" required minLength={2} maxLength={120} autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass}>Phone or WhatsApp <span aria-hidden="true">*</span>
          <input name="phone" required type="tel" maxLength={25} autoComplete="tel" className={inputClass} />
        </label>
        <label className={labelClass}>Email
          <input name="email" type="email" maxLength={254} autoComplete="email" className={inputClass} />
        </label>
        <label className={labelClass}>City <span aria-hidden="true">*</span>
          <input name="city" required maxLength={100} autoComplete="address-level2" className={inputClass} />
        </label>
        <label className={labelClass}>Who would receive guidance?
          <select name="serviceInterest" defaultValue="unsure" className={inputClass}>
            <option className="bg-midnight-950" value="individual">One adult</option>
            <option className="bg-midnight-950" value="family">More than one family member</option>
            <option className="bg-midnight-950" value="unsure">Not sure yet</option>
          </select>
        </label>
        <label className={labelClass}>Potential programme budget
          <select name="budgetInterest" defaultValue="unsure" className={inputClass}>
            <option className="bg-midnight-950" value="unsure">Prefer to discuss scope</option>
            <option className="bg-midnight-950" value="1l">₹1 lakh</option>
            <option className="bg-midnight-950" value="5l">Around ₹5 lakh</option>
            <option className="bg-midnight-950" value="10l">₹10 lakh or more</option>
          </select>
        </label>
        <label className={labelClass}>Preferred reply method
          <select name="preferredContact" defaultValue="whatsapp" className={inputClass}>
            <option className="bg-midnight-950" value="whatsapp">WhatsApp</option>
            <option className="bg-midnight-950" value="phone">Telephone</option>
            <option className="bg-midnight-950" value="email">Email (email required)</option>
          </select>
        </label>
        <label className={labelClass}>How did you hear about us?
          <input name="referralSource" maxLength={150} placeholder="Referral, search, community..." className={inputClass} />
        </label>
      </div>
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <input type="hidden" name="utmSource" defaultValue="" />
      <input type="hidden" name="utmMedium" defaultValue="" />
      <input type="hidden" name="utmCampaign" defaultValue="" />
      <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
        <input name="consentAccepted" type="checkbox" required className="mt-1 h-4 w-4 accent-yellow-500" />
        <span>{PREMIUM_CONSENT_TEXT} <a href="/privacy" className="text-gold-300 underline underline-offset-2">Privacy notice</a>.</span>
      </label>
      {state.error && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200">{state.error} <a href={WHATSAPP_URL} className="underline">WhatsApp fallback</a></p>}
      <button type="submit" disabled={pending} className="w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 font-heading font-bold text-midnight-950 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Sending request…" : "Request a private consultation"}
      </button>
      <p className="text-xs text-slate-500">We will only use these contact details to respond to this enquiry. No medical advice is provided through this form.</p>
    </form>
  );
}
