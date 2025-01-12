import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";

const Gallery = ({ property }: { property: Models.Document | null }) => {
  if (property?.gallery.length > 0)
    return (
      <View className="mt-7">
        <Text className="text-black-300 text-xl font-rubik-bold">Gallery</Text>
        <FlatList
          contentContainerStyle={{ paddingRight: 20 }}
          data={property?.gallery}
          keyExtractor={(item) => item.$id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              className="size-40 rounded-xl"
            />
          )}
          contentContainerClassName="flex gap-4 mt-3"
        />
      </View>
    );
};

export default Gallery;
