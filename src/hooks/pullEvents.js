import { useCallback, useEffect, useState } from "react";

export function pullEvents() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch("https://grmobile.onrender.com/events");
			const data = await res.json();
			setEvents(data);
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
