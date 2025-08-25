"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkToken } from "@/services/authService";
import { useGlobalStore } from "@/store/useGlobalStore";

// useAuthUser.ts
export function useAuthUser(requiredRoles?: string[], requireAuth: boolean = false) {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const data = await checkToken();

        if (data?.user) {
          setUser(data.user);

          if (requiredRoles && !requiredRoles.includes(data.user.role)) {
            router.replace("/403");
          }
        } else if (requireAuth) {
          router.replace("/login");
        }
      } catch (err) {
        console.error("Token invalid:", err);
        if (requireAuth) router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    if (!user) {
      verify();
    } else {
      if (requiredRoles && !requiredRoles.includes(user.role)) {
        router.replace("/403");
      }
      setLoading(false);
    }
  }, [user, setUser, requiredRoles, requireAuth, router]);

  return { user, loading };
}

