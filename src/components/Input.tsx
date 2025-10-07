import React from "react";
import { TextInput, TextInputProps } from "react-native";

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText">;

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  ...rest
}: InputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      className="border border-gray-300 rounded-xl p-3 text-base my-2 w-full"
      placeholderTextColor="#999"
      {...rest}
    />
  );
}
