import { RegisterInput, registerSchema } from "@/validation/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Input from "../Input";
import PrimaryButton from "../PrimaryButton";
import { useAuth } from "@/context/AuthContext";

const RegisterForm = () => {
  const { onRegister, setAuthState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerHandler = async (values: RegisterInput) => {
    const newUser = await onRegister({
      userData: values,
      setState: setAuthState,
    });

    if (newUser.status === "success") router.push("/(root)/(tabs)");
  };
  return (
    <SafeAreaView className=" bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-9 px-8 gap-8">
          <Text className="text-5xl font-rubik-semibold w-60">
            Create An Account
          </Text>
          <View className="flex gap-8">
            <Input
              name="email"
              control={control}
              iconName="at"
              iconSize={20}
              placeholder="Email"
              error={errors.email?.message}
            />
            <Input
              name="name"
              control={control}
              iconName="user-large"
              iconSize={20}
              placeholder="Full Name"
              error={errors.email?.message}
            />
            <Input
              name="phone"
              control={control}
              iconName="phone"
              iconSize={20}
              placeholder="Phone Number"
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
                errors.password?.message || errors.confirmPassword?.message
              }
            />

            <View className="gap-2">
              <Input
                name="confirmPassword"
                control={control}
                iconName="lock"
                iconSize={20}
                placeholder="Confirm Password"
                secureTextEntry
                error={
                  errors.confirmPassword?.message ||
                  errors.confirmPassword?.message
                }
              />

              <Text className="font-rubik w-80 text-gray-500">
                By clicking the{" "}
                <Text className="text-primary-300">Register</Text> button, you
                agree to the public offer
              </Text>
            </View>
          </View>
          <PrimaryButton
            onPress={handleSubmit(registerHandler)}
            title="Create Account"
          />
          <View>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterForm;
