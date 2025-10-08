import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Modal,
	FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { FORM_CONFIG, FormField } from "@/config/formConfig";

export default function CreateFormScreen() {
	const [formTitle, setFormTitle] = useState("Untitled Form");
	const [fields, setFields] = useState<FormField[]>([]);
	const [isModalVisible, setModalVisible] = useState(false);
	const [editFieldIndex, setEditFieldIndex] = useState<number | null>(null);
	const [tempField, setTempField] = useState<FormField>({
		type: "",
		config: {},
	});

	const openModal = (index: number | null = null) => {
		if (index !== null) {
			setEditFieldIndex(index);
			setTempField(fields[index]);
		} else {
			setEditFieldIndex(null);
			setTempField({ type: "", config: {} });
		}
		setModalVisible(true);
	};

	const saveField = () => {
		if (!tempField.type) return; // must select a type first
		if (editFieldIndex !== null) {
			const updated = [...fields];
			updated[editFieldIndex] = tempField;
			setFields(updated);
		} else {
			setFields([...fields, tempField]);
		}
		setModalVisible(false);
	};

	const deleteField = (index: number) => {
		setFields(fields.filter((_, i) => i !== index));
	};

	const renderItem = ({ item, index }: { item: FormField; index: number }) => {
		return (
			<View className="bg-white rounded-2xl p-4 mb-3 border border-gray-200 shadow-sm">
				<View className="flex-row items-center justify-between">
					<View className="flex-1">
						<Text className="text-lg font-medium">
							{item.config.label || "Untitled Field"}
						</Text>
						<Text className="text-gray-400 italic text-sm">
							{item.type ? FORM_CONFIG.input_types[item.type]?.label || item.type : "No type selected"}
						</Text>
					</View>
					<View className="flex-row items-center gap-2">
						<TouchableOpacity onPress={() => openModal(index)}>
							<Ionicons name="pencil" size={20} color="#555" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => deleteField(index)}>
							<Ionicons name="trash" size={20} color="#d33" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};

	const renderConfigFields = () => {
		if (!tempField.type) return null;

		const config = FORM_CONFIG.input_types[tempField.type as keyof typeof FORM_CONFIG.input_types];
		if (!config) return null;

		return config.show_form_fields.map((key) => {
			const meta = FORM_CONFIG.form_fields[key as keyof typeof FORM_CONFIG.form_fields];
			if (!meta) return null;

			const value = tempField.config[key] ?? meta.default ?? "";

			switch (meta.type) {
				case "text":
				case "number":
				case "date":
					return (
						<View key={key} className="mb-3">
							<Text className="text-sm font-medium mb-1">{meta.label}</Text>
							<TextInput
								value={String(value)}
								onChangeText={(t) =>
									setTempField({
										...tempField,
										config: { ...tempField.config, [key]: t },
									})
								}
								placeholder={meta.placeholder?.toString()}
								keyboardType={meta.type === "number" ? "numeric" : "default"}
								className="border border-gray-300 rounded-xl p-2"
							/>
						</View>
					);
				case "checkbox":
					return (
						<TouchableOpacity
							key={key}
							onPress={() =>
								setTempField({
									...tempField,
									config: { ...tempField.config, [key]: !value },
								})
							}
							activeOpacity={1}
							className="flex-row items-center mb-3"
						>
							<Ionicons
								name={value ? "checkbox" : "square-outline"}
								size={20}
								color={value ? "#2563EB" : "#555"}
							/>
							<Text className="ml-2 text-sm">{meta.label}</Text>
						</TouchableOpacity>
					);
				case "list":
					return (
						<View key={key} className="mb-3">
							<Text className="text-sm font-medium mb-1">{meta.label}</Text>
							<TextInput
								value={Array.isArray(value) ? value.join(", ") : ""}
								onChangeText={(t) =>
									setTempField({
										...tempField,
										config: {
											...tempField.config,
											[key]: t.split(",").map((v) => v.trim()),
										},
									})
								}
								placeholder="Option 1, Option 2"
								className="border border-gray-300 rounded-xl p-2"
							/>
						</View>
					);
				default:
					return null;
			}
		});
	};

	return (
		<View className="flex-1 bg-gray-50 p-4">
			{/* Form Title */}
			<TextInput
				value={formTitle}
				onChangeText={setFormTitle}
				placeholder="Untitled Form"
				className="text-2xl font-semibold border-b border-gray-200 pb-2 mb-4"
			/>

			{/* Body */}
			{fields.length === 0 ? (
				<View className="flex-1 items-center justify-center">
					<Text className="text-gray-400 text-base">
						Click <Text className="font-bold">+</Text> icon to add input field
					</Text>
				</View>
			) : (
				<FlatList
					data={fields}
					keyExtractor={(item, index) => index.toString()}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{/* Floating Add Button */}
			<TouchableOpacity
				onPress={() => openModal()}
				className="absolute bottom-8 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
			>
				<Ionicons name="add-sharp" size={24} color="white" />
			</TouchableOpacity>

			{/* Modal */}
			<Modal
				visible={isModalVisible}
				animationType="slide"
				transparent
				onRequestClose={() => setModalVisible(false)}
			>
				<View className="flex-1 justify-center items-center bg-black/40">
					<View className="bg-white w-11/12 rounded-2xl p-6">
						<Text className="text-lg font-semibold mb-4">
							{editFieldIndex !== null ? "Edit Field" : "Add New Field"}
						</Text>

						{/* Input Type Dropdown */}
						<Text className="text-sm font-medium mb-1">Input Type</Text>
						<View className="border border-gray-300 rounded-xl mb-3" style={{ height: 36 }}>
							<View style={{ marginTop: -10 }}>
								<Picker
									selectedValue={tempField.type}
									onValueChange={(val) =>
										setTempField({ ...tempField, type: val, config: {} })
									}
								>
									<Picker.Item label="Select Input Type..." value="" />
									{Object.keys(FORM_CONFIG.input_types).map((key) => (
										<Picker.Item
											key={key}
											label={FORM_CONFIG.input_types[key as keyof typeof FORM_CONFIG.input_types].label}
											value={key}
										/>
									))}
								</Picker>
							</View>
						</View>

						{/* Dynamic Config Fields */}
						{renderConfigFields()}

						<View className="flex-row justify-end gap-3 mt-4">
							<TouchableOpacity
								onPress={() => setModalVisible(false)}
								className="px-4 py-2 rounded-xl bg-gray-200"
							>
								<Text>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={saveField}
								className="px-4 py-2 rounded-xl bg-blue-600"
							>
								<Text className="text-white font-semibold">Save</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}
