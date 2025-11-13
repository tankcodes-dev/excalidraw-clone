import "dotenv/config";
import ws, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

const wss: WebSocketServer = new WebSocketServer({ port: 3002 });

wss.on("connection", (socket: ws, req) => {
	const token = req.headers.token;

	if (!token) {
		socket.send("Invalid token");
		socket.close();
		return;
	}

	try {
		jwt.verify(token as string, process.env.JWT_SECRET as string);
		socket.send("Validated");
	} catch (error) {
		socket.send("Unauthorize");
		socket.close();
		return;
	}

	socket.on("message", (data: ws.RawData, isBinary: Boolean) => {
		console.log(data.toString());
		console.log(isBinary);

		socket.send("Hello");
	});
});
