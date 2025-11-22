import theme from "@/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function IconText({ name, text, right, ...props }) {
	return (
		<View
			style={[
				{ flex: 0, flexDirection: "row", gap: 5, alignItems: "center" },
				props.style
			]}
			{...props}
		>
			{!right ? (
				<MaterialCommunityIcons
					name={name}
					color={theme.colors.primary}
					size={16}
				/>
			) : (
				""
			)}
			<Text variant="labelMedium">{text}</Text>
			{right ? (
				<MaterialCommunityIcons
					name={name}
					color={theme.colors.primary}
					size={16}
				/>
			) : (
				""
			)}
		</View>
	);
}
