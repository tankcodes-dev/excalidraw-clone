import authBackgroungImg from "../resources/chat-app-bg.png";

export default function AuthRoot({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className={`flex flex-col text-gray-950 justify-center items-center h-screen object-cover bg-size-[100%_100%] bg-center bg-no-repeat relative`}
			style={{ backgroundImage: `url(${authBackgroungImg.src})` }}
		>
			{children}
		</div>
	);
}
