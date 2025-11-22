import { Text } from "react-native-paper";

import GoodView from "comp/GoodView";

export default function Settings() {
	return (
		<GoodView style={{ padding: 10 }}>
			<Text variant="displaySmall" style={{ fontWeight: "bold" }}>
				Settings
			</Text>
		</GoodView>
	);
}
