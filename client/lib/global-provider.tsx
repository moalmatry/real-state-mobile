import React, { createContext, useContext } from "react";
import { useAppwrite } from "./useApowrite";
import { getCurrentUser } from "./appwrite";

type User =
  | {
      $id: string;
      name: string;
      email: string;
      avatar: string;
    }
  | null
  | undefined;

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });
  const isLoggedIn = !!user;
  console.log(JSON.stringify(user, null, 2));
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        //  @ts-ignore
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
