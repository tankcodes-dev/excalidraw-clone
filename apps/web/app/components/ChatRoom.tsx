import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";
import { randomUUID } from "crypto";

async function getMessage(id: string) {
	const response = await axios.get(
		(process.env.NEXT_PUBLIC_BACKEND_URL as string) + `/chats/${id}`
	);
	return response.data.messages;
}

export async function ChatRoom({ id }: { id: string }) {
	const messages = await getMessage(id);
	return <ChatRoomClient id={id} messages={messages} key={randomUUID()} />;
}
