import theme from "@/theme"; // optional, can remove if you don't have one

import Layout from "comp/Layout";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Layout />
			</NavigationContainer>
			<StatusBar />
		</PaperProvider>
	);
}
