import { black } from "@/constants/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export interface InputProps {
  /**
   * @description controller name
   */
  name: string;
  control: Control<any>;
  secureTextEntry?: boolean;
  placeholder?: string;
  iconName: string;
  iconSize: number;
  error?: string;
}

const Input = ({
  placeholder,
  secureTextEntry,
  iconName,
  iconSize,
  name,
  control,
  error,
}: InputProps) => {
  return (
    <View>
      <View
        className={`flex-row justify-center items-center border h-16 rounded-full px-3 bg-gray-100 ${
          error ? "border-red-500" : "border-black-100 "
        }`}
      >
        <FontAwesome6 name={iconName} size={iconSize} color={black[200]} />

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              className="w-[90%] pl-3 font-rubik"
              onBlur={onBlur}
            />
          )}
        />
      </View>
      {error && (
        <Text className="mx-2 mt-1 font-rubik text-red-600">{error}</Text>
      )}
    </View>
  );
};

export default Input;
