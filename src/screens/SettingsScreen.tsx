import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types/navigation";

export default function SettingsScreen() {
	const { resetState } = useApp();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		resetState();
		navigation.replace("Login");
	};

	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-xl font-semibold mb-4">Settings / Profile</Text>
			<TouchableOpacity
				onPress={handleLogout}
				className="flex-row items-center space-x-2 bg-red-500 px-4 py-2 rounded-xl"
			>
				<Ionicons name="log-out-outline" size={22} color="white" />
				<Text className="text-white font-medium">Logout</Text>
			</TouchableOpacity>
		</View>
	);
}
