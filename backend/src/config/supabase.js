const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured =
  supabaseUrl &&
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseUrl.startsWith('http');

if (!isConfigured) {
  console.warn(
    '\n⚠️  WARNING: Supabase is not configured.\n' +
    '   Add your SUPABASE_URL and SUPABASE_ANON_KEY to backend/.env\n' +
    '   All API calls will fail until credentials are set.\n'
  );
}

// Use a safe placeholder URL so the process doesn't crash on startup
const safeUrl = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const safeKey = isConfigured ? supabaseAnonKey : 'placeholder_key';
const safeServiceKey = isConfigured ? (supabaseServiceKey || supabaseAnonKey) : 'placeholder_key';

// Public client – respects RLS (used for most operations with user JWT)
const supabase = createClient(safeUrl, safeKey);

// Admin client – bypasses RLS (used only for admin routes and auth operations)
const supabaseAdmin = createClient(safeUrl, safeServiceKey, {
  auth: { persistSession: false },
});

module.exports = { supabase, supabaseAdmin };
