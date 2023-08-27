import instance from "config/axiosConfig/task";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";
import { useState, useEffect } from "react";
import { UserTask } from "../../types/intefaces";
import TaskTableModal from "components/modal/TaskTableModal";

function UserAllTasks() {
  const session: any = useSession();
  const [data, setdata] = useState<UserTask[]>([]);
  const [modalData, setmodalData] = useState<UserTask["data"] | null>(null);
  const [modal, setmodal] = useState<Boolean>(false);

  const { id, department, role, name, department_name } =
    useAppSelector(getUserData).payload;

  const onOpen = (item: UserTask) => {
    setmodal(true);
    setmodalData(item.data);
  };
  const onClose = (item: UserTask) => {
    setmodal(false);
    setmodalData(null);
  };

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

  const getData = async () => {
    try {
      const data = await instance.get(
        role == "admin"
          ? "/task"
          : role == "supervisor"
          ? `/task/all/department/${department}`
          : ""
      );
      setdata(data.data.data);
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-10">
      <ToastContainer />
      {modal && <TaskTableModal onClose={onClose} modalData={modalData} />}
      <div className="flex justify-center">
        <div className="w-full sm:w-2/3 lg:w-3/4 xl:w-5/6">
          <div className="overflow-hidden rounded-lg shadow table-responsive">
            <table className="min-w-full bg-white ">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Sl No
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Supervisor
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: UserTask, i: number) => {
                  return (
                    <tr key={item.id} className="even:bg-gray-300 odd:bg-white">
                      <td className="px-6 py-4 whitespace-no-wrap">{++i}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.department_name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.supervisor_name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {new Date(item.createdAt).toLocaleString(undefined, {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <button
                          className="inline-block px-4 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg"
                          onClick={() => {
                            onOpen(item);
                          }}
                        >
                          More
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAllTasks;
