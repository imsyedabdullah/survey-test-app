import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cvjfpenlalyiokayvsxu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2amZwZW5sYWx5aW9rYXl2c3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTk5MDEsImV4cCI6MjA3NTMzNTkwMX0.nBnM9-uWC8uJZrkHT_6HEFaYMv7utrPZKA2QTjuxwz0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
