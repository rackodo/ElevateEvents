import { useEffect, useState } from "react";

import dark from "@/dark.json";
import light from "@/light.json";

import { Appearance } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export function useDynamicTheme() {
	const [scheme, setScheme] = useState(Appearance.getColorScheme());

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setScheme(colorScheme);
		});
		return () => subscription.remove();
	}, []);

	const theme =
		scheme === "light"
			? {
					...MD3LightTheme,
					colors: { ...MD3LightTheme.colors, ...light.colors }
				}
			: {
					...MD3DarkTheme,
					colors: { ...MD3DarkTheme.colors, ...dark.colors }
				};

	return theme;
}
