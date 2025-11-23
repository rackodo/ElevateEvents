import GoodView from "@/components/GoodView";

import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({ route }) {
	const { info } = route.params;

	return (
		<GoodView>
			<SafeAreaView style={{ padding: 10, gap: 10, flex: 1 }}>
				<Text>{info.title}</Text>
			</SafeAreaView>
		</GoodView>
	);
}
