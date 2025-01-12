import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";

const Agent = ({ property }: { property: Models.Document | null }) => {
  return (
    <View className="w-full border-t border-primary-200 pt-7 mt-5">
      <Text className="text-black-300 text-xl font-rubik-bold">Agent</Text>

      <View className="flex flex-row items-center justify-between mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: property?.agent.avatar }}
            className="size-14 rounded-full"
          />

          <View className="flex flex-col items-start justify-center ml-3">
            <Text className="text-lg text-black-300 text-start font-rubik-bold">
              {property?.agent.name}
            </Text>
            <Text className="text-sm text-black-200 text-start font-rubik-medium">
              {property?.agent.email}
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center gap-3">
          <Image source={icons.chat} className="size-7" />
          <Image source={icons.phone} className="size-7" />
        </View>
      </View>
    </View>
  );
};

export default Agent;
