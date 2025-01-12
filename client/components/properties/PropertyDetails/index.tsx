import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";

const PropertyDetails = ({
  property,
}: {
  property: Models.Document | null;
}) => {
  return (
    <>
      <Text className="text-2xl font-rubik-extrabold">{property?.name}</Text>

      <View className="flex flex-row items-center gap-3">
        <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
          <Text className="text-xs font-rubik-bold text-primary-300">
            {property?.type}
          </Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <Image source={icons.star} className="size-5" />
          <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
            {property?.rating} ({property?.reviews.length} reviews)
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center mt-5">
        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
          <Image source={icons.bed} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
          {property?.bedrooms} Beds
        </Text>
        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
          <Image source={icons.bath} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
          {property?.bathrooms} Baths
        </Text>
        <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
          <Image source={icons.area} className="size-4" />
        </View>
        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
          {property?.area} sqft
        </Text>
      </View>
    </>
  );
};

export default PropertyDetails;
