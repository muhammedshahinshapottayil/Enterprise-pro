import AxiosAuth from "config/axiosConfig/task";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Input from "components/inputs/Input";
import PrimaryButton from "components/buttons/PrimaryButton";
import CancelButton from "components/buttons/CancelButton";
function Usertaskview() {
  const instance = AxiosAuth();
  const session: any = useSession();
  const [datas, setdatas] = useState<any>([]);
  const [update, setupdate] = useState<string>("");

  const { id, department, role, name, department_name } =
    useAppSelector(getUserData).payload;

  useEffect(() => {
    if (session?.data?.user?.[0]?.role) clearAll();
  }, [session]);

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

  const getTodaysTask = async () => {
    try {
      const data = await instance.get(
        session?.data?.user?.[0]?.role == "user"
          ? `/task/user/${id}/department/${department}`
          : ""
      );
      setdatas(data.data.data[0]);
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };
  const addUpdatesTask = async () => {
    try {
      if (update.trim())
        await instance.post("/task/update", {
          id: datas[0].id,
          title: update,
          user: datas?.[0]?.data?.[0]?.id,
        });

      notify("Successfully Completed");
      clearAll();
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };
  const clearAll = () => {
    setupdate("");
    getTodaysTask();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <ToastContainer />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  {role == "user" ? name : datas[0]?.data?.[0]?.name}
                </h1>
                <p className="text-gray-500">
                  Department :
                  {role == "user" ? department_name : datas[0]?.department_name}
                </p>
              </div>
            </div>
            <div className="text-gray-600 mt-5">
              <p>Task : {datas[0]?.data?.[0]?.task_name}</p>
            </div>
            <div className="text-gray-600 mt-5">
              <Input
                placeholder="Enter Updates"
                onChange={(e) => setupdate(e.target.value)}
                value={update}
              />
              <div className="mt-4">
                <PrimaryButton onClick={addUpdatesTask}>Submit</PrimaryButton>
                <CancelButton onClick={clearAll}>Cancel</CancelButton>
              </div>
            </div>
            <div className="justify-center mt-6">
              {datas[0]?.data?.[0]?.updates.map((item: any) => {
                return (
                  <div key={item.timestamp}>
                    <p className="text-gray-500">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </p>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usertaskview;
