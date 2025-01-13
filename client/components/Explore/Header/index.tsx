import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { router } from "expo-router";

const Header = () => {
  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <TouchableOpacity
        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
        onPress={() => router.back()}
      >
        <Image className="size-5" source={icons.backArrow} />
      </TouchableOpacity>

      <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
        Search For Your Ideal Home
      </Text>
      {/* <Image source={icons.bell} className="w-6 h-6" /> */}
      <Text></Text>
    </View>
  );
};

export default Header;
