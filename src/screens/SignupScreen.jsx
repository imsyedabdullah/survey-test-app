import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

export default function SignupScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			Alert.alert("Signup failed", error.message);
		} else {
			Alert.alert(
				"Success",
				"Signup complete! Please verify your email before logging in."
			);
			console.log(data);
		}
	};

	return (
		<View className="flex-1 justify-center items-center p-6 bg-white">
			<Text className="text-2xl font-bold mb-6">Sign Up</Text>

			<Input placeholder="Email" value={email} onChangeText={setEmail} />
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
