import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authentication(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization as string;

	try {
		const verify = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;
		if (req.method.toLowerCase() === "post")
			req.body.userId = verify.userId;
		next();
	} catch (error) {
		res.status(401).json({
			msg: "Unauthorize",
			error,
		});
	}
}
