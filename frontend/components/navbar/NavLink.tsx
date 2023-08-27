import Link from "next/link";
import { navLinkTypes } from "../../types/intefaces";

const NavLink = ({ href, label, className }: navLinkTypes) => {
  const isActive = new URL(window.location.href).pathname === href;
  return (
    <Link href={href}>
      <li
        className={` ${className} p-2 cursor-pointer hover:bg-blue-950 bg-opacity-20 text-xl py-3 flex no-underline ${
          isActive ? "bg-blue-950 bg-opacity-60" : ""
        }`}
      >
        {label}
      </li>
    </Link>
  );
};

export default NavLink;
