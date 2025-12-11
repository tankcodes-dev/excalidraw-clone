import { useEffect, useState } from "react";

export default function useAuthToken() {
	const [token, setToken] = useState<string>();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(token)
		if (token) {
			setAuthenticated(true);
			setToken(token);
		}
	}, []);

	return { authenticated: authenticated, token: token };
}
