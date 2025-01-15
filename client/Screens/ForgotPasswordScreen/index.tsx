import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/validation/forgotPasswordSchema";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { forgotPassword } from "@/services/auth/forgotPassword";
import Toast from "react-native-toast-message";

const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    const response = await forgotPassword(data.email);

    if (response.status === "fail")
      return Toast.show({
        type: "error",
        // text1: response.message,
        text1: "Something went wrong try again later",
      });

    Toast.show({
      type: "info",
      text1: "Check your email",
      text2: response.message,
    });

    router.replace("/reset-password");
  };
  return (
    <SafeAreaView className="py-9 px-8 gap-8 bg-white flex-1">
      <Text className="text-5xl font-rubik-semibold w-[17rem]">
        Forgot Password?
      </Text>
      <View className="flex gap-8 ">
        <Input
          control={control}
          name="email"
          iconName="user-large"
          iconSize={20}
          placeholder="Email"
          error={errors.email?.message}
        />

        <View className="gap-2">
          <Text className="text-gray-500 font-rubik">
            <Text className="text-primary-300">*</Text> We will send you a
            message to set or reset your new password
          </Text>
        </View>
      </View>
      <PrimaryButton onPress={handleSubmit(onSubmit)} title="Submit" />
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

export default ForgotPasswordScreen;
