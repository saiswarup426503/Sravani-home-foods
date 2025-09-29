import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://agozysbwkbnmsejwcomp.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnb3p5c2J3a2JubXNlandjb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNDUxMjAsImV4cCI6MjA3NDcyMTEyMH0.6WpcO5tC58CfCFmLR4ghv0UqYgIbQ2yTINaGLo4reKU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
