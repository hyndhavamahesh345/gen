import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type CommunityMember = {
  full_name: string;
  email: string;
  city: string;
  state: string;
  role: string;
  interests: string;
  consent: boolean;
};

export async function submitCommunityMember(member: CommunityMember) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }

  const { error } = await supabase.from('community_members').insert(member);
  if (error) throw error;
}
