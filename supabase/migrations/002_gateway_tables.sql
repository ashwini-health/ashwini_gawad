create extension if not exists pgcrypto;

create table users (
  id uuid primary key default gen_random_uuid(),
  phone varchar(15) not null,
  email varchar(255),
  name varchar(255) not null,
  city varchar(100),
  status user_status not null default 'LEAD',
  source_page varchar(255),
  utm_params jsonb not null default '{}'::jsonb,
  first_purchase_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lead_intakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  pipeline_status lead_pipeline_status not null default 'SUBMITTED',
  intake_version varchar(20) not null default 'v1',
  nri_country varchar(100),
  parents_city varchar(100) not null,
  parent_ages jsonb not null,
  primary_ailments jsonb not null,
  current_medications text not null,
  medical_condition_summary text not null,
  source_page varchar(255),
  utm_params jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lead_consents (
  id uuid primary key default gen_random_uuid(),
  intake_id uuid not null references lead_intakes(id) on delete cascade,
  consent_type varchar(50) not null default 'MEDICAL_DISCLAIMER',
  consent_version varchar(20) not null default 'v1',
  consent_text_snapshot text not null,
  accepted boolean not null,
  accepted_at timestamptz not null default now(),
  ip_hash varchar(128) not null,
  user_agent text,
  created_at timestamptz not null default now()
);

create table lead_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  intake_id uuid references lead_intakes(id) on delete cascade,
  event_name varchar(50) not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
