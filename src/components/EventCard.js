import { memo } from "react";

import IconText from "@/components/IconText";

import { useDynamicTheme } from "@/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

function EventCard({ info, from }) {
	const theme = useDynamicTheme();
	const navigation = useNavigation();

	const date = moment().unix();
	const lastTime = moment(`${info.date} ${info.endTime}`).unix();

	return (
		<Card
			style={{
				marginBottom: 10,
				padding: 15,
				opacity: date > lastTime ? 0.5 : 1
			}}
			onPress={() =>
				navigation.navigate("Details", { info: info, fromTab: from })
			}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between"
				}}
			>
				<View>
					<View style={{ flexDirection: "row", gap: 5 }}>
						<IconText name="tag" text={info.category} />
						<IconText
							name="alarm"
							text={moment(
								`${info.date} ${info.startTime}`
							).fromNow()}
						/>
					</View>
					<Text variant="bodyLarge">
						{info.title.replace(" REMOTE", "")}
					</Text>
					<Text variant="bodySmall">
						{moment(info.date).format("Do MMM YYYY")} |{" "}
						{info.startTime + " - " + info.endTime}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<MaterialCommunityIcons
						name="chevron-right"
						color={theme.colors.primary}
						size={36}
					/>
				</View>
			</View>
			<View style={{ marginTop: 10 }}>
				{info.capacity <= 40 ? (
					<View
						style={{
							flexDirection: "row",
							gap: 3,
							height: 5,
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
						{[...Array(info.capacity - info.spotsRemaining)].map(
							(_, index) => (
								<View
									style={{
										backgroundColor:
											theme.colors.surfaceVariant,
										flex: 1
									}}
									key={`occupied${index}`}
								/>
							)
						)}
					</View>
				) : (
					<View
						style={{
							flexDirection: "row",
							height: 5,
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
								backgroundColor: theme.colors.surfaceVariant,
								flex: info.capacity - info.spotsRemaining
							}}
						/>
					</View>
				)}
			</View>
		</Card>
	);
}

export default memo(EventCard);
