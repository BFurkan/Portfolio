import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yefrbkudmdakbykrpsfz.supabase.co';
// Use the provided anon key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZnJia3VkbWRha2J5a3Jwc2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTI1NTQsImV4cCI6MjA2MTc4ODU1NH0.1wPm0fVDdCmyECSmli1eJ1kHclCH3lR0OlS8w9VekXA';

// It's better practice to use environment variables here too,
// e.g., process.env.REACT_APP_SUPABASE_URL and process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check environment variables or supabaseClient.js");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 