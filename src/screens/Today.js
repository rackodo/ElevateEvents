import GoodView from "comp/GoodView";

import { useNavigation } from "@react-navigation/native";
import { Button, Divider, Text } from "react-native-paper";

export default function Today() {
	const navigation = useNavigation();

	return (
		<GoodView
			style={{
				padding: 10,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text variant="displaySmall" style={{ fontWeight: "bold" }}>
				Welcome
			</Text>
			<Text>Find and Register for Community Events</Text>
			<Divider />
			<Button
				mode="contained"
				style={{ borderRadius: 10 }}
				onPress={() => navigation.navigate("Events")}
			>
				View Today's Events
			</Button>
		</GoodView>
	);
}
