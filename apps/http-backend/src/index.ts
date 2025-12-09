import "dotenv/config";
import express, { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authentication } from "./middleware/auth.js";
import {
	SignupRequest,
	SignupRequestType,
} from "@repo/common/schema/signupRequestSchema";
import { hashPassword, verifyPassword } from "./util/passwordHasher.js";
import z, { flattenError, ZodSafeParseResult } from "zod";
import { prisma } from "@repo/database";
import logger from "@repo/common/logger";

const app: Application = express();

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
	res.send("pong");
});

app.post("/signup", async (req: Request, res: Response) => {
	const signupRequest: ZodSafeParseResult<SignupRequestType> =
		SignupRequest.safeParse(req.body);

	if (signupRequest.error != undefined) {
		res.status(404).json({
			error: flattenError(signupRequest.error),
		});
		return;
	}

	console.log(JSON.stringify(signupRequest.data));

	try {
		const user = await prisma.user.create({
			data: {
				name: signupRequest.data.name,
				email: signupRequest.data.email,
				password: await hashPassword(signupRequest.data.password),
				phone: signupRequest.data.phone,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error,
		});
		return;
	}

	//check for username uniqueness and store the user data into db

	res.json({
		msg: "Signup successfully",
	});
});

app.post("/signin", async (req: Request, res: Response) => {
	const signinRequest: ZodSafeParseResult<SignupRequestType> =
		SignupRequest.safeParse(req.body);

	//check for user details in db
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: signinRequest.data?.email,
			},
		});

		if (user === null) {
			res.status(401).json({
				msg: "User NOT found",
			});
			return;
		}
		if (
			await verifyPassword(
				user?.password,
				signinRequest.data?.password as string
			)
		) {
			const token = jwt.sign(
				{ userId: user?.id },
				process.env.JWT_SECRET as string
			);

			res.json({
				token,
			});
			return;
		} else {
			res.status(401).json({
				msg: "Wrong Password",
			});
			return;
		}
	} catch (error) {
		res.status(401).json({
			error: error,
		});
	}
});

app.post(
	"/create-room",
	authentication,
	async (req: Request, res: Response) => {
		const roomData = req.body;
		try {
			const room = await prisma.room.create({
				data: {
					adminId: roomData.userId,
					slug: roomData.name,
				},
			});

			res.json({
				roomId: room.id,
			});
		} catch (error) {
			res.status(401).json({
				error,
			});
			return;
		}
	}
);

app.get(
	"/chats/:roomId",
	authentication,
	async (req: Request, res: Response) => {
		try {
			const messages = await prisma.chat.findMany({
				where: {
					roomId: Number(req.params.roomId),
				},
				orderBy: {
					id: "desc",
				},
				take: 50,
			});
			res.json({
				messages,
			});
		} catch (error) {
			logger.error("Database fetched failed.");
			res.status(401).json({
				error,
			});
		}
	}
);

app.listen(3001, (err) => {
	console.log("Server started at http://localhost:3001");
});
