import { AuthProvider } from "@/context/AuthContext";
import GlobalProvider from "@/lib/global-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "./global.css";
// import GlobalProvider from "@/lib/global-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();
const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="index"
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="register"
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="login"
            />

            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="forgot-password"
            />
            <Stack.Screen
              options={{
                animation: "slide_from_right",
              }}
              name="reset-password"
            />
            <Stack.Screen name="(root)" />
          </Stack>
          <Toast />
        </GlobalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default Layout;
