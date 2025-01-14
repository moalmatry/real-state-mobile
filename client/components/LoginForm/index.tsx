import { LoginInput, loginSchema } from "@/validation/loginScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";
import Input from "../Input";
import PrimaryButton from "../PrimaryButton";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginInput) => {
    console.log(values);
  };

  return (
    <SafeAreaView className="py-9 px-8 gap-8 bg-white flex-1">
      <Text className="text-5xl font-rubik-semibold w-56">Welcome Back</Text>

      <View className="flex gap-8 ">
        <Input
          iconName="user-large"
          iconSize={20}
          placeholder="Email"
          name="email"
          control={control}
          error={errors.email?.message}
        />

        <View className="gap-2">
          <Input
            name="password"
            control={control}
            iconName="lock"
            iconSize={20}
            placeholder="Password"
            secureTextEntry
            error={errors.password?.message}
          />

          <Link
            className="text-right font-rubik text-primary-300"
            href="/forgot-password"
          >
            Forgot Password ?
          </Link>
        </View>
      </View>
      <PrimaryButton onPress={handleSubmit(onSubmit)} title="Login" />
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
