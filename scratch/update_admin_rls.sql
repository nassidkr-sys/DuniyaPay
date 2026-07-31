-- 1. Ajouter la colonne 'role' à la table 'profiles' avec une valeur par défaut 'USER'
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'USER';

-- 2. Créer une fonction pour vérifier si l'utilisateur est admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'ADMIN';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Mettre à jour les politiques (Policies) RLS pour 'profiles'
DROP POLICY IF EXISTS "Les admins peuvent voir tous les profils" ON profiles;
CREATE POLICY "Les admins peuvent voir tous les profils" ON profiles
  FOR SELECT USING (public.is_admin());

-- 4. Mettre à jour les politiques (Policies) RLS pour 'wallets'
DROP POLICY IF EXISTS "Les admins peuvent voir tous les portefeuilles" ON wallets;
CREATE POLICY "Les admins peuvent voir tous les portefeuilles" ON wallets
  FOR SELECT USING (public.is_admin());

-- 5. Mettre à jour les politiques (Policies) RLS pour 'transactions'
DROP POLICY IF EXISTS "Les admins peuvent voir toutes les transactions" ON transactions;
CREATE POLICY "Les admins peuvent voir toutes les transactions" ON transactions
  FOR SELECT USING (public.is_admin());
