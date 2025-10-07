import React from "react";
import { TextInput } from "react-native";

export default function Input({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      className="border border-gray-300 rounded-xl p-3 text-base my-2 w-full"
      placeholderTextColor="#999"
    />
  );
}
