import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://behxrckorrgbxmhjvxtb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_85rBSrDBLsx0KmXEvOBWIw_uACQ-8ly";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
