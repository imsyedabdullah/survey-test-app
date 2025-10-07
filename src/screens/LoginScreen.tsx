import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen(props: LoginScreenProps) {
	const { navigation } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { updateStateKeyWithValue } = useApp();

	const handleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			Alert.alert("Login failed", error.message);
		} else {
			Alert.alert("Success", "Logged in!");
			console.log(data);
			updateStateKeyWithValue("user", data.user);
			navigation.replace("Home");
		}
	};

	return (
		<View className="flex-1 justify-center items-center p-6 bg-white">
			<Text className="text-2xl font-bold mb-6">Login</Text>

			<Input placeholder="Email" value={email} onChangeText={setEmail} />
			<Input
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<Button title="Login" onPress={handleLogin} />

			<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
				<Text className="text-blue-600 mt-4">
					Don’t have an account? Sign up
				</Text>
			</TouchableOpacity>
		</View>
	);
}
