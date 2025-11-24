import { useCallback, useMemo, useState } from "react";

import EventCard from "@/components/EventCard";
import GoodView from "@/components/GoodView";

import { pullEvents } from "@/hooks/pullEvents";

import theme from "@/theme";

import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import {
	ActivityIndicator,
	Button,
	Chip,
	IconButton,
	Searchbar,
	SegmentedButtons,
	Text
} from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

function Events() {
	const { events, loading, refresh } = pullEvents(); // ← replaced fetching logic

	const [query, setQuery] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);

	const [range, setRange] = useState({
		startDate: undefined,
		endDate: undefined
	});
	const [modalOpen, setModalOpen] = useState(false);

	const onDismiss = useCallback(() => {
		setModalOpen(false);
	}, [setModalOpen]);

	const onConfirm = useCallback(
		({ startDate, endDate }) => {
			setModalOpen(false);
			setRange({ startDate, endDate });
		},
		[setModalOpen, setRange]
	);

	const uniqueCategories = useMemo(
		() => [...new Set(events.map((e) => e.category))],
		[events]
	);

	const filteredEvents = useMemo(() => {
		const q = query.toLowerCase().trim();
		return events
			.filter((event) => {
				if (range.startDate || range.endDate) {
					const comparableDate = Number(
						moment(event.date).format("YYYYMMDD")
					);
					const start = Number(
						moment(range.startDate).format("YYYYMMDD")
					);
					const end = Number(
						moment(range.endDate).format("YYYYMMDD")
					);

					if (comparableDate < start) return false;
					if (comparableDate > end) return false;

					return true;
				}
				return true;
			})
			.filter((event) =>
				selectedCategories.length
					? selectedCategories.includes(event.category)
					: true
			)
			.filter((event) =>
				[event.title, event.location, event.description]
					.join("")
					.toLowerCase()
					.includes(q)
			);
	}, [events, selectedCategories, query, range]);

	const toggleCategory = useCallback((category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	}, []);

	return (
		<GoodView>
			<FlatList
				data={filteredEvents}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<EventCard info={item} from="Events" />
				)}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
				ListHeaderComponent={
					<>
						<View style={{ paddingTop: 10 }}>
							<Text
								variant="displaySmall"
								style={{ fontWeight: "bold" }}
							>
								Events
							</Text>
						</View>
						<View></View>
						<View
							style={{
								paddingVertical: 10,
								flexDirection: "row"
							}}
						>
							<Searchbar
								style={{
									borderRadius: "10px!important",
									flex: 1
								}}
								onChangeText={setQuery}
							/>
						</View>
						<>
							<View style={{ flexDirection: "row", gap: 10 }}>
								<Button
									mode={range.startDate || range.endDate ? "contained" : "outlined"}
									style={{ flex: 1, borderRadius: 10 }}
									onPress={() => setModalOpen(true)}
								>
									{range.startDate || range.endDate
										? `${moment(range.startDate).format("Do M, YYYY")} - ${moment(range.endDate).format("Do MMM, YYYY")}`
										: `Select Range...`}
								</Button>
								{range.startDate || range.endDate ? (
									<IconButton
										mode="outlined"
										icon="close"
										style={{ borderRadius: 10, margin: 0 }}
										onPress={() =>
											setRange({
												startDate: undefined,
												endDate: undefined
											})
										}
									/>
								) : (
									<></>
								)}
							</View>
							<DatePickerModal
								mode="range"
								locale="en"
								label="Select Date Range"
								visible={modalOpen}
								onDismiss={onDismiss}
								startDate={range.startDate}
								endDate={range.endDate}
								onConfirm={onConfirm}
							/>
						</>
						{/* CATEGORY CHIPS */}
						<View style={{ paddingTop: 10, marginBottom: 10 }}>
							<View style={{ position: "relative" }}>
								<ScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={{ gap: 10 }}
								>
									{uniqueCategories.map((category) => {
										const selected =
											selectedCategories.includes(
												category
											);
										return (
											<Chip
												key={category}
												mode={
													selected
														? "flat"
														: "outlined"
												}
												onPress={() =>
													toggleCategory(category)
												}
											>
												{category}
											</Chip>
										);
									})}
								</ScrollView>

								{/* Left gradient */}
								<LinearGradient
									colors={[
										theme.colors.background,
										"rgba(26, 28, 30, 0)"
									]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={{
										position: "absolute",
										left: 0,
										top: 0,
										bottom: 0,
										width: 20
									}}
									pointerEvents="none"
								/>

								{/* Right gradient */}
								<LinearGradient
									colors={[
										"rgba(26, 28, 30, 0)",
										theme.colors.background
									]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={{
										position: "absolute",
										right: 0,
										top: 0,
										bottom: 0,
										width: 20
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
				contentContainerStyle={{
					paddingBottom: 10,
					paddingHorizontal: 10
				}}
			/>
		</GoodView>
	);
}

export default Events;
