import mongoose, { ObjectId } from "mongoose";
export default interface Task {
  supervisor_name: string;
  name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  type: String;
  department_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface attendanceModel extends mongoose.Model<attendanceDoc> {
  build(attrs: Task): attendanceDoc;
}

interface attendanceDoc extends mongoose.Document {
  _id: ObjectId;
  supervisor_name: string;
  name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  type: String;
  department_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface attendanceData extends mongoose.Document {
  _id: ObjectId;
  supervisor_name: string;
  name: string;
  department_name: string;
  userId: ObjectId;
  EmpID: number;
  type: String;
  department_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { attendanceDoc, attendanceModel, attendanceData };
