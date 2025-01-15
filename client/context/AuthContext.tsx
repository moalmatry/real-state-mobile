import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { login } from "@/services/auth/login";
import { RegisterProps, UserResponse } from "@/types";
import { register } from "@/services/auth/register";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>;
  onRegister: (props: RegisterProps) => Promise<UserResponse>;
  onLogin: (
    email: string,
    password: string,
    setState: React.Dispatch<React.SetStateAction<AuthStateType>>
  ) => Promise<UserResponse>;
  onLogout?: () => Promise<any>;
}
const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext<AuthProps | undefined>(undefined);
export type AuthStateType = {
  token: string | null;
  authenticated: boolean | null;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthStateType>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItem(TOKEN_KEY);

      console.log("stored", token);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  //   Register Part

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    setAuthState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`Use Auth Auth context used outside the provider`);
  }

  return context;
};
