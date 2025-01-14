import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Input from "../Input";
import { Link } from "expo-router";
import PrimaryButton from "../PrimaryButton";

const RegisterForm = () => {
  return (
    <SafeAreaView className="py-9 px-8 gap-8 bg-white flex-1">
      <Text className="text-5xl font-rubik-semibold w-60">
        Create An Account
      </Text>
      <View className="flex gap-8">
        <Input iconName="user-large" iconSize={20} placeholder="Email" />

        <Input
          iconName="lock"
          iconSize={20}
          placeholder="Password"
          secureTextEntry
        />

        <View className="gap-2">
          <Input
            iconName="lock"
            iconSize={20}
            placeholder="Confirm Password"
            secureTextEntry
          />

          <Text className="font-rubik w-80">
            By clicking the <Text className="text-primary-300">Register</Text>{" "}
            button, you agree to the public offer
          </Text>
        </View>
      </View>
      <PrimaryButton title="Login" />
      <Text className="text-center font-rubik">OR</Text>
      <Text className="text-center text-xl font-rubik">
        Already Have An Account{" "}
        <Link
          className="underline text-primary-300 font-rubik-semibold"
          href="/login"
        >
          Login
        </Link>
      </Text>
    </SafeAreaView>
  );
};

export default RegisterForm;
