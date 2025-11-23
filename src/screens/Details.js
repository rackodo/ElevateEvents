import GoodView from "@/components/GoodView";
import IconText from "@/components/IconText";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details({ route }) {
	const { info } = route.params;

	const navigation = useNavigation();

	return (
		<GoodView>
			<SafeAreaView style={{ padding: 10, gap: 10, flex: 1 }}>
				<View>
					<Text
						variant="headlineMedium"
						style={{ fontWeight: "bold" }}
					>
						{info.title.replace(" REMOTE", "")}
					</Text>
					<Text variant="bodyLarge">{info.description}</Text>
				</View>
				<Divider />
				<View
					style={{
						justifyContent: "space-between",
						flexDirection: "row"
					}}
				>
					<IconText
						name="alarm"
						text={moment(
							`${info.date} ${info.startTime}`
						).fromNow()}
					/>
					<IconText
						name="calendar"
						text={`${moment(info.date).format("Do MMM YYYY")}  |  ${info.startTime + " - " + info.endTime}`}
						right
					/>
				</View>
				<View
					style={{
						justifyContent: "space-between",
						flexDirection: "row"
					}}
				>
					<IconText name="tag" text={info.category} />
					<IconText name="pin" text={info.location} right />
				</View>
				<View style={{ flex: 1, flexDirection: "column-reverse" }}>
					<Button
						mode="contained"
						style={{ borderRadius: 10, marginTop: 20 }}
						onPress={() =>
							navigation.navigate("Register", { info: info })
						}
					>
						Register
					</Button>
				</View>
			</SafeAreaView>
		</GoodView>
	);
}
