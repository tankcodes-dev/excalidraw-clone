"use client";

import { useRef } from "react";
import SigninImage1 from "../../resources/signin-image-1.png";
import { InputBox } from "@repo/ui/input";
import { SignupRequest } from "@repo/common/schema/signupRequestSchema";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultInputBoxStyle =
	"bg-white px-4 py-3 mb-4 rounded-2xl shadow-md w-full";

export default function Signin() {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	async function userSignin() {
		//validate user input
		const userInput = {
			email: emailRef.current?.value,
			password: passwordRef.current?.value,
		};

		const validateUserInput = SignupRequest.safeParse(userInput);

		if (validateUserInput.error) {
			console.log(validateUserInput.error);
			return;
		}

		try {
			const response = await axios.post(
				process.env.NEXT_PUBLIC_SIGNIN_URL as string,
				userInput
			);
			localStorage.setItem("token", response.data.token);
			router.push("/join-room");
		} catch (error: any) {
			alert(error.response.data.msg);
		}
	}

	return (
		<div className="flex flex-col text-gray-950 justify-center items-center p-4 max-w-[500px] sm:w-2xs">
			<h1 className="font-bold text-2xl">Welcome Back!</h1>
			<p>Please log in to a account</p>
			<img
				src={SigninImage1.src}
				className="sm:w-[200px] max-w-[350px]"
			/>
			<InputBox
				ref={emailRef}
				type="email"
				placeholder="Email"
				className={`${defaultInputBoxStyle}`}
			/>
			<InputBox
				ref={passwordRef}
				type="password"
				placeholder="Password"
				className={`${defaultInputBoxStyle}`}
			/>
			<button
				type="submit"
				className="shadow-md bg-linear-to-r from-[#2b83f6] to-[#36a9f6] text-white font-medium rounded-2xl w-full px-4 py-2 hover:cursor-pointer hover:bg-linear-to-r hover:from-[#36a9f6] hover:to-[#2b83f6] hover:shadow-none"
				onClick={userSignin}
			>
				Log In
			</button>
			<p>
				Don't have an account?{" "}
				<u>
					<a href="/signup">Sign up</a>
				</u>
			</p>
		</div>
	);
}
