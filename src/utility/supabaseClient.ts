import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_KEY;
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbGx6ZmRhZWViZGRjcnhlYWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MTIxMDMsImV4cCI6MjAyNjA4ODEwM30.EDwySytjfNLwfs_qWxp805lL-WuiX5KQrL8cTBfNZOE";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
