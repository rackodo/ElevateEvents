import { useCallback, useEffect, useState } from "react";
import { RefreshControl, View, ScrollView } from "react-native";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";
import EventCard from "./EventCard";
import theme from "@/theme";

function EventList() {
	const [events, setEvents] = useState([]);
	const [pulling, setPulling] = useState(false);
	const [query, setQuery] = useState("");

	const fetchEvents = async () => {
		const res = await fetch("https://events.realmajed.com/events");
		return res.json();
	};

	const onPull = useCallback(() => {
		setPulling(true);

		const loadEvents = async () => {
			try {
				const data = await fetchEvents();
				setEvents(data);
			} catch (err) {
				console.error("Failed to load events:", err);
			}
		};

		loadEvents().then(() => {
			setPulling(false);
		});
	}, []);

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const data = await fetchEvents();
				setEvents(data);
			} catch (err) {
				console.error("Failed to load events:", err);
			}
		};

		loadEvents();
	}, []);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={pulling} onRefresh={onPull} />
			}>
			<View style={{ paddingHorizontal: 20, paddingTop: 10, gap: 10 }}>
				<Text variant="displaySmall" style={{ fontWeight: "bold" }}>
					Events
				</Text>
			</View>
			<View style={{ padding: 10, gap: 10, flexDirection: "row" }}>
				<Searchbar
					style={{ borderRadius: 10, flex: 1 }}
					onChangeText={setQuery}
				/>
			</View>
			<View style={{ gap: 10, paddingHorizontal: 10, paddingBottom: 15 }}>
				{!events[0] ? (
					<ActivityIndicator
						animating={true}
						color={theme.colors.primary}
						size={48}
					/>
				) : (
					events
						.filter((event) =>
							[
								event.title,
								event.location,
								event.category,
								event.description,
							]
								.join("")
								.toLowerCase()
								.includes(query.toLowerCase().trim())
						)
						.map((event) => (
							<EventCard key={event.id} info={event} />
						))
				)}
			</View>
		</ScrollView>
	);
}

export default EventList;
