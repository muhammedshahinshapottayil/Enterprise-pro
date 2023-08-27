import mongoose, { ObjectId } from "mongoose";
export default interface Task {
  data: Employee[];
  supervisor_name: string;
  department_id: number;
  task_id: number;
  task_name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  createdAt?: Date;
  updatedAt?: Date;
  assignedData?: Employee[];
}

interface taskModel extends mongoose.Model<taskDoc> {
  build(attrs: Task): taskDoc;
}

interface taskDoc extends mongoose.Document {
  _id: ObjectId;
  data: Employee[];
  supervisor_name: string;
  department_id: number;
  task_id: number;
  task_name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  createdAt?: Date;
  updatedAt?: Date;
  assignedData?: Employee[];
}

interface taskData extends mongoose.Document {
  _id: ObjectId;
  data: Employee[];
  assignedData?: Employee[];
  supervisor_name: string;
  department_id: number;
  task_id: number;
  task_name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Update {
  title: string;
  timestamp: Date;
}

interface Employee {
  _id: string;
  name: string;
  emp_id: number;
  checked: boolean;
  task_id?: number;
  task_name?: string;
  updates: Update[];
}

interface TaskData {
  data: Employee[];
  supervisor_name: string;
  department_id: number;
  task_id: number;
  task_name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  createdAt?: Date;
  updatedAt?: Date;
  assignedData?: Employee[];
}

export { taskDoc, taskModel, TaskData, taskData };
