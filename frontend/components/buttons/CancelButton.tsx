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
      className="w-full mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-gray-500 focus:ring-offset-white focus:ring-offset-2"
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
