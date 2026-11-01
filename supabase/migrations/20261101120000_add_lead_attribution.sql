-- Where each lead came from, captured by the website form for ad reporting.
alter table public.leads
  add column if not exists utm_source text check (char_length(utm_source) <= 300),
  add column if not exists utm_medium text check (char_length(utm_medium) <= 300),
  add column if not exists utm_campaign text check (char_length(utm_campaign) <= 300),
  add column if not exists utm_content text check (char_length(utm_content) <= 300),
  add column if not exists utm_term text check (char_length(utm_term) <= 300),
  add column if not exists fbclid text check (char_length(fbclid) <= 500),
  add column if not exists gclid text check (char_length(gclid) <= 500),
  add column if not exists landing_page text check (char_length(landing_page) <= 500),
  add column if not exists referrer text check (char_length(referrer) <= 500),
  add column if not exists meta_event_id text check (char_length(meta_event_id) <= 100);
