'use client';

import { apiGet } from "@/services/api";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ResponseData } from "../api/auth/complete-profile/route";
import useApiQuery from "@/hooks/useApiQuery";
import { redirect } from "next/navigation";

export type User = UserProfile & {
  permissions: string[];
  roles: string[]
};

interface UserContextProps {
  user: User;
  accessToken: string;
  isLoading: boolean
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  accessToken: "",
  isLoading: true
})

export const CustomUserProvider = ({ children } : {children: ReactNode}) => {
  const [user, setUser] = useState<User>({} as User);
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    data: userData,
    is_loading: user_is_loading,
    is_error: user_is_error
  } =  useApiQuery(process.env.DEPLOY_URL+"/api/auth/complete-profile", apiGet<ResponseData>)

  useEffect(() => {
    if (user_is_error) {
      return redirect("/api/auth/login?returnTo=" + (window.location.href ?? "/"));
    }
    if (!user_is_loading) {
      if (!userData) {
        return redirect("/api/auth/login?returnTo=" + (window.location.href ?? "/"));
      }
      setUser(userData.user);
      setAccessToken(userData.access_token);
      setIsLoading(false);
    }
  }, [userData, user_is_loading, user_is_error])
  
  return (
      <UserContext.Provider value={{ user, accessToken, isLoading }}>
        {children}
      </UserContext.Provider>
  )
};

export const useCustomUserContext = () => useContext(UserContext);