import axiosInstance from "config/axiosConfig/attendanceinstance";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
function AllDepartments() {
  const session:any = useSession();
  const router = useRouter();

  const [Data, setData] = useState<
    {
      _id: { department_id: number; department_name: string };
    }[]
  >([]);
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
    const getAllbyDepartment = async () => {
      try {
        const data = await axiosInstance.get("/");
        setData(data.data.data);
      } catch (error: any) {
        console.error(error);
        error?.response?.data?.errors.forEach(
          (element: { message: string }) => {
            errorToast(element.message);
          }
        );
      }
    };
    
    if (session) getAllbyDepartment();
  }, [session]);

  const move = (id: number) => {
    router.push(
      `/${session?.data?.user?.[0]?.role}/reports/department?id=${id}`
    );
  };

  return (
    <div>
        <ToastContainer/>
      {Data.map(
        ({
          _id,
        }: {
          _id: { department_id: number; department_name: string };
        }) => (
          <div key={_id.department_id}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3 mr-3 ml-3 ">
              <div className="bg-white shadow-md p-4 rounded-md">
                <h2
                  onClick={() => {
                    move(_id.department_id);
                  }}
                  className="text-xl font-semibold mb-2 hover:text-blue-700 transition duration-300 cursor-pointer"
                >
                  {_id.department_name}
                </h2>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default AllDepartments;
