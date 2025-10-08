import React from "react";
import { View, Text } from "react-native";
import { useApp } from "@/context/AppContext";

export default function DashboardScreen() {
	const { getStateWithKey } = useApp();
	const user = getStateWithKey("user");
	const displayName = user?.user_metadata?.first_name || "User";

	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-2xl font-bold">Hi {displayName}, Welcome!</Text>
		</View>
	);
}
