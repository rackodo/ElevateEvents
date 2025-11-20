import App from "./App";
import { PaperProvider } from "react-native-paper";
import { AppRegistry } from "react-native";

export default function Main() {
	return (
		<PaperProvider>
			<App />
		</PaperProvider>
	);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent("main", () => Main);
