import Layout from "@/components/Layout";

import { useDynamicTheme } from "@/theme";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

export default function App() {
	const theme = useDynamicTheme();

	return (
		<PaperProvider theme={theme}>
			<Layout />
			<StatusBar />
		</PaperProvider>
	);
}

registerRootComponent(App);
