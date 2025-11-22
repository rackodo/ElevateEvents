import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "@react-native-vector-icons/material-design-icons";
import theme from "@/theme";
import IconText from "comp/IconText";
import { memo } from "react";

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
					<IconText name="tag" text={info.category} />
					<Text variant="bodyLarge">
						{info.title.replace(" REMOTE", "")}
					</Text>
					<Text variant="bodySmall">
						{info.date} | {info.startTime + " - " + info.endTime}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Icon
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
