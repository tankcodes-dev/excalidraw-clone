"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
	messages,
	id,
}: {
	messages: { message: string }[];
	id: string;
}) {
	const [chats, setChats] = useState(messages);
	const { loading, socket } = useSocket();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (socket && !loading) {
			//join room
			socket?.send(
				JSON.stringify({
					type: "join_room",
					roomId: Number(id),
				})
			);

			//listen to messages
			socket.onmessage = (event) => {
				const parsedData = JSON.parse(event.data);
				const message = parsedData.msg;

				setChats((chats) => [...chats, {message: message}]);
			};
		}
	}, [socket, loading]);

	return (
		<div>
			{chats.map((chat) => (
				<div>{chat.message}</div>
			))}
			<input ref={inputRef} type="text" />
			<button
				onClick={() => {
					socket?.send(
						JSON.stringify({
							type: "chat",
							roomId: id,
							message: `${inputRef.current?.value}`,
						})
					);

					if (inputRef.current) {
						inputRef.current.value = "";
					}
				}}
			>
				Send
			</button>
		</div>
	);
}
