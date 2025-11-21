import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Layout from "comp/Layout";
import theme from "@/theme"; // optional, can remove if you don't have one
import { StatusBar } from "expo-status-bar";

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
