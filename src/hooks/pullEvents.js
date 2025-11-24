import { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function pullEvents() {
	const cache_key = "events_cache";

	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const load = useCallback(async () => {
		setLoading(true);

		try {
			const cached = await AsyncStorage.getItem(cache_key);
			if (cached) {
				setEvents(JSON.parse(cached));
				console.log("Using cached data");
			}

			const res = await fetch("https://grmobile.onrender.com/events");
			const data = await res.json();
			console.log("Data retrieved");
			setEvents(data);

			await AsyncStorage.setItem(cache_key, JSON.stringify(data));
			console.log("Cache saved");
		} catch (err) {
			console.error("Failed to load events:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	return { events, loading, refresh: load };
}
