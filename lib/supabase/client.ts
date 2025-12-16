import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  'https://microverse-mvp.supabase.co',
  'sb_publishable_Kp00nHjrbs0sZbk2141GDw__yCyr541',
  { realtime: { params: { eventsPerSecond: 20 } } }
);
