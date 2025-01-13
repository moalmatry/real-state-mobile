import { capitalizeWords } from "@/util/string";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
type User =
  | {
      $id: string;
      name: string;
      email: string;
      avatar: string;
    }
  | null
  | undefined;

const UserInfo = ({ user }: { user: User }) => {
  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        className="flex flex-row items-center"
      >
        <Image
          source={{ uri: user?.avatar }}
          className="size-12 rounded-full"
        />
        <View className="flex flex-col items-start ml-2 justify-center">
          <Text className="text-xs font-rubik text-black-100">Hey 🙋‍♂️</Text>
          <Text className="text-base font-rubik-medium text-black-300">
            {capitalizeWords(String(user?.name))}
          </Text>
        </View>
      </TouchableOpacity>

      {/* TODO: Coming Soon */}
      {/* <Image source={icons.bell} className="size-6" /> */}
    </View>
  );
};

export default UserInfo;
