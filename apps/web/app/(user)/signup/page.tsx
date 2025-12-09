import SignupImage1 from "../../resources/signup-image-1.png";
import { InputBox } from "@repo/ui/input";

const defaultInputBoxStyle =
	"bg-white px-4 py-3 mb-4 rounded-2xl shadow-md w-full";

export default function Signup() {
	return (
		<div className="flex flex-col text-gray-950 justify-center items-center p-4 max-w-[500px] sm:w-2xs">
			<h1 className="font-bold text-2xl">Create Your Account</h1>
			<img
				src={SignupImage1.src}
				className="sm:w-[200px] max-w-[350px]"
			/>
			<InputBox
				type="text"
				placeholder="Fullname"
				className={`${defaultInputBoxStyle}`}
			/>
			<InputBox
				type="email"
				placeholder="Email"
				className={`${defaultInputBoxStyle}`}
			/>
			<InputBox
				type="password"
				placeholder="Password"
				className={`${defaultInputBoxStyle}`}
			/>
			<InputBox
				type="password"
				placeholder="Confirm Password"
				className={`${defaultInputBoxStyle}`}
			/>
			<button
				type="submit"
				className="bg-linear-to-r from-[#2b83f6] to-[#36a9f6] text-white font-medium rounded-2xl w-full px-4 py-2 hover:cursor-pointer hover:bg-linear-to-r hover:from-[#36a9f6] hover:to-[#2b83f6]"
			>
				Sign Up
			</button>
			<p>
				Already have an account? <a href="/signin">Log in</a>
			</p>
		</div>
	);
}
