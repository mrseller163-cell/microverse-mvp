import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = req.body;
    const draftId = nanoid(12);
    const { data, error } = await supabase.from('drafts').insert({ id: draftId, data: body }).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ draftId });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? 'unknown error' });
  }
}
