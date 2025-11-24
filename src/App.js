import Layout from "@/components/Layout";

import theme from "@/theme";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<Layout />
			<StatusBar />
		</PaperProvider>
	);
}

registerRootComponent(App);
