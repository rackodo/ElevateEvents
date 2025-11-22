import { memo } from "react";

import theme from "@/theme";

import IconText from "comp/IconText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

function EventCard({ info }) {
	return (
		<Card style={{ marginHorizontal: 10, marginBottom: 10 }}>
			<View
				style={{
					padding: 15,
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
		</Card>
	);
}

export default memo(EventCard);
