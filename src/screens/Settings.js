import { useState } from "react";

import GoodView from "@/components/GoodView";

import { useDynamicTheme } from "@/theme";

import { Appearance, View } from "react-native";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

export default function Settings() {
	const { theme, mode, setThemeMode } = useDynamicTheme();

	const OPTIONS = [
		{ label: "System", value: "system" },
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" }
	];

	return (
		<GoodView style={{ padding: 10 }}>
			<Text variant="displaySmall" style={{ fontWeight: "bold" }}>
				Settings
			</Text>
			<View>
				<Text variant="headlineSmall">Font size</Text>
				<Text style={{ color: theme.colors.outline }}>
					Font size is determined by your system's font size. To
					change the size of text in Elevate Events, adjust your
					system's font size settings.
				</Text>
			</View>
			<View>
				<Text variant="headlineSmall">Theme</Text>
				<Dropdown
					label="Theme"
					options={OPTIONS}
					value={mode}
					onSelect={(value) => setThemeMode(value)}
				/>
			</View>
		</GoodView>
	);
}
