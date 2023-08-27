import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Tab from "components/tabs/Tabs";
import instance from "config/axiosConfig/task";
import DepTaskinstance from "config/axiosConfig/deptaskinstance";
import ButtonPrimary from "../buttons/PrimaryButton";
import CancelButton from "../buttons/CancelButton";
import Select from "components/inputs/Select";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TaskAssign() {
  const session: any = useSession();
  const {
    id,
    emp_id,
    name,
    department: userdep,
  } = useAppSelector(getUserData).payload;

  const [depname, setdepname] = useState<null | string>("");
  const [taskname, settaskname] = useState<null | string>("");
  const [assigned, setassigned] = useState([]);
  const [notassigned, setnotassigned] = useState([]);
  const [selected, setselected] = useState("notassigned");
  const [task, settask] = useState([]);
  const [datas, setdatas] = useState<any>([]);
  const [deps, setdeps] = useState([]);
  const [department, setdepartment] = useState<number | null>(null);
  const [tasks, settasks] = useState<number | null>(null);

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
    setdatas(selected == "assigned" ? assigned : notassigned);
  }, [selected, assigned, notassigned]);

  useEffect(() => {
    getDepartment();
  }, []);

  useEffect(() => {
    let getdata: any;
    department &&
      (getdata = setTimeout(() => {
        getPeople(department);
        getTasks(department);
      }, 600));
    return () => clearTimeout(getdata);
  }, [department]);

  const getPeople = async (department: number) => {
    try {
      const data = await instance.get(`/task/department/${department}`);
      setassigned(data.data.data[0].assigned);
      setnotassigned(data.data.data[0].not_assigned);
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const getDepartment = async () => {
    try {
      const data = await DepTaskinstance.get(
        session?.data?.user?.[0]?.role == "admin"
          ? "/department"
          : `/department/${userdep}`
      );
      setdeps(data.data.data[0]);
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const getTasks = async (id: number) => {
    try {
      setdepartment(id);
      const data = await DepTaskinstance.get(`/task/department/${id}`);
      settask(data.data.data[0]);
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const handleCheckboxChange = (e: any, item: any) => {
    item.checked = e.target.checked;
    setdatas([...datas]);
  };

  const handleDepartmentChange = (e: any) => {
    setdepartment(Number(e.target.value));
    setdepname(e.target.options[e.target.selectedIndex].text);
  };

  const handleTaskChange = (e: any) => {
    settasks(Number(e.target.value));
    settaskname(e.target.options[e.target.selectedIndex].text);
  };

  const assignData = async () => {
    try {
      const notassignedData = notassigned.filter((item: any) => item.checked);
      const assignedData = assigned.filter((item: any) => !item.checked);

      if (
        notassignedData.length ||
        (assignedData.length && department && task)
      ) {
        await instance.post("/task/assign", {
          data: notassignedData,
          assignedData: assignedData,
          supervisor_name: name,
          department_id: department,
          task_id: tasks,
          task_name: taskname,
          department_name: depname,
          userId: id,
          EmpID: emp_id,
        });
        notify("Successfully Completed");
        clearAll();
      }
    } catch (error: any) {
      console.error(error);
      error?.response?.data?.errors.forEach((element: { message: string }) => {
        errorToast(element.message);
      });
    }
  };

  const clearAll = () => {
    setdepname("");
    settaskname("");
    setassigned([]);
    setnotassigned([]);
    settask([]);
    setdatas("");
    setdepartment(null);
    settasks(null);
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-5 mt-3 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4">
            <h1 className="p-2">
              <b>Assign Task</b>
            </h1>
            <Select
              onChange={(e) => {
                handleDepartmentChange(e);
              }}
              value={department ?? ""}
            >
              <option value="">Select Department</option>
              {deps.map((item: any) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>

            <Select
              onChange={(e) => {
                handleTaskChange(e);
              }}
              value={tasks ?? ""}
            >
              <option value="">Select Tasks</option>
              {task.map((item: any) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <div className="mt-3">
              <ButtonPrimary onClick={assignData}>Submit</ButtonPrimary>
              <CancelButton onClick={clearAll}>Cancel</CancelButton>
            </div>
          </div>
          <div className="bg-gray-200 p-4">
            <div className="border-b border-gray-200">
              <div className="container mx-auto">
                <div className="flex">
                  <Tab
                    onClick={() => {
                      setselected("assigned");
                    }}
                    label="Assigned"
                  />
                  <Tab
                    onClick={() => {
                      setselected("notassigned");
                    }}
                    label="Not Assigned"
                  />
                </div>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th>Sl No</th>
                      <th>Emp ID</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.length > 0 &&
                      datas.map((item: any, i: number) => {
                        return (
                          <tr
                            key={item._id}
                            className={
                              i % 2 === 1
                                ? `border-b bg-white dark:border-neutral-500 dark:bg-neutral-600`
                                : `border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700`
                            }
                          >
                            <td>{++i}</td>
                            <td>{item.emp_id}</td>
                            <td>{item.name}</td>
                            <td>
                              <input
                                className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                                type="checkbox"
                                aria-label="..."
                                checked={item.checked}
                                onClick={(e) => {
                                  handleCheckboxChange(e, item);
                                }}
                              />
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
      </div>
    </div>
  );
}

export default TaskAssign;
