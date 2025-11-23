import { useMemo } from "react";

import EventCard from "@/components/EventCard";
import GoodView from "@/components/GoodView";

import { pullEvents } from "@/hooks/pullEvents";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

export default function Today() {
	const date = moment();

	const navigation = useNavigation();

	const { events } = pullEvents();

	const filteredEvents = useMemo(() => {
		return events.filter(
			(event) => moment(event.date).date() == date.date()
		);
	});

	return (
		<GoodView style={{ padding: 10 }}>
			<Text variant="displaySmall" style={{ fontWeight: "bold" }}>
				Welcome
			</Text>
			<Text>Find and Register for Community Events</Text>
			<Divider />
			<Button
				mode="contained"
				style={{ borderRadius: 10 }}
				onPress={() => navigation.navigate("Events")}
			>
				View All Events
			</Button>
			<View>
				{filteredEvents.map((event) => (
					<EventCard key={event.id} info={event} from="Today" />
				))}
			</View>
		</GoodView>
	);
}
