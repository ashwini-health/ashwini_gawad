import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Notice | Ashwini Gawad", robots: { index: false, follow: false } };

export default function PrivacyNoticePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-slate-200">
      <h1 className="font-display text-4xl text-white">Privacy notice for initial enquiries</h1>
      <p className="mt-6 text-sm text-slate-400">Draft for owner/legal review before public launch. Version 2026-11-v1.</p>
      <p className="mt-6 leading-relaxed">
        For private-advisory enquiries, Ashwini Gawad collects your name, phone, optional email, city,
        programme interest, preferred contact method and information about how you found us. When present,
        campaign attribution parameters may also be collected. This information is used to respond to your
        enquiry, assess possible service fit and organise the next conversation.
      </p>
      <p className="mt-4 leading-relaxed">
        The enquiry form does not request diagnoses, medications, lab reports or other medical history.
        Any later assessment requiring health information must use a separate appropriate private intake,
        notice and consent process.
      </p>
      <p className="mt-4 leading-relaxed">
        Enquiry records are stored in a restricted business database and accessed by authorised operators.
        We do not use the enquiry form as consent for promotional broadcasts, and we do not sell enquiry data.
        Please do not share confidential medical records through the public form.
      </p>
      <p className="mt-4 leading-relaxed">
        For a copy of your enquiry details, correction, withdrawal or deletion request subject to applicable
        requirements, or a privacy complaint, contact <a className="text-gold-300 underline" href="mailto:ashwini.gawad@gmail.com">ashwini.gawad@gmail.com</a>.
        Include the contact number used in your enquiry so we can locate your record.
      </p>
      <p className="mt-4 leading-relaxed">
        A final public notice must specify the verified legal seller/controller identity, processing vendors,
        appropriate retention period, any cross-border processing and full rights/complaint procedures.
        This draft must be reviewed and completed before publication.
      </p>
    </main>
  );
}
