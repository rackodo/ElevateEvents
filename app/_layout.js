import { View } from "react-native";
import { Appbar } from "react-native-paper";

export default function BaseLayout({ children }) {
	return (
		<View>
			<Appbar.Header>
				<Appbar.Content title="Elevate Horizon Connect" />
			</Appbar.Header>
			{children}
		</View>
	);
}
