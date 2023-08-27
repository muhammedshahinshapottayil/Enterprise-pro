"use client";
import axiosInstance from "config/axiosConfig/attendanceinstance";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { getUserData } from "store/reducers/userDataSlice";
import { useAppSelector } from "store/store";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import ReactPaginate from "react-paginate";
import { FaEye } from "react-icons/fa";
import { AttendanceEmployee } from "types/intefaces";

function Page() {
  const router = useRouter();
  const searchParams: any = useSearchParams();
  const date = searchParams.get("date");
  const dep = searchParams.get("dep");
  const session = useSession();
  const [Data, setData] = useState<AttendanceEmployee[]>([]);
  const { role, department } = useAppSelector(getUserData).payload;

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
        const data = await axiosInstance.get(
          `/all/department-details/${
            role == "admin" ? dep : department
          }/${date}`
        );
        setData(data.data.data[0]);
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

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "EmpID", accessor: "EmpID" },
      { Header: "Department Name", accessor: "department_name" },
      { Header: "Type", accessor: "type" },
      { Header: "Date", accessor: "createdAt" },
    ],
    []
  );

  const data = useMemo(() => Data, [Data]);

  // Create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Define pagination properties
  const itemsPerPage = 10;
  const pageCount = Math.ceil(rows.length / itemsPerPage);

  return (
    <div className="flex items-center justify-center  ">
      <div className=" p-4 rounded-lg">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <ToastContainer />
            <table
              {...getTableProps()}
              className="min-w-full text-left text-sm font-light border border-gray-200 divide-y divide-gray-200"
            >
              <thead className="bg-white dark:bg-neutral-600">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    <th>#</th>
                    {headerGroup.headers.map((column) => (
                        <th
                        {...column.getHeaderProps()}
                        className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                        <td>{++index}</td>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="px-4 py-3">
                          {cell.render("Cell")}
                        </td>
                      ))}
                      <td>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              containerClassName={"pagination mt-4 flex justify-center"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
