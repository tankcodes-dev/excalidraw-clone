import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authentication(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization as string;

	try {
		const verify = jwt.verify(token, process.env.JWT_SECRET as string);
		next();
	} catch (error) {
		res.status(401).json({
			msg: "Unauthorize",
		});
	}
}
