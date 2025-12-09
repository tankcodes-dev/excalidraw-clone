import { HTMLInputTypeAttribute } from "react";

export const InputBox = ({
	type,
	placeholder,
	className,
}: {
	type: HTMLInputTypeAttribute;
	placeholder: string;
	className: string;
}) => {
	return (
		<input
			type={`${type}`}
			placeholder={`${placeholder}`}
			className={`${className}`}
		/>
	);
};
