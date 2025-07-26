"use client";
import { useEffect } from "react";
import { checkToken } from "@/services/authService";
import { useGlobalStore } from "@/store/useGlobalStore";

export function useAuthUser() {
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);

  useEffect(() => {
    if (!user) {
      checkToken().then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      });
    }
  }, [user, setUser]);

  return { user };
}
