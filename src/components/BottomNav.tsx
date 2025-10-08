import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabKey } from "@/types/navigation";

type Props = {
	active: string;
	onChange: (tab: TabKey) => void;
};

export default function BottomNav(props: Props) {
	const { active, onChange } = props;
	
	return (
		<View className="flex-row justify-between items-center p-6 bg-white border-t border-gray-200">
			<Ionicons
				onPress={() => onChange("dashboard")}
				name="home-sharp"
				size={24}
				color={active === "dashboard" ? "#2563eb" : "#9ca3af"}
			/>

			<Ionicons
				onPress={() => onChange("myforms")}
				name="clipboard"
				size={24}
				color={active === "myforms" ? "#2563eb" : "#9ca3af"}
			/>


				<View
					className={`w-14 h-14 rounded-full items-center justify-center -mt-8 shadow-lg border-4 ${
						active === "create"
							? "bg-blue-600 border-blue-600"
							: "bg-white border-blue-600"
					}`}
				>
					<Ionicons
						onPress={() => onChange("create")}
						name="add"
						size={28}
						color={active === "create" ? "white" : "#2563eb"}
					/>
				</View>

			<Ionicons
				onPress={() => onChange("publicforms")}
				name="earth-sharp"
				size={24}
				color={active === "publicforms" ? "#2563eb" : "#9ca3af"}
			/>

			<Ionicons
				onPress={() => onChange("settings")}
				name="settings-sharp"
				size={24}
				color={active === "settings" ? "#2563eb" : "#9ca3af"}
			/>
		</View>
	);
}
