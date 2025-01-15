import PrimaryButton from "@/components/PrimaryButton";
import { TOKEN_KEY } from "@/constants/data";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const WelcomeScreen = () => {
  const { refetch, isLoggedIn, loading } = useGlobalContext();

  const handleLogin = async () => {
    // Implement Google OAuth login logic here
    const result = await login();
    if (result) {
      refetch();
      // console.log(result);
      router.push("/(root)/(tabs)");
    } else {
      Alert.alert("Error failed to login");
      router.push("/(root)/(tabs)");
    }
  };

  if (SecureStore.getItem(TOKEN_KEY)) return <Redirect href="/(root)/(tabs)" />;
  else
    return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerClassName="h-full">
          <Image
            source={images.onboarding}
            className="w-full h-4/6"
            resizeMode="contain"
          />

          <View className="px-10">
            <Text className="text-base text-center uppercase font-rubik text-black-200">
              Welcome to Maadi Restate
            </Text>
            <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
              Let&apos;t Get you closer {"\n"}
              <Text className="text-primary-300">Your Ideal Home</Text>
            </Text>
            <Text className="text-lg font-rubik text-black-200 text-center mt-12 mb-2">
              Best Properties In Maadi
            </Text>
            {/* <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            onPress={handleLogin}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue With Google
              </Text>
            </View>
          </TouchableOpacity> */}
            <PrimaryButton
              title="Get Started"
              // onPress={handleLogin}
              onPress={() => router.push("/login")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default WelcomeScreen;
// check github
