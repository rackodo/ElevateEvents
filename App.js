import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { AppRegistry } from "react-native";

import Main from "./app/today.js";
import BaseLayout from "./app/_layout";

export default function App() {
	return (
		<>
			<BaseLayout>
				<Main />
			</BaseLayout>
			<StatusBar style="auto" />
		</>
	);
}

AppRegistry.registerComponent("main", () => App);
