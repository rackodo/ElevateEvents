import { View } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import { Text } from "react-native-paper";
import theme from "@/theme";

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
				<Icon name={name} color={theme.colors.primary} size={16} />
			) : (
				""
			)}
			<Text variant="labelMedium">{text}</Text>
			{right ? (
				<Icon name={name} color={theme.colors.primary} size={16} />
			) : (
				""
			)}
		</View>
	);
}
