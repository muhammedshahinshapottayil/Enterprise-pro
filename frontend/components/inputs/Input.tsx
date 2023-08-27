import { InputProps } from "../../types/intefaces";
function Input({ ...rest }: InputProps) {
  return (
    <input
      className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      {...rest}
    />
  );
}
export default Input;
