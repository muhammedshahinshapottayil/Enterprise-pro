"use client";
import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { useMemo } from "react";
import { Department, TASKS } from "components/React Table Columns/Columns";
import Instance from "config/axiosConfig/deptaskinstance";
import Tab from "components/tabs/Tabs";
import { TiEdit, TiDelete } from "react-icons/ti";
import DepartmentComp from "./Department";
import TaskComp from "./Task";
import { useSession } from "next-auth/react";
import ConfirmAlert from "components/buttons/AlertButtons";
import {
  getUserData,
  updateUserData,
} from "../../store/reducers/userDataSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useRouter } from "next/navigation";
function DepartmentTask() {
  const session: any = useSession();
  const [userData, setuserDate] = useState({
    ...useAppSelector(getUserData).payload,
  });
  const [selected, setselected] = useState(
    session?.data?.user?.[0]?.role == "admin" ? "department" : "tasks"
  );
  const [changedDep, setchangedDep] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [changeTask, setchangeTask] = useState<{
    id: number;
    name: string;
    fk_department: number;
    status: number;
    created_at: string;
  } | null>(null);

  const [department, setdepartment] = useState([]);
  const [task, settask] = useState([]);
  const router = useRouter();

  const getDepartment = async () => {
    try {
      let data;
      if (session?.data?.user?.[0]?.role != "admin")
        data = await Instance.get(`/department/${userData.department}`);
      else data = await Instance.get("/department");
      setdepartment(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const data = await Instance.get(
        `/task/department/${userData.department}`
      );
      settask(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (session?.data?.user?.[0]?.role == "user") router.push("/user");

    if (session?.data) {
      getDepartment();
      getTasks();
    }
  }, [session.data]);

  const columns: any = useMemo(() => {
    if (selected === "department") return Department;
    else if (selected === "tasks") return TASKS;
  }, [selected]);

  const data: any = useMemo(() => {
    if (selected === "department") return department;
    else if (selected === "tasks") return task;
  }, [selected, department, task]);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["id", "fk_department"],
      },
    },
    useGlobalFilter
  );
  const EditDepData = (data: { id: number; name: string }) => {
    setselected("tasks");
    setchangedDep(data);
    setTimeout(() => {
      setselected("department");
    }, 1);
  };

  const deleteDepData = async (data: { id: number; name: string }) => {
    try {
      await Instance.delete(`/department/${data.id}`);
      getDepartment();
    } catch (error) {
      console.error(error);
    }
  };

  const EditTaskData = (data: {
    id: number;
    name: string;
    fk_department: number;
    status: number;
    created_at: string;
  }) => {
    setselected("department");
    setchangeTask(data);
    setTimeout(() => {
      setselected("tasks");
    }, 1);
  };

  const deleteTaskData = async (data: {
    id: number;
    name: string;
    fk_department: number;
    status: number;
    created_at: string;
  }) => {
    try {
      await Instance.delete(`/task/${data.id}`);
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 mt-3 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4">
          {selected == "department" && changedDep ? (
            <DepartmentComp
              changedDep={changedDep}
              setchangedDep={setchangedDep}
              getDepartment={getDepartment}
              setselected={setselected}
            />
          ) : selected == "department" && !changedDep ? (
            <DepartmentComp
              changedDep={changedDep}
              setchangedDep={setchangedDep}
              getDepartment={getDepartment}
              setselected={setselected}
            />
          ) : selected == "tasks" && changeTask ? (
            <TaskComp
              setchangeTask={setchangeTask}
              changeTask={changeTask}
              department={department}
              getTasks={getTasks}
              setselected={setselected}
            />
          ) : selected == "tasks" && !changeTask ? (
            <TaskComp
              changeTask={changeTask}
              setchangeTask={setchangeTask}
              department={department}
              getTasks={getTasks}
              setselected={setselected}
            />
          ) : (
            ""
          )}
        </div>
        <div className="bg-gray-200 p-4">
          <div className="border-b border-gray-200">
            <div className="container mx-auto">
              {session?.data?.user?.[0]?.role == "admin" && (
                <div className="flex">
                  <div>
                    <Tab
                      onClick={() => {
                        setselected("department");
                      }}
                      label="Department"
                    />
                  </div>
                  <div>
                    <Tab
                      onClick={() => {
                        setselected("tasks");
                      }}
                      label="Task"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table
                {...getTableProps()}
                className="min-w-full text-left text-sm font-light"
              >
                <thead className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      <th>Sl No</th>
                      {headerGroup.headers.map((column) => (
                        <th key={column.id} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        className={
                          i % 2 === 1
                            ? `border-b bg-white dark:border-neutral-500 dark:bg-neutral-600`
                            : `border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700`
                        }
                        {...row.getRowProps()}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {++i}
                        </td>
                        {row.cells.map((cell) => (
                          <td
                            className="whitespace-nowrap px-6 py-4"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                        <td>
                          <TiEdit
                            color="blue"
                            onClick={() =>
                              selected == "department"
                                ? EditDepData(row?.allCells?.[0].row.original)
                                : EditTaskData(row?.allCells?.[0].row.original)
                            }
                          >
                            Edit
                          </TiEdit>
                          <ConfirmAlert
                            onClick={() =>
                              selected == "department"
                                ? deleteDepData(row?.allCells?.[0].row.original)
                                : deleteTaskData(
                                    row?.allCells?.[0].row.original
                                  )
                            }
                          >
                            <TiDelete color="red" />
                          </ConfirmAlert>
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
  );
}

export default DepartmentTask;
