import Cookies from "js-cookie";
import { StoredUser, UserData } from "@/types/user";

export function useAuthCookie() {
  const saveUserToCookies = (data: UserData): void => {
    Cookies.set("token3", data.token, { expires: 1 });
  };

  const clearUserFromCookies = (): void => {
    Cookies.remove("token");
  };

  const getUserFromCookies = (): StoredUser => {
      console.log( "token", Cookies.get("token"));
    return {
      token: Cookies.get("token") || null,
    };
  
    
  };

  return {
    saveUserToCookies,
    clearUserFromCookies,
    getUserFromCookies,
  };
}
