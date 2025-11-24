import { useCallback } from "react";

export function useRegister() {
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
			const status = await res.status;
			return status;
		} catch (e) {
			return 999;
		}
	});

	return { register };
}

export default useRegister;
