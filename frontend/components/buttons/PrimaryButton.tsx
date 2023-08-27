import React, { ButtonHTMLAttributes } from "react";
type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className children"
>;
type btnType = {
  children: string;
} & ButtonProps;
function Button({ children, ...rest }: btnType) {
  return (
    <button
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-white focus:ring-offset-2"
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
