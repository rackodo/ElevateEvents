import GoodView from "@/components/GoodView";
import IconText from "@/components/IconText";

import { registerEvent } from "@/hooks/registerEvent";

import theme from "@/theme";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { View } from "react-native";
import { Button, Divider, ProgressBar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details({ route }) {
	const { info } = route.params;

	const { register } = registerEvent();

	const navigation = useNavigation();

	const date = moment().unix();
	const firstTime = moment(`${info.date} ${info.startTime}`).unix()

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
				<Divider />
				<View>
					{info.capacity <= 60 ? (
						<View
							style={{
								flexDirection: "row",
								gap: 3,
								height: 10,
								borderRadius: 10,
								overflow: "hidden"
							}}
						>
							{[...Array(info.spotsRemaining)].map((_, index) => (
								<View
									style={{
										backgroundColor: theme.colors.primary,
										flex: 1
									}}
									key={`remaining${index}`}
								/>
							))}
							{[
								...Array(info.capacity - info.spotsRemaining)
							].map((_, index) => (
								<View
									style={{
										backgroundColor:
											theme.colors.surfaceVariant,
										flex: 1
									}}
									key={`occupied${index}`}
								/>
							))}
						</View>
					) : (
						<View
							style={{
								flexDirection: "row",
								height: 10,
								borderRadius: 10,
								overflow: "hidden"
							}}
						>
							<View
								style={{
									backgroundColor: theme.colors.primary,
									flex: info.spotsRemaining
								}}
							/>
							<View
								style={{
									backgroundColor:
										theme.colors.surfaceVariant,
									flex: info.capacity - info.spotsRemaining
								}}
							/>
						</View>
					)}
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						flexDirection: "row"
					}}
				>
					<Text variant="labelMedium">
						Spots remaining: {info.spotsRemaining}/{info.capacity}
					</Text>
				</View>
				<View style={{ flex: 1, flexDirection: "column-reverse" }}>
					<Button
						mode="contained"
						style={{ borderRadius: 10, marginTop: 20 }}
						disabled={date > firstTime}
						onPress={() =>
							navigation.navigate("Register", { info })
						}
					>
						Register
					</Button>
				</View>
			</SafeAreaView>
		</GoodView>
	);
}
