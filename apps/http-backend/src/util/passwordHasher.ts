import argon2, { argon2id } from "argon2";

export async function hashPassword(password: string): Promise<string> {
	const hash = await argon2.hash(password, {
		type: argon2id,
	});

	return hash;
}

export async function verifyPassword(
	hash: string,
	password: string
): Promise<Boolean> {
	return await argon2.verify(hash, password);
}
