// Tabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "./theme";

import Today from "./screens/Today";
import Events from "./screens/Events";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();

export default function LayoutTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false, // no top header
				tabBarIcon: ({ color, size }) => {
					let iconName =
						route.name === "Today"
							? "home"
							: route.name === "Events"
								? "calendar"
								: "cog";

					return <Icon name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: theme.colors.primary, // Paper primary color
				tabBarInactiveTintColor: theme.colors.disabled, // Paper disabled color
				tabBarStyle: { backgroundColor: theme.colors.background }, // Paper background
			})}
		>
			<Tab.Screen name="Today" component={Today} />
			<Tab.Screen name="Events" component={Events} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
}
