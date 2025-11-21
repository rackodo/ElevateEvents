import { Tabs } from "expo-router";

export default function Layout() {
	return (
		<Tabs>
			<Tabs.Screen
			name="index"
			options={{
				title: "Today"
			}}
			/>
			<Tabs.Screen
			name="events/index"
			options={{
				title: "Events"
			}}
			/>
			<Tabs.Screen
			name="settings/index"
			options={{
				title: "Settings"
			}}
			/>
		</Tabs>
	)
}