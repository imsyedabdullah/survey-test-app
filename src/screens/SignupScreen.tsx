import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation }: SignupScreenProps) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async () => {
		if (!firstName || !lastName || !email || !password) {
			Alert.alert("Missing Fields", "Please fill in all fields.");
			return;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					first_name: firstName,
					last_name: lastName,
				},
			},
		});

		if (error) {
			Alert.alert("Signup failed", error.message);
		} else {
			Alert.alert(
				"Success",
				"Signup complete! Please verify your email before logging in."
			);
			console.log("User created:", data);
		}
	};

	return (
		<View className="flex-1 justify-center items-center p-6 bg-white">
			<Text className="text-2xl font-bold mb-6">Sign Up</Text>

			<View className="flex-row w-full space-x-2">
				<Input
					placeholder="First Name"
					value={firstName}
					onChangeText={setFirstName}
					className="flex-1 mr-1"
				/>
				<Input
					placeholder="Last Name"
					value={lastName}
					onChangeText={setLastName}
					className="flex-1 ml-1"
				/>
			</View>

			<Input
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<Input
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<Button title="Create Account" onPress={handleSignup} />

			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text className="text-blue-600 mt-4">
					Already have an account? Login
				</Text>
			</TouchableOpacity>
		</View>
	);
}
