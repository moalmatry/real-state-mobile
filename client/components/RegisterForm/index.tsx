import { RegisterInput, registerSchema } from "@/validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";
import Input from "../Input";
import PrimaryButton from "../PrimaryButton";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerHandler = (values: RegisterInput) => {
    console.log(values);
  };
  return (
    <SafeAreaView className="py-9 px-8 gap-8 bg-white flex-1">
      <Text className="text-5xl font-rubik-semibold w-60">
        Create An Account
      </Text>
      <View className="flex gap-8">
        <Input
          name="email"
          control={control}
          iconName="user-large"
          iconSize={20}
          placeholder="Email"
          error={errors.email?.message}
        />
        <Input
          name="password"
          control={control}
          iconName="lock"
          iconSize={20}
          placeholder="Password"
          secureTextEntry
          error={
            errors.password?.message || errors.passwordConfirmation?.message
          }
        />

        <View className="gap-2">
          <Input
            name="passwordConfirmation"
            control={control}
            iconName="lock"
            iconSize={20}
            placeholder="Confirm Password"
            secureTextEntry
            error={
              errors.passwordConfirmation?.message ||
              errors.passwordConfirmation?.message
            }
          />

          <Text className="font-rubik w-80 text-gray-500">
            By clicking the <Text className="text-primary-300">Register</Text>{" "}
            button, you agree to the public offer
          </Text>
        </View>
      </View>
      <PrimaryButton
        onPress={handleSubmit(registerHandler)}
        title="Create Account"
      />
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
