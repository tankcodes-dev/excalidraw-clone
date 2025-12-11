import "dotenv/config";
import { RawData, WebSocketServer, WebSocket } from "ws";
import { authentication } from "./middleware/authentication.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "@repo/common/logger";
import { prisma } from "@repo/database";

const wss: WebSocketServer = new WebSocketServer({ port: 3002 });

interface User {
	room?: number[];
	ws: WebSocket;
	userId?: string;
}

interface UserData {
	type: "join_room" | "leave_room" | "chat";
	roomId?: number;
	message?: string;
	name?: string;
}

const users: User[] = [];

wss.on("connection", (socket: WebSocket, req) => {
	
	if (!authentication(req)) {
		socket.send("Unauthorize");
		socket.close();
		return;
	}

	const url = new URL((process.env.WS_URL as string) + req.url);
	const urlParams = new URLSearchParams(url.search);
	const authorizationToken = urlParams.get("authorization");

	const decodedData = jwt.decode(authorizationToken as string) as JwtPayload;
	const userId = decodedData.userId;

	socket.send("Connected Successfully");

	users.push({
		userId,
		room: [],
		ws: socket,
	});

	try {
		socket.on("message", async (data: RawData, isBinary: Boolean) => {
			const dataType: UserData = JSON.parse(data.toString());
			if (dataType.type === "join_room") {
				const user = users.find((user) => user.ws === socket);
				user?.room?.push(dataType.roomId as number);
			} else if (dataType.type === "leave_room") {
				const user = users.find((user) => user.ws === socket);
				if (user)
					user.room = user?.room?.filter(
						(roomId) => roomId !== dataType.roomId
					);
			} else if (dataType.type === "chat") {
				try {
					await prisma.chat.create({
						data: {
							message: dataType.message as string,
							roomId: dataType.roomId as number,
							userId: userId,
						},
					});
				} catch (error) {
					logger.error("Database save failed.");
				}
				users.forEach((user) => {
					if (user.room?.includes(dataType.roomId as number))
						user.ws.send(
							JSON.stringify({
								name: dataType.name,
								msg: dataType.message as string,
							})
						);
				});
			}
		});
	} catch (error) {
		logger.error(`WS Server error: ${error}`);
	}
});
