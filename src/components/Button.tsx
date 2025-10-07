import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
} & TouchableOpacityProps;

export default function Button({ title, onPress, className, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-blue-600 p-4 rounded-xl my-3 w-full ${className ?? ""}`}
      {...rest}
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
