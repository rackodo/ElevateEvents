import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

import "./global.css"

export default function App() {
	return (
		<>
			<Appbar.Header>
				<Appbar.Content title="Elevate Horizon Connect" />
			</Appbar.Header>
			<View className="flex-1 items-center justify-center bg-black">
				<Text>This is where stuff goes! :)</Text>
				<StatusBar style="auto" />
			</View>
		</>
	);
}