import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";
import Comment from "@/components/Comments";

const Reviews = ({ property }: { property: Models.Document | null }) => {
  if (property?.reviews.length > 0)
    return (
      <View className="mt-7">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <Image source={icons.star} className="size-6" />
            <Text className="text-black-300 text-xl font-rubik-bold ml-2">
              {property?.rating} ({property?.reviews.length} reviews)
            </Text>
          </View>

          <TouchableOpacity>
            <Text className="text-primary-300 text-base font-rubik-bold">
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-5">
          <Comment item={property?.reviews[0]} />
        </View>
      </View>
    );
};

export default Reviews;
