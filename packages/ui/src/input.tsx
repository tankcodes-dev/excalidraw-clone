import { HTMLInputTypeAttribute, RefObject } from "react";

export const InputBox = ({
	ref,
	type,
	placeholder,
	className,
}: {
	ref: RefObject<HTMLInputElement | null>;
	type: HTMLInputTypeAttribute;
	placeholder: string;
	className: string;
}) => {
	return (
		<input
			ref={ref}
			type={`${type}`}
			placeholder={`${placeholder}`}
			className={`${className}`}
		/>
	);
};
