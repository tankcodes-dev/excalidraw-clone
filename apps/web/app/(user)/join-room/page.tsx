"use client";

import { useRef } from "react";
import JoinRoomImage1 from "../../resources/join-room-image-1.png";
import { InputBox } from "@repo/ui/input";
import { SignupRequest } from "@repo/common/schema/signupRequestSchema";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultInputBoxStyle =
	"bg-white px-4 py-3 mb-4 rounded-2xl shadow-md w-full";

export default function JoinRoom() {
	const roomIdRef = useRef<HTMLInputElement | null>(null);
	const nicknameRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	async function joinRoom() {
		//check valid inputs
		const inputRequest = {
			roomId: roomIdRef.current?.value,
			name: nicknameRef.current?.value,
		};
		const validateInputRequest = SignupRequest.safeParse(inputRequest);

		if (validateInputRequest.error) {
			console.log(validateInputRequest.error);
			return;
		}
		const response = await axios.post(
			process.env.NEXT_PUBLIC_SIGNUP_URL as string,
			inputRequest
		);

		if (response.status === 200) {
			router.push("/chat");
		}
	}
	return (
		<div className="flex flex-col text-gray-950 justify-center items-center p-4 max-w-[500px] sm:w-2xs">
			<img
				src={JoinRoomImage1.src}
				className="sm:w-[200px] max-w-[350px]"
			/>
			<h1 className="font-bold text-2xl">Join a Room</h1>
			<p className="mb-10">Enter the Room Id and chat!</p>
			<InputBox
				ref={roomIdRef}
				type="text"
				placeholder="Room Id"
				className={`${defaultInputBoxStyle}`}
			/>
			<InputBox
				ref={nicknameRef}
				type="email"
				placeholder="Nickname (optional)"
				className={`${defaultInputBoxStyle}`}
			/>
			<button
				type="submit"
				className="bg-linear-to-r from-[#2b83f6] to-[#36a9f6] text-white font-medium rounded-2xl w-full px-4 py-2 hover:cursor-pointer hover:bg-linear-to-r hover:from-[#36a9f6] hover:to-[#2b83f6]"
				onClick={joinRoom}
			>
				Join Room
			</button>
			<p>
				Or create a new{" "}
				<u>
					<a href="/create-room">room</a>
				</u>
			</p>
		</div>
	);
}
