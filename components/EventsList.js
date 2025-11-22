import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, View, ScrollView, FlatList } from "react-native";
import { ActivityIndicator, Chip, Searchbar, Text } from "react-native-paper";
import EventCard from "./EventCard";
import theme from "@/theme";
import { LinearGradient } from "expo-linear-gradient";

function EventList() {
	const [events, setEvents] = useState([]);
	const [pulling, setPulling] = useState(false);
	const [query, setQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);

	const loadEvents = useCallback(async () => {
		try {
			const res = await fetch("https://grmobile.onrender.com/events");
			const data = await res.json();
			setEvents(data);
		} catch (err) {
			console.error("Failed to load events:", err);
		}
	}, []);

	const onPull = useCallback(async () => {
		setPulling(true);
		await loadEvents();
		setPulling(false);
	}, [loadEvents]);

	useEffect(() => {
		loadEvents();
	}, [loadEvents]);

	const uniqueCategories = useMemo(
		() => [...new Set(events.map((e) => e.category))],
		[events],
	);

	const filteredEvents = useMemo(() => {
		const q = query.toLowerCase().trim();
		return events
			.filter((event) =>
				selectedCategories.length
					? selectedCategories.includes(event.category)
					: true,
			)
			.filter((event) =>
				[event.title, event.location, event.description]
					.join("")
					.toLowerCase()
					.includes(q),
			);
	}, [events, selectedCategories, query]);

	const toggleCategory = useCallback((category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	}, []);

	return (
		<FlatList
			data={filteredEvents}
			keyExtractor={(item) => String(item.id)}
			renderItem={({ item }) => <EventCard info={item} />}
			refreshControl={
				<RefreshControl refreshing={pulling} onRefresh={onPull} />
			}
			// Everything above the list
			ListHeaderComponent={
				<>
					<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
						<Text
							variant="displaySmall"
							style={{ fontWeight: "bold" }}>
							Events
						</Text>
					</View>

					<View style={{ padding: 10, flexDirection: "row" }}>
						<Searchbar
							style={{ borderRadius: 10, flex: 1 }}
							onChangeText={setQuery}
						/>
					</View>

					{/* CATEGORY CHIPS SCROLL */}
					<View style={{ marginBottom: 10 }}>
						<View style={{ position: "relative" }}>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									gap: 10,
									paddingHorizontal: 10,
								}}>
								{uniqueCategories.map((category) => {
									const selected =
										selectedCategories.includes(category);
									return (
										<Chip
											key={category}
											mode={
												selected ? "flat" : "outlined"
											}
											onPress={() =>
												toggleCategory(category)
											}>
											{category}
										</Chip>
									);
								})}
							</ScrollView>

							{/* Left fade */}
							<LinearGradient
								colors={[
									theme.colors.background,
									"rgba(26, 28, 30, 0)",
								]}
								start={{ x: 0.5, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									bottom: 0,
									width: 20,
								}}
								pointerEvents="none"
							/>

							{/* Right fade */}
							<LinearGradient
								colors={[
									"rgba(26, 28, 30, 0)",
									theme.colors.background,
								]}
								start={{ x: 0, y: 0 }}
								end={{ x: 0.5, y: 0 }}
								style={{
									position: "absolute",
									right: 0,
									top: 0,
									bottom: 0,
									width: 20,
								}}
								pointerEvents="none"
							/>
						</View>
					</View>
				</>
			}
			ListEmptyComponent={
				<ActivityIndicator
					animating
					size={48}
					color={theme.colors.primary}
					style={{ marginTop: 30 }}
				/>
			}
			contentContainerStyle={{ paddingBottom: 10 }}
		/>
	);
}

export default EventList;
