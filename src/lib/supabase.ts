import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// On vérifie que les variables existent pour éviter des erreurs silencieuses
if (!supabaseUrl || supabaseUrl.includes('REMPLACE_CECI')) {
  console.warn('⚠️ L\'URL Supabase est manquante ou invalide. Assure-toi de la remplir dans le fichier .env.local');
}

export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co', 
  supabaseAnonKey || 'public-anon-key'
);
