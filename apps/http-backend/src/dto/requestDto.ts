import z from "zod";

const SigninRequest = z.object({
	name: z.string().optional(),
	email: z.email(),
	password: z.string(),
	phone: z.number().optional(),
});

export type SigninRequestType = z.infer<typeof SigninRequest>;
