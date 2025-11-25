import { useDynamicTheme } from "@/theme";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoodView({ children, style, ...props }) {
	const { theme } = useDynamicTheme();

	return (
		<SafeAreaView
			edges={["left", "top", "right"]}
			style={[
				styles.goodView,
				{ backgroundColor: theme.colors.background },
				style
			]}
			{...props}
		>
			{children}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({ goodView: { flex: 1, gap: 10 } });
