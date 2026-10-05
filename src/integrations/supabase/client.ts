import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sqpevkuahatlcjhcseqv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcGV2a3VhaGF0bGNqaGNzZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNDQyNTYsImV4cCI6MjA4MDgyMDI1Nn0.QXZR-IbpjL_RqCwTYG8IJupML6zGtB6XKFbAovkR3x0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
