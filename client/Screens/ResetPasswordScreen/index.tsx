import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/context/AuthContext";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "@/validation/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const ResetPasswordScreen = () => {
  const { onResetPassword, setAuthState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const onSubmit = async (data: ResetPasswordInput) => {
    const result = await onResetPassword({
      userData: data,
      setState: setAuthState,
    });

    if (result.status === "fail")
      return Toast.show({
        type: "error",
        text1: "Failed",
        text2: result.message,
      });

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Password reset successfully",
    });
    router.push("/(root)/(tabs)");
  };
  return (
    <SafeAreaView className="py-9 px-8 gap-8 bg-white flex-1">
      <Text className="text-5xl font-rubik-semibold w-[17rem]">
        Reset Password
      </Text>
      <View className="flex gap-8 ">
        <Input
          control={control}
          name="resetCode"
          iconName="unlock-keyhole"
          iconSize={20}
          placeholder="Enter The Code"
          keyboardType="number-pad"
          error={errors.resetCode?.message}
        />
        <Input
          control={control}
          name="password"
          secureTextEntry
          iconName="lock"
          iconSize={20}
          placeholder="Enter new password"
          error={errors.password?.message}
        />
        <Input
          control={control}
          name="confirmPassword"
          secureTextEntry
          iconName="lock"
          iconSize={20}
          placeholder="Confirm new Password"
          error={errors.confirmPassword?.message || errors.password?.message}
        />

        <View className="gap-2">
          <Text className="text-gray-500 font-rubik">
            <Text className="text-primary-300">*</Text> Code has been sent to
            your email and valid for only 10 min
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

export default ResetPasswordScreen;