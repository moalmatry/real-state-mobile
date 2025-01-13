import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

interface MainImageProps {
  imageUri: string | any;
}

const MainImage = ({ imageUri }: MainImageProps) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View className="relative w-full" style={{ height: windowHeight / 2 }}>
      <Image
        source={{ uri: imageUri }}
        className="size-full"
        resizeMode="cover"
      />
      <Image
        source={images.whiteGradient}
        className="absolute top-0 w-full z-40"
      />

      <View
        className="z-50 absolute inset-x-7"
        style={{
          top: Platform.OS === "ios" ? 70 : 20,
        }}
      >
        <View className="flex flex-row items-center w-full justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>

          <View className="flex flex-row items-center gap-3">
            <Image
              source={icons.heart}
              className="size-7"
              tintColor={"#191D31"}
            />
            {/* TODO: Coming Soon */}
            {/* <Image source={icons.send} className="size-7" /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MainImage;
