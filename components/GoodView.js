import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "@/theme";

export default function GoodView({ children, ...props }) {
	return (
		<SafeAreaView style={[styles.goodView, props.style]} {...props}>
			{children}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	goodView: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
});
