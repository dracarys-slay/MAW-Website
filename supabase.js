// SUPABASE_URL and SUPABASE_KEY are loaded from config.js (not committed to Git)
const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)