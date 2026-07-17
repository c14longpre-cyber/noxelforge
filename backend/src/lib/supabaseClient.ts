import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

export function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
    realtime: {
      transport: ws as any,
    },
  });
}