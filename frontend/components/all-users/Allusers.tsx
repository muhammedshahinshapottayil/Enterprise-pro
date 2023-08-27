import instance from "config/axiosConfig/userInstance";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";
import { useState, useEffect } from "react";
import ProfilePicModal from "components/modal/ProfilePicModal";
import Button from "components/buttons/CancelButton";
import ConfirmAlert from "components/buttons/AlertButtons";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
function Allusers() {
  const session: any = useSession();
  const [data, setdata] = useState<any>([]);
  const [modalData, setmodalData] = useState<any | null>(null);
  const [modal, setmodal] = useState<Boolean>(false);

  const { id, department, role, name, department_name } =
    useAppSelector(getUserData).payload;
  const notify = (message: string) => toast(message);

  const onOpen = (item: any) => {
    setmodal(true);
    setmodalData(item);
  };
  const onClose = () => {
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
          ? "/all-users"
          : role == "supervisor"
          ? `/all-users/${department}`
          : ""
      );
      setdata(data.data.data[0]);
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await instance.delete(`/delete-user/${id}`);
      getData();
      notify("Successfully Completed");
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
      {modal && <ProfilePicModal onClose={onClose} modalData={modalData} />}
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Emp ID
                  </th>
                  {role == "admin" && (
                    <th className="px-6 py-4 text-left font-bold text-gray-800">
                      Action
                    </th>
                  )}
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">
                    Attendance Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, i: number) => {
                  return (
                    <tr key={item.id} className="even:bg-gray-300 odd:bg-white">
                      <td className="px-6 py-4 whitespace-no-wrap">{++i}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.department_name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {item.emp_id}
                      </td>
                      {role == "admin" && (
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <ConfirmAlert
                            onClick={() => {
                              deleteUser(item.id);
                            }}
                          >
                            <Button>De-activate</Button>
                          </ConfirmAlert>
                        </td>
                      )}
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
                      <td>
                        <Link
                          href={`/${role}/reports/user?id=${item.id}`}
                        >
                          <FaEye className="hover:text-blue-600" />
                        </Link>
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

export default Allusers;
