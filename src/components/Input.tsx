import React from "react";
import { TextInput, TextInputProps } from "react-native";

type InputProps = {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
} & Omit<TextInputProps, "value" | "onChangeText">;

export default function Input(props: InputProps) {
	const {
		placeholder,
		value,
		onChangeText,
		secureTextEntry = false,
		className = "",
		...rest
	} = props;

	return (
		<TextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			secureTextEntry={secureTextEntry}
			className={"border border-gray-300 rounded-xl p-3 text-base my-1 w-full " + className}
			placeholderTextColor="#999"
			{...rest}
		/>
	);
}
