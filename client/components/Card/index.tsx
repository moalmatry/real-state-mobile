import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface CardProps {
  item: Models.Document;
  onPress?: () => void;
}
const Card = ({
  onPress,
  item: { image, rating, name, address, price },
}: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {rating}
        </Text>
      </View>
      <Image source={{ uri: image }} className="w-full h-40 rounded-lg" />
      <View className="flex flex-col mt-2">
        <Text
          className="text-base font-rubik-bold text-black-300"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-xs  font-rubik text-black-200">{address}</Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-extrabold text-primary-300">
            {price} EGP
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
