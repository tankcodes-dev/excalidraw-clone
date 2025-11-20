import z from "zod";

export const SignupRequest = z.object({
	name: z.string().optional(),
	email: z.email(),
	password: z.string(),
	phone: z.string().optional(),
});

export type SignupRequestType = z.infer<typeof SignupRequest>;
