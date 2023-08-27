import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavLink from "./NavLink";
import SignOut from "./SignOut";
import Link from "next/link";
import { useSession } from "next-auth/react";
function NavBar() {
  const [nav, setNav] = useState<Boolean>(false);
  const [role, setRole] = useState<string>("");
  const session: any = useSession();
  useEffect(() => {
    if (!role) setRole(session?.data?.user?.[0]?.role);
  }, [session]);

  const toggleNav = () => {
    setNav(!nav);
  };
  return (
    <div className=" w-full flex justify-between bg-blue-950 items-center p-2  text-white z-10">
      <div className="flex items-center ">
        <NavLink label="" href={""} />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Enterprise <span className="font-bold">Pro</span>
        </h1>

        <div className="hidden lg:flex items-center ms-5 p-1 text-[18px]"></div>
      </div>

      {nav && (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      )}

      <div className="sm:flex items-center ms-5 p-1 text-[18px]">
        <NavLink
          label=""
          href="/provider/register"
          className="p-2 hidden sm:flex"
        />
        {role != "user" ? (
          <p className="p-2 hidden sm:flex">
            <Link href={`/${role}/register`}>Registration</Link>
          </p>
        ) : (
          ""
        )}
        <NavLink label="" href="/auth/login" className="p-2 hidden sm:flex" />
        <p className="p-2 hidden sm:flex">
          <Link href={`/${role}`}>Home</Link>
        </p>
        <div onClick={toggleNav} className="cursor-pointer ms-5">
          <AiOutlineMenu size={30} />
        </div>
      </div>
      <div
        className={`sidebar fixed top-0 ${
          nav ? "right-0" : "left-[-100%]"
        } w-[300px] h-screen text-white bg-blue-900 z-10 duration-300`}
      >
        <AiOutlineClose
          onClick={toggleNav}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Enterprise <span className="font-bold">Pro</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-white list-none ">
            <div className=" lg:hidden flex items-center ms-5 p-1 text-[18px]"></div>
            {/* {role != "user" ? (
              <li className="no-underline text-xl py-4 flex cursor-pointer lg:hidden">
                <BsPersonGear size={25} className="mr-4" />
                <Link href={`/${role}/register`}>Registration</Link>
              </li>
            ) : (
              ""
            )} */}

            <NavLink href={`/${role}`} label="Home" />
            {role != "user" && (
              <div>
                <NavLink href={`/${role}/register`} label="Registration" />
                <NavLink href={`/${role}/assign-task`} label="Assign Task" />
                <NavLink href={`/${role}/all-users`} label="All Users" />
                <NavLink
                  href={`/${role}/department&task`}
                  label="Department & Task"
                />
                <NavLink href={`/${role}/all-tasks`} label="All Task" />

                {/* <li className="relative group">
                  <div>
                  </div>
                  <ul className="hidden absolute left-1/2 transform -translate-x-1/2 mt-2 py-2 bg-white rounded-md shadow-lg group-hover:block">
                    <li className="px-4 py-2 hover:bg-blue-400">Option 1</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Option 2</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Option 3</li>
                  </ul>
                </li> */}
              </div>
            )}

            {role == "admin" && (
              <NavLink
                href={`/${role}/reports/all-departments`}
                label="Attendance Reports"
              />
            )}
            {role == "supervisor" && (
              <NavLink
                href={`/${role}/reports/department`}
                label="Attendance Reports"
              />
            )}

            {role == "user" && (
              <div>
                <NavLink
                  href={`/${role}/reports/user`}
                  label="Attendance Reports"
                />
                <NavLink href={`/${role}/Usertaskview`} label="Todays Task" />
              </div>
            )}
            {
              <div>
                <NavLink href={`/${role}/profile`} label="Profile" />
                <NavLink href={`/${role}/chats`} label="Chats" />
              </div>
            }

            <SignOut href="" label="Sign out" />
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
