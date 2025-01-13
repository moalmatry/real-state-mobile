import NoResults from "@/components/NoResults";
import { getLatestProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useApowrite";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import FeaturedCard from "../FeaturedCard";

const FeaturedSection = () => {
  const { data: LatestProperties, loading: latestPropertiesLoading } =
    useAppwrite({ fn: getLatestProperties });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <View className="my-5">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
        {/* TODO: Coming Soon */}
        {/* <TouchableOpacity>
          <Text className="text-base font-rubik-bold text-primary-300">
            See All
          </Text>
        </TouchableOpacity> */}
      </View>
      {latestPropertiesLoading ? (
        <ActivityIndicator size="large" className="text-primary-300" />
      ) : !LatestProperties || LatestProperties.length === 0 ? (
        <NoResults />
      ) : (
        <FlatList
          data={LatestProperties}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <FeaturedCard
              item={item}
              onPress={() => handleCardPress(item.$id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerClassName="flex gap-5 mt-5"
        />
      )}
    </View>
  );
};

export default FeaturedSection;
