"use client";
import { useEffect, useState } from "react";
import { checkToken } from "@/services/authService";
import { IUser } from "@/types/user";

export function useAuthUser() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    checkToken().then((data) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  return { user };
}

