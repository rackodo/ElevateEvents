import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Today() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}
			>
				<Card style={{ padding: 16 }}>
					<Text variant="titleLarge">Welcome</Text>
				</Card>
			</View>
		</SafeAreaView>
	);
}
