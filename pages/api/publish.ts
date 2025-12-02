import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = req.body;
    const slug = nanoid(8);
    const { error } = await supabase.from('games').insert({ slug, data: body });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ url: /p/ });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? 'unknown error' });
  }
}
