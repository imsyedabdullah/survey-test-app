import React, { useState } from "react";
import { View } from "react-native";
import BottomNav from "@/components/BottomNav";
import DashboardScreen from "@/screens/DashboardScreen";
import MyFormsScreen from "@/screens/MyFormsScreen";
import CreateFormScreen from "@/screens/CreateFormScreen";
import PublicFormsScreen from "@/screens/PublicFormsScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabKey } from "@/types/navigation";

export default function MainLayout() {
	const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

	const renderScreen = () => {
		switch (activeTab) {
			case "dashboard":
				return <DashboardScreen />;
			case "myforms":
				return <MyFormsScreen />;
			case "create":
				return <CreateFormScreen />;
			case "publicforms":
				return <PublicFormsScreen />;
			case "settings":
				return <SettingsScreen />;
			default:
				return null;
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1">{renderScreen()}</View>
			<BottomNav active={activeTab} onChange={setActiveTab} />
		</SafeAreaView>
	);
}
