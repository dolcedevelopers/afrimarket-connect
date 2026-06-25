import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  rolesLoading: boolean;
  roles: string[];
}

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setRoles([]);
      setRolesLoading(false);
      return;
    }
    setRolesLoading(true);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .then(({ data }) => setRoles(data?.map((r) => r.role) ?? []))
      .finally(() => setRolesLoading(false));
  }, [session?.user?.id]);

  return { user: session?.user ?? null, session, loading, rolesLoading, roles };
}

export function defaultRouteForRoles(roles: string[]): "/vendor" | "/products" {
  return isVendor(roles) ? "/vendor" : "/products";
}

export function isVendor(roles: string[]): boolean {
  return roles.includes("vendor") || roles.includes("admin");
}

export function isAdmin(roles: string[]): boolean {
  return roles.includes("admin");
}
