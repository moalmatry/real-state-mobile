import React from "react";
import { Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import Agent from "../Agent";
import Facilities from "../Facilities";
import Gallery from "../Gallery";
import Map from "../Map";
import PropertyDetails from "../PropertyDetails";
import Reviews from "../Reviews";

// NOTE: Replace Model type after building the backend
const PropertyInfo = ({ property }: { property: Models.Document | null }) => {
  return (
    <View className="px-5 mt-7 flex gap-2">
      <PropertyDetails property={property} />
      <Agent property={property} />

      <View className="mt-7">
        <Text className="text-black-300 text-xl font-rubik-bold">Overview</Text>
        <Text className="text-black-200 text-base font-rubik mt-2">
          {property?.description}
        </Text>
      </View>

      <Facilities property={property} />

      <Gallery property={property} />
      <Map address={property?.address} />

      <Reviews property={property} />
    </View>
  );
};

export default PropertyInfo;
