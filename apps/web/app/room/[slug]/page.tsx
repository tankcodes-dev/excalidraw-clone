// "use client";

import axios from "axios";
import useAuthToken from "../../hooks/useAuthToken";
import { ChatRoom } from "../../components/ChatRoom";

export default async function Room({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// const { authenticated, token } = useAuthToken();

	const { slug } = await params;

	const response = await axios.get(
		(process.env.NEXT_PUBLIC_ROOMID_URL as string) + `/${slug}`
	);

	const roomId = response.data.roomId;

	if (roomId) {
		return (
			<div>
				<ChatRoom id={roomId} />
			</div>
		);
	}

	return <div>Loading...</div>;
}
