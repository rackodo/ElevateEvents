import { Appbar, PaperProvider, Text } from "react-native-paper";

import "./global.css";
import Main from "./app/index.js";
import { AppRegistry } from "react-native";
import BaseLayout from "./app/_layout";
import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<PaperProvider>
			<BaseLayout>
				<Main />
			</BaseLayout>
			<StatusBar style="auto" />
		</PaperProvider>
	);
}

AppRegistry.registerComponent("main", () => App);
