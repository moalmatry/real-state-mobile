import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

import BookingSection from "@/components/Properties/BookingSection";
import MainImage from "@/components/Properties/MainImage";
import PropertyInfo from "@/components/Properties/PropertyInfo";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useApowrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <MainImage imageUri={property?.image} />

        <PropertyInfo property={property} />
      </ScrollView>

      <BookingSection property={property} />
    </View>
  );
};

export default Property;
