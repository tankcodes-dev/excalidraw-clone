import "dotenv/config";
import express, { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authentication } from "./middleware/auth.js";
import { SigninRequestType } from "./dto/requestDto.js";
import { hashPassword } from "./util/passwordHasher.js";

const app: Application = express();

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
	res.send("pong");
});

app.post("/signup", async (req: Request, res: Response) => {
	const signupRequest: SigninRequestType = req.body;

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
	("Server started at http://localhost:3001");
});
