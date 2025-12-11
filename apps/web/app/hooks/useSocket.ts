import { useEffect, useState } from "react";
import useAuthToken from "./useAuthToken";

export const useSocket = () => {
	const [socket, setSocket] = useState<WebSocket>();
	const [loading, setLoading] = useState(true);
	const { authenticated, token } = useAuthToken();

	useEffect(() => {
		console.log(`Token from ws: ${token}`);
		const ws = new WebSocket(
			(process.env.NEXT_PUBLIC_WS_URL as string) +
				`/?authorization=${token}`
		);
		ws.onopen = () => {
			setSocket(ws);
			setLoading(false);
		};

		return () => ws.close();
	}, [token]);

	return { loading, socket };
};
