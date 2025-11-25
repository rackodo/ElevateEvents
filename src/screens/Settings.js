import { useCallback, useEffect, useState } from "react";

import GoodView from "@/components/GoodView";

import { useDynamicTheme } from "@/theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

export default function Settings() {
	const sound_key = "sound_key";

	const { theme, mode, setThemeMode } = useDynamicTheme();
	const [sound, setSound] = useState(false);
	const [loading, setLoading] = useState(true);

	const OPTIONS = [
		{ label: "System", value: "system" },
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" }
	];

	useEffect(() => {
		// load saved value once
		let mounted = true;
		(async () => {
			try {
				const saved = await AsyncStorage.getItem(sound_key);
				console.log("AsyncStorage.getItem ->", saved);
				if (!mounted) return;
				setSound(saved === "on");
			} catch (e) {
				console.log("Error reading sound_key:", e);
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	// use the value that is passed from the Switch (newValue) — more reliable
	const onToggleSound = useCallback(async (newValue) => {
		try {
			// immediately update UI
			setSound(newValue);
			// then persist
			await AsyncStorage.setItem(sound_key, newValue ? "on" : "off");
			console.log("AsyncStorage.setItem ->", newValue ? "on" : "off");
		} catch (e) {
			console.log("Error setting sound_key:", e);
		}
	}, []);

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

			<View>
				<Text variant="headlineSmall">Sound</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text>Sound Enabled</Text>

					{/* Pass the new value from the onValueChange handler */}
					<Switch
						value={sound}
						onValueChange={(val) => onToggleSound(val)}
						// optionally disable while loading to avoid visual mismatch
						disabled={loading}
					/>
				</View>
			</View>
		</GoodView>
	);
}
