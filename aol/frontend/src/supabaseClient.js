import { createClient } from '@supabase/supabase-js';
const supabaseUrl = ' https://navoehjncosikelbwjhe.supabase.co'; // Replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hdm9laGpuY29zaWtlbGJ3amhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NjYzMDgsImV4cCI6MjA1NDI0MjMwOH0.9ldgGefoBhfsVGsqZMr-5jbd2q8hdXhxOtLSzUeoCjU'; // Replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
 






















