create type user_status as enum (
  'LEAD',
  'CUSTOMER',
  'COHORT_MEMBER',
  'VIP_CLIENT',
  'CHURNED'
);

create type lead_pipeline_status as enum (
  'SUBMITTED',
  'UNDER_REVIEW',
  'QUALIFIED',
  'DISQUALIFIED',
  'WHATSAPP_UNLOCKED',
  'CONSULT_BOOKED',
  'CLOSED_WON',
  'CLOSED_LOST'
);
