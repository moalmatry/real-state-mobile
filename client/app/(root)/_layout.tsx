import { useAuth } from "@/context/AuthContext";
import { useGlobalContext } from "@/lib/global-provider";
import { router, Slot } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

const AppLayout = () => {
  const { onLogin, onRegister, authState } = useAuth();
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300 " />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return router.replace("/login");

  return <Slot />;
};
export default AppLayout;
