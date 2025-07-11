import { StoredUser, UserData } from "@/types/user";
import Cookies from "js-cookie";

export function useAuthCookie() {
  const saveUserToCookies = (data: UserData): void => {
    Cookies.set("token", data.token, { expires: 1 });
    Cookies.set("userId", data.user.userId);
    Cookies.set("username", data.user.username);
    Cookies.set("email", data.user.email);
  };

  const clearUserFromCookies = (): void => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("username");
    Cookies.remove("email");
  };

  const getUserFromCookies = (): StoredUser => {
    return {
      token: Cookies.get("token") || null,
      userId: Cookies.get("userId") || null,
      username: Cookies.get("username") || null,
      email: Cookies.get("email") || null,
    };
  };

  return {
    saveUserToCookies,
    clearUserFromCookies,
    getUserFromCookies,
  };
}
