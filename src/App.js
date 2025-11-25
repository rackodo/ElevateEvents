import Layout from "@/components/Layout";

import { ThemeProvider, useDynamicTheme } from "@/theme";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

export default function App() {
	return (
		<ThemeProvider>
			<ThemedApp />
		</ThemeProvider>
	);
}

function ThemedApp() {
	const { theme } = useDynamicTheme();
	return (
		<PaperProvider theme={theme}>
			<Layout />
			<StatusBar style={theme.dark ? "light" : "dark"} />
		</PaperProvider>
	);
}

registerRootComponent(App);
