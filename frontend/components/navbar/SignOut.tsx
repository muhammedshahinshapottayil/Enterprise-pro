import { navLinkTypes } from "../../types/intefaces";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOut = ({ href, label, className }: navLinkTypes) => {
  const isActive = new URL(window.location.href).pathname === href;
  const router = useRouter();
  return (
    <li
      onClick={() => {
        signOut();
        localStorage.removeItem("token");
        router.push("/auth/login");
      }}
      className={` ${className} p-2 cursor-pointer hover:bg-blue-950 bg-opacity-20 text-xl py-3 flex no-underline ${
        isActive ? "bg-blue-950 bg-opacity-60" : ""
      }`}
    >
      {label}
    </li>
  );
};

export default SignOut;
