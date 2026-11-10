-- First-stage, consent-based premium enquiry capture.
-- This is intentionally NOT a medical intake. No diagnoses, lab results or medications.
-- Apply this migration to the correct Supabase project before releasing the form.
create table if not exists public.premium_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name varchar(120) not null,
  phone varchar(25) not null,
  email varchar(254),
  city varchar(100) not null,
  service_interest text not null check (service_interest in ('individual', 'family', 'unsure')),
  budget_interest text not null check (budget_interest in ('1l', '5l', '10l', 'unsure')),
  preferred_contact text not null check (preferred_contact in ('whatsapp', 'phone', 'email')),
  referral_source varchar(150),
  source_page varchar(255) not null default '/private-nutrition',
  utm_params jsonb not null default '{}'::jsonb,
  consent_accepted boolean not null check (consent_accepted = true),
  consent_version varchar(20) not null,
  consent_text_snapshot text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'not_fit', 'converted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists premium_enquiries_created_at_idx on public.premium_enquiries (created_at desc);
create index if not exists premium_enquiries_status_idx on public.premium_enquiries (status, created_at desc);
create index if not exists premium_enquiries_phone_idx on public.premium_enquiries (phone);
alter table public.premium_enquiries enable row level security;
-- No public policies. Server-side service-role access only.
-- NEVER expose the service-role key or these records to client-side code.
