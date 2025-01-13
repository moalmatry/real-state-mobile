import Card from "@/components/Card";
import Header from "@/components/Explore/Header";
import Search from "@/components/Explore/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useApowrite";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        ListHeaderComponent={
          <View className="px-5">
            <Header />
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
        data={properties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
