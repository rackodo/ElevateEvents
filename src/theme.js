// theme.js
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import dark from "@/dark.json";
import light from "@/light.json";

import { Appearance } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const STORAGE_KEY = "app_theme_mode"; // "system" | "light" | "dark"

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
	const [mode, setMode] = useState("system");
	const [scheme, setScheme] = useState(Appearance.getColorScheme());
	const [loaded, setLoaded] = useState(false);

	// Load saved theme on startup
	useEffect(() => {
		(async () => {
			try {
				const saved = await AsyncStorage.getItem(STORAGE_KEY);
				if (saved) setMode(saved);      // saved = "light" | "dark" | "system"
			} catch (e) {
				console.warn("Failed to load theme", e);
			}
			setLoaded(true);
		})();
	}, []);

	// Save theme whenever mode changes
	useEffect(() => {
		if (!loaded) return;
		AsyncStorage.setItem(STORAGE_KEY, mode).catch((e) =>
			console.warn("Failed to save theme", e)
		);
	}, [mode, loaded]);

	// Follow system changes only when needed
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			if (mode === "system") setScheme(colorScheme);
		});
		return () => subscription.remove();
	}, [mode]);

	// Compute the REAL scheme
	const realScheme = mode === "system" ? scheme : mode;

	const theme =
		realScheme === "light"
			? {
					...MD3LightTheme,
					colors: { ...MD3LightTheme.colors, ...light.colors },
				}
			: {
					...MD3DarkTheme,
					colors: { ...MD3DarkTheme.colors, ...dark.colors },
				};

	// Do not render until theme is loaded → prevents theme flashing
	if (!loaded) return null;

	return (
		<ThemeContext.Provider value={{ theme, mode, setThemeMode: setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useDynamicTheme() {
	return useContext(ThemeContext);
}