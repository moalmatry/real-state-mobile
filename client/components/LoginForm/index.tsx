import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Input from "../Input";
import PrimaryButton from "../PrimaryButton";

const LoginForm = () => {
  return (
    <SafeAreaView className="py-9 px-8 gap-8 bg-white flex-1">
      <Text className="text-5xl font-rubik-semibold w-56">Welcome Back</Text>
      <View className="flex gap-8 ">
        <Input iconName="user-large" iconSize={20} placeholder="Email" />

        <View className="gap-2">
          <Input
            iconName="lock"
            iconSize={20}
            placeholder="Password"
            secureTextEntry
          />

          <Link className="text-right font-rubik text-primary-300" href="/">
            Forgot Password ?
          </Link>
        </View>
      </View>
      <PrimaryButton title="Login" />
      <Text className="text-center font-rubik">OR</Text>
      <Text className="text-center text-xl font-rubik">
        Create An Account{" "}
        <Link
          className="underline text-primary-300 font-rubik-semibold"
          href="/register"
        >
          Register
        </Link>
      </Text>
    </SafeAreaView>
  );
};

export default LoginForm;
