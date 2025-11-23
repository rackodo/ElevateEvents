import GoodView from "@/components/GoodView";

import { Text } from "react-native-paper";

export default function Settings() {
	return (
		<GoodView style={{ padding: 10 }}>
			<Text variant="displaySmall" style={{ fontWeight: "bold" }}>
				Settings
			</Text>
		</GoodView>
	);
}
