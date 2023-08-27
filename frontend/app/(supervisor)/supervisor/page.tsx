"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "store/store";
import { useEffect } from "react";
import { getUserData, updateUserData } from "store/reducers/userDataSlice";
import axios from "config/axiosConfig/userInstance";
import WebCamAttendance from "components/face recognition/WebCamAttendance";
import { ChatState } from "Context/ChatProvider";

const Page = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { setUser }: any = ChatState();
  const setContextData = () => {
    setUser(session.data?.user?.[0]?.userExists);
    if (session.data?.user?.[0]?.accessToken) {
      localStorage.setItem(
        "token",
        JSON.stringify(session.data?.user?.[0]?.accessToken)
      );
    }
  };
  useEffect(() => {
    dispatch(
      updateUserData({
        type: "addData",
        payload: session.data?.user?.[0]?.userExists,
      })
    );
    setContextData();
  }, [session]);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <button className=" rounded-md shadow-md">
          <WebCamAttendance />
        </button>
      </div>
     
      <div className="flex flex-wrap">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden container mx-auto px-4">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Card Title
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                placerat condimentum dui ac fringilla.
              </p>
              <a href="#" className="text-blue-500 font-semibold mt-2">
                Read More
              </a>
            </div>
          </div>
        </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden container mx-auto px-4">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Card Title
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                placerat condimentum dui ac fringilla.
              </p>
              <a href="#" className="text-blue-500 font-semibold mt-2">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden container mx-auto px-4">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Card Title
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                placerat condimentum dui ac fringilla.
              </p>
              <a href="#" className="text-blue-500 font-semibold mt-2">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden container mx-auto px-4">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Card Title
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                placerat condimentum dui ac fringilla.
              </p>
              <a href="#" className="text-blue-500 font-semibold mt-2">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden container mx-auto px-4">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Card Title
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                placerat condimentum dui ac fringilla.
              </p>
              <a href="#" className="text-blue-500 font-semibold mt-2">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
