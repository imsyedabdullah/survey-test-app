import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-600 p-4 rounded-xl my-3 w-full"
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
