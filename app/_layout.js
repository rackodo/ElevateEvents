import { BottomNavigation, PaperProvider } from "react-native-paper";
import theme from "./theme";
import { useState } from "react";

import Today from "./index";
import Events from "./events";
import Settings from "./settings";

export default function Layout() {
	const [index, setIndex] = useState(0);

	const [routes] = useState([
		{ key: "today", title: "Today", icon: "home" },
		{ key: "events", title: "Events", icon: "home" },
		{ key: "settings", title: "Settings", icon: "home" },
	]);

	const renderScene = BottomNavigation.SceneMap({
		today: () => <Today />,
		events: () => <Events />,
		settings: () => <Settings />,
	});

	return (
		<PaperProvider theme={theme}>
			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
			/>
		</PaperProvider>
	);
}
