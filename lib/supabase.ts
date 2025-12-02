import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfnbypvduioubwwwrrkz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbmJ5cHZkdWlvdWJ3d3dycmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzYzNjIsImV4cCI6MjA3OTU1MjM2Mn0.2itYcBmiTFicFn54A_D7qm2rS9swLtDZUWuMQWvr3UY';

export const supabase = createClient(supabaseUrl, supabaseKey);
