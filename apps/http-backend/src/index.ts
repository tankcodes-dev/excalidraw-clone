import "dotenv/config";
import express, { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authentication } from "./middleware/auth.js";
import {
	SignupRequest,
	SignupRequestType,
} from "@repo/common/schema/signupRequestSchema";
import { hashPassword } from "./util/passwordHasher.js";
import z, { flattenError, ZodSafeParseResult } from "zod";
import { prisma } from "@repo/database";

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

app.post("/signin", (req: Request, res: Response) => {
	const signinRequest = req.body;

	//check for user details in db
	//return JWT

	const token = jwt.sign({ signinRequest }, process.env.JWT_SECRET as string);

	res.json({
		token,
	});
});

app.post("/create-room", authentication, (req: Request, res: Response) => {
	res.json({
		msg: "You have reached a room!",
	});
});

app.listen(3001, (err) => {
	console.log("Server started at http://localhost:3001");
});
