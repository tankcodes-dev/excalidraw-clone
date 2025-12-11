import "dotenv/config"
import logger from "@repo/common/logger";
import "dotenv/config";
import jwt from "jsonwebtoken";

export function authentication(req: any): boolean {
	const url = new URL(process.env.WS_URL + req.url);
	const urlParams = new URLSearchParams(url.search);
	const authorizationToken = urlParams.get("authorization");
	if (!authorizationToken) {
		logger.error("Authorization token NOT provided");
		return false;
	}
	try {
		const data = jwt.verify(
			authorizationToken,
			process.env.JWT_SECRET as string
		);
	} catch (error) {
		logger.error(`Error in verifying authorization token: ${error}`);
		return false;
	}
	return true;
}
