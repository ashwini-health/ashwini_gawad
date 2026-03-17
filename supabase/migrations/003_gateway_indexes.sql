create unique index users_phone_unique_idx on users (phone);
create index users_status_idx on users (status);

create index lead_intakes_user_id_idx on lead_intakes (user_id);
create index lead_intakes_pipeline_status_submitted_at_idx on lead_intakes (pipeline_status, submitted_at desc);
create index lead_intakes_parents_city_idx on lead_intakes (parents_city);

create index lead_consents_intake_id_idx on lead_consents (intake_id);
create unique index lead_consents_intake_type_version_unique_idx on lead_consents (intake_id, consent_type, consent_version);

create index lead_events_intake_id_created_at_idx on lead_events (intake_id, created_at desc);
create index lead_events_event_name_created_at_idx on lead_events (event_name, created_at desc);
