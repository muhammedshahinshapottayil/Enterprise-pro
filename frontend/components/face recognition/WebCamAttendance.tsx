"use client";
import { useSession } from "next-auth/react";
import ButtonPrimary from "../buttons/PrimaryButton";
import { useState, useEffect } from "react";
import AttendanceAuth from "config/axiosConfig/attendanceinstance";
import axiosAuth from "config/axiosConfig/userInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getUserData,
  updateUserData,
} from "../../store/reducers/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import WebCamModal from "components/modal/WebCamModal";
import { createMatcher } from "utils/faceUtils";
let faceMatcher: any;
function WebCamAttendance() {
  const session: any = useSession();
  const [scanImage, setscanImage] = useState(false);
  const [imageDescription, setimageDescription] = useState<any[]>([]);
  const [FullimageDescription, setFullimageDescription] = useState<any[]>([]);
  const [allUsers, setallUsers] = useState<any[]>([]);

  const [userData, setuserDate] = useState({
    ...useAppSelector(getUserData).payload,
  });

  const notify = (message: string) => toast(message);
  const errorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const getAllusers = async () => {
      try {
        const data = await axiosAuth.get("/all-users");
        setallUsers(data.data.data[0]);
      } catch (error: any) {
        console.error(error);
        error?.response?.data?.errors.forEach(
          (element: { message: string }) => {
            errorToast(element.message);
          }
        );
      }
    };
    getAllusers();
  }, []);

  const assignAttendance = async (data: any) => {
    try {
      console.log(data);
      
      AttendanceAuth.get(`/todays/user/${data.id}`).then(async (datas) => {
        const type = datas?.data?.data?.[0]?.[0]?.type == "in" ? "out" : "in";
        if (scanImage && datas?.data?.data?.[0].length == 0) {
          await AttendanceAuth.post("/assign", {
            department_id: data.department,
            type: type,
            userId: data.id,
            name: data.name,
            department_name: data.department_name,
            EmpID: data.emp_id,
          });
          notify(`MR ${data.name} YOUR IN ATTENDANCE IS REGISTERED`);
          setscanImage(false);
          onClose();
        } else if (scanImage && datas?.data?.data?.[0].length == 1) {
          await AttendanceAuth.post("/assign", {
            department_id: data.department,
            type: type,
            userId: data.id,
            name: data.name,
            department_name: data.department_name,
            EmpID: data.emp_id,
          });
          notify(`MR ${data.name} YOUR OUT ATTENDANCE IS REGISTERED`);
          setscanImage(false);
          onClose();
        }
      });
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
    onClose();
  };

  useEffect(() => {
    const filterMatcher = () => {
      faceMatcher = createMatcher(allUsers);
    };
    if (userData && allUsers.length > 0) filterMatcher();
  }, [allUsers, userData]);

  const onClose = () => {
    setscanImage(false);
  };
  useEffect(() => {
    if (!Array.isArray(imageDescription) && Array.isArray(FullimageDescription))
      if (imageDescription != undefined && FullimageDescription.length > 0) {
        const bestMatch = faceMatcher.findBestMatch(imageDescription);
        if (bestMatch._label != "unknown") {
          const filteredData = allUsers.find(
            (item: any) => item.id == bestMatch._label
          );
          if (filteredData) assignAttendance(filteredData);
        }
      }
  }, [imageDescription, FullimageDescription]);

  const open = () => {
    setscanImage(true);
    setimageDescription([]);
    setFullimageDescription([]);
  };
  return (
    <div>
      <ToastContainer />
      {scanImage && (
        <WebCamModal
          setimageDescription={setimageDescription}
          setFullimageDescription={setFullimageDescription}
          onClose={onClose}
          imageDescription={imageDescription}
          FullimageDescription={FullimageDescription}
        />
      )}
      <ButtonPrimary
        onClick={() => {
          open();
        }}
      >
        Start
      </ButtonPrimary>
    </div>
  );
}

export default WebCamAttendance;
