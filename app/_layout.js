import { useState } from "react";
import { View } from "react-native";
import { Appbar, BottomNavigation, Icon, PaperProvider, Provider, Text } from "react-native-paper";
import Today from "./today";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

import "../global.css"
import Events from "./events";
import Settings from "./settings";

export default function BaseLayout() {
	const [index, setIndex] = useState(0);

	const routes = [
		{ key: "today", title: "Today", icon: "home" },
		{ key: "events", title: "Events", icon: "calendar" },
		{ key: "settings", title: "Settings", icon: "cog" },
	];

	const renderScene = ({ route }) => {
		switch (route.key) {
			case "today":
				return <Today />;
			case "events":
				return <Events />;
			case "settings":
				return <Settings />;
			default:
				return null;
		}
	};

	return (
		<Provider>
			<Appbar.Header>
				<Appbar.Content title={routes[index].title} />
			</Appbar.Header>
			<View className="flex-1">{renderScene({ route: routes[index] })}</View>
			<BottomNavigation.Bar
				navigationState={{ index, routes }}
				onTabPress={({ route }) => {
					const newIndex = routes.findIndex(
						(r) => r.key === route.key,
					);
					if (newIndex !== -1) {
						setIndex(newIndex);
					}
				}}
				renderIcon={({ route, color }) => {
					<MaterialDesignIcons name={route.icon} size={24} color={color} />;
				}}
				getLabelText={({ route }) => route.title}
			/>
		</Provider>
	);
}
