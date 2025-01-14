import React from "react";
import { Text, TouchableOpacity } from "react-native";

export interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
}

const PrimaryButton = ({ onPress, title }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-16 bg-primary-300 justify-center flex rounded-full"
    >
      <Text className="text-center text-2xl text-accent-100 font-rubik-medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
