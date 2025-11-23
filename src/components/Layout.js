import Details from "@/screens/Details";
import Events from "@/screens/Events";
import Register from "@/screens/Register";
import Settings from "@/screens/Settings";
import Today from "@/screens/Today";

import theme from "@/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
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

					return (
						<MaterialCommunityIcons
							name={iconName}
							size={size}
							color={color}
						/>
					);
				},
				tabBarActiveTintColor: theme.colors.primary, // Paper primary color
				tabBarInactiveTintColor: theme.colors.disabled, // Paper disabled color
				tabBarStyle: { backgroundColor: theme.colors.background } // Paper background
			})}
		>
			<Tab.Screen name="Today" component={Today} />
			<Tab.Screen name="Events" component={Events} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: true }}>
				<Stack.Screen
					name="MainTabs"
					component={Tabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Details"
					component={Details}
					options={({ route }) => ({
						headerTintColor: "#fff",
						headerBackTitle: route.params?.fromTab ?? "Back",
						headerTransparent: true
					})}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
					options={({ route }) => ({
						headerTintColor: "#fff",
						headerBackTitle: route.params?.fromTab ?? "Back",
						headerTransparent: true
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
