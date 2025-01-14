import { black } from "@/constants/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { TextInput, View } from "react-native";

export interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  iconName: string;
  iconSize: number;
}

const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  iconName,
  iconSize,
}: InputProps) => {
  return (
    <View className="flex-row justify-center items-center border border-black-100 h-16 rounded-full px-3 bg-gray-100">
      <FontAwesome6 name={iconName} size={iconSize} color={black[200]} />
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className="w-[90%] pl-3 font-rubik"
      />
    </View>
  );
};

export default Input;
