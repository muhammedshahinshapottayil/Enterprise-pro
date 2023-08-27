"use client";
import { useSession } from "next-auth/react";
import Input from "../inputs/Input";
import ButtonPrimary from "../buttons/PrimaryButton";
import CancelButton from "../buttons/CancelButton";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { validateEmail, validatePassword } from "utils/patterns";
import { Registration } from "../../types/intefaces";
import Select from "components/inputs/Select";
import { useState, useEffect } from "react";
import axiosAuth from "config/axiosConfig/userInstance";
import DepTaskInstance from "config/axiosConfig/deptaskinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getUserData,
  updateUserData,
} from "../../store/reducers/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import WebCamModal from "components/modal/WebCamModal";

let imgrender = Date.now();

function Register() {
  const session: any = useSession();
  const [deps, setdeps] = useState([]);
  const [scanImage, setscanImage] = useState(false);
  const [imageDescription, setimageDescription] = useState<any[]>([]);
  const [FullimageDescription, setFullimageDescription] = useState<any[]>([]);
  const [userData, setuserDate] = useState({
    ...useAppSelector(getUserData).payload,
  });
  const [selectedFile, setSelectedFile] = useState<string>("https://res.cloudinary.com/diwv5i7fw/image/upload/v1690450980/tosvzy3vfelbsvcjpkhn.png");
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
  const onClose = () => {
    setscanImage(false);
  };
  useEffect(() => {
    if (!Array.isArray(imageDescription) && Array.isArray(FullimageDescription))
      if (imageDescription != undefined && FullimageDescription.length > 0)
        onClose();
  }, [imageDescription, FullimageDescription]);

  useEffect(() => {
    if (session?.data?.user?.[0]?.role == "admin") {
      const getdepartments = async () => {
        try {
          const data = await DepTaskInstance.get("/department");
          setdeps(data.data.data[0]);
        } catch (error: any) {
          console.error(error);
          error?.response?.data?.errors.forEach(
            (element: { message: string }) => {
              errorToast(element.message);
            }
          );
        }
      };
      getdepartments();
    } else if (session?.data?.user?.[0]?.role == "supervisor") {
      const getdepartments = async () => {
        try {
          const data = await DepTaskInstance.get(
            `/department/${userData.department}`
          );
          setdeps(data.data.data[0]);
        } catch (error: any) {
          console.error(error);
          error?.response?.data?.errors.forEach(
            (element: { message: string }) => {
              errorToast(element.message);
            }
          );
        }
      };
      getdepartments();
    }
  }, [session]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmpassword: "",
      role: "",
      profile_image: "",
      address: "",
      mobile: "",
      mobile_2: "",
      department: "",
      type: "",
      unique_id: "",
    },
  });
  const onSubmit: SubmitHandler<Registration> = async (data: Registration) => {
    try {
      const {
        name,
        username,
        password,
        confirmpassword,
        role,
        address,
        mobile,
        mobile_2,
        department,
        type,
        unique_id,
      } = data;
      if (password != confirmpassword) {
        errorToast("Password doesn't match");
        throw "";
      }

      const formData = new FormData();
      formData.append("profile_image", selectedFile);
      formData.append("name", name);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("address", address);
      formData.append("mobile", mobile);
      formData.append("mobile_2", mobile_2);
      formData.append("department", department);
      formData.append("type", type);
      formData.append("unique_id", unique_id);
      formData.append("scan_image", imageDescription.toString());
      await axiosAuth.post("/register", formData);
      setSelectedFile("");
      notify("Registered Successfully");
      setimageDescription([]);
      setFullimageDescription([]);
      reset();
      imgrender = Date.now();
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files: any = e.target.files;
      if (files[0].type === "image/jpeg" || files[0].type === "image/png") {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "enterprise_pro");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/diwv5i7fw/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        setSelectedFile(file.secure_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex justify-center mt-10 mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-6/12 w-full p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Registration Form
          </h2>

          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name:
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="text" />
                      {errors.name && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email:
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true, validate: validateEmail }}
                  render={({ field }) => (
                    <div>
                      <Input required={true} {...field} />
                      {errors.username && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, validate: validatePassword }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="password" />
                      {errors.password && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <Controller
                  name="confirmpassword"
                  control={control}
                  rules={{ required: true, validate: validatePassword }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="password" />
                      {errors.confirmpassword && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.confirmpassword.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Role
                </label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Select {...field}>
                        <option value="">Select a Designation</option>
                        <option value="user">Team Worker</option>
                        <option value="supervisor">Super Visor</option>
                      </Select>
                      {errors.role && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="profile_image"
                  className="block text-sm font-medium text-gray-600"
                >
                  Profile Picture
                </label>
                <div>
                  <input
                    key={imgrender}
                    accept="image/*"
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onChange={handleFileChange}
                    type="file"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="text" />
                      {errors.address && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="Mobile 1"
                  className="block text-sm font-medium text-gray-600"
                >
                  Mobile 1
                </label>
                <Controller
                  name="mobile"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="number" />
                      {errors.mobile && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.mobile.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Mobile 2
                </label>
                <Controller
                  name="mobile_2"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="number" />
                      {errors.mobile_2 && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.mobile_2.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-600"
                >
                  Department
                </label>
                <Controller
                  name="department"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Select {...field}>
                        <option value="">Select a department</option>
                        {deps.map((item: { id: number; name: string }) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                      {errors.department && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.department.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-600"
                >
                  Type of ID
                </label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Select {...field}>
                        <option value="">Select a Type</option>
                        <option value="Driving Licence">Driving Licence</option>
                        <option value="Aadhar Cart">Adhar Cart</option>
                      </Select>
                      {errors.type && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.type.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="Unique ID"
                  className="block text-sm font-medium text-gray-600"
                >
                  Unique ID
                </label>
                <Controller
                  name="unique_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="text" />
                      {errors.unique_id && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.unique_id.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-600"
                >
                  Scan Image
                </label>
                <div className="flex justify-items-start items-center mt-2">
                  <p
                    onClick={open}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                  >
                    Start
                  </p>
                </div>
              </div>
            </div>
            <div>
              {/* <div className="mb-4">
                <label
                  htmlFor="Unique ID"
                  className="block text-sm font-medium text-gray-600"
                >
                  Unique ID
                </label>
                <Controller
                  name="unique_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="text" />
                      {errors.unique_id && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.unique_id.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div> */}
            </div>
          </div>
          <div className="mb-4">
            <ButtonPrimary type="submit">Sign in </ButtonPrimary>
            <CancelButton
              type="reset"
              onClick={() => {
                setSelectedFile("");
                reset();
              }}
            >
              Cancel
            </CancelButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
