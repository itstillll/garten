import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvcesutcsppdmusalkgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y2VzdXRjc3BwZG11c2Fsa2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzU0MjYsImV4cCI6MjA3NDMxMTQyNn0.1_1rEK_w5XypMLi4Ge0bQZTF6almuwBI1Kh3f4eFjKU'; // Anon key aus Supabase Projekt
export const supabase = createClient(supabaseUrl, supabaseKey);
