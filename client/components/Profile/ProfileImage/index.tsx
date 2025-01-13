import { User } from "@/lib/global-provider";
import { capitalizeWords } from "@/util/string";
import React from "react";
import { Image, Text, View } from "react-native";

const ProfileImage = ({ user }: { user: User }) => {
  return (
    <View className="flex-row justify-center flex mt-5">
      <View className="flex flex-col items-center relative mt-5">
        <Image
          source={{ uri: user?.avatar }}
          className="size-44 relative rounded-full"
        />
        <Text className="text-2xl font-rubik-bold mt-2 ">
          {capitalizeWords(String(user?.name))}
        </Text>
      </View>
    </View>
  );
};

export default ProfileImage;
