import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  Dispatch,
  SetStateAction,
} from "react";

export interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}
export interface layoutProp {
  children: React.ReactNode;
}
export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> &
  extraProps;
interface extraProps {
  value: string | number | readonly string[] | undefined;
}
export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className"
> &
  extraProps;
interface extraProps {
  value: string | number | readonly string[] | undefined;
}

export interface userDataState {
  userData: any;
}

export interface userDataPayload {
  type: string;
  details?: any;
}

export interface navLinkTypes {
  href: string;
  label: string;
  className?: string;
}

export interface HomePageProps {
  data: any;
}

export interface Registration {
  username: string;
  password: string;
  name: string;
  confirmpassword: string;
  role: string;
  profile_image: any;
  address: string;
  mobile: string;
  mobile_2: string;
  department: string;
  type: string;
  unique_id: string;
}

export interface UserTask {
  EmpID: number;
  createdAt: string;
  data: {
    name: string;
    emp_id: number;
    checked: boolean;
    task_id: number;
    task_name: string;
    updates: Update[];
  }[];
  department_id: number;
  department_name: string;
  id: string;
  supervisor_name: string;
  updatedAt: string;
  userId: string;
}
export interface Update {
  title: string;
  timestamp: Date;
  _id: string;
}
export interface AttendanceEmployee {
  _id: string;
  userId: string;
  name: string;
  EmpID: number;
  department_name: string;
  department_id: number;
  type: "in" | "out" | string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export type SetStateType<T> = Dispatch<SetStateAction<T>>;
