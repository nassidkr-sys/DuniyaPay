"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin/connexion");
        return;
      }

      // Check if user has ADMIN role
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error || profileData?.role !== 'ADMIN') {
        await supabase.auth.signOut();
        router.push("/admin/connexion");
      } else {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0F1117' }}>
        <div style={{ color: '#6C5CE7', fontWeight: 600 }}>Authentification Admin...</div>
      </div>
    );
  }

  return <>{children}</>;
}
