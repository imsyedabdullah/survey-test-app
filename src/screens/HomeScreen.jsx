import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "@/lib/supabase";
import { useApp } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
	const navigation = useNavigation();
	const { getStateWithKey, resetState } = useApp();
	const user = getStateWithKey("user");

	const displayName = user?.user_metadata?.name || user?.email || "there";

	
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={async () => {
						await supabase.auth.signOut();
						resetState();
						navigation.replace("Login");
					}}
					className="mr-2"
				>
					<Ionicons name="log-out-outline" size={24} color="black" />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View className="flex-1 justify-center items-center bg-white">
			<Text className="text-2xl font-bold">Hi {displayName}, Welcome!</Text>
		</View>
	);
}
