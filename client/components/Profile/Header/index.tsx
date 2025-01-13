import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <Text className="text-xl font-rubik-bold">Profile</Text>
      {/* TODO: Coming Soon */}
      {/* <Image source={icons.bell} className="size-5" /> */}
    </View>
  );
};

export default Header;
