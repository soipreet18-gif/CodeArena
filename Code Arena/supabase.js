import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL =
  "https://uwssnlrkiqssicwkpjlk.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_2jD5fx6-ME_qwcJA9_7Eog_fNMuYaq-";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

