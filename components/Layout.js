import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@react-native-vector-icons/material-design-icons";
import theme from "@/theme";

import Today from "page/Today";
import Events from "page/Events";
import Settings from "page/Settings";

const Tab = createBottomTabNavigator();

export default function Layout() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false, // no top header
				tabBarIcon: ({ color, size }) => {
					let iconName;
					switch (route.name) {
						case "Today":
							iconName = "home";
							break;
						case "Events":
							iconName = "calendar";
							break;
						case "Settings":
							iconName = "cog";
							break;
					}

					return <Icon name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: theme.colors.primary, // Paper primary color
				tabBarInactiveTintColor: theme.colors.disabled, // Paper disabled color
				tabBarStyle: { backgroundColor: theme.colors.background }, // Paper background
			})}>
			<Tab.Screen name="Today" component={Today} />
			<Tab.Screen name="Events" component={Events} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
}
