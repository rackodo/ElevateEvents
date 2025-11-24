import { useCallback } from "react";

export function registerEvent() {
	const register = useCallback(async ({ eventId, name, email, phone }) => {
		try {
			const res = await fetch(
				"https://grmobile.onrender.com/registrations",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: `{"eventId": ${eventId},"name": "${name}","email": "${email}"${phone.length ? `",phone": ${phone}` : ""}}`
				}
			);
			const response = await res.json();
			const status = await res.status;
		} catch (e) {
			return;
		}
	});

	return { register };
}
