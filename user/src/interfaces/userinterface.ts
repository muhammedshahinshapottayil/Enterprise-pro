import mongoose, { ObjectId } from "mongoose";
export default interface User {
  username: string;
  password: Buffer | string;
  role?: string;
  forgetPassword?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface userModel extends mongoose.Model<userDoc> {
  build(attrs: User): userDoc;
}

interface userDoc extends mongoose.Document {
  _id: ObjectId;
  username: string;
  password: Buffer | string;
  role?: string;
  forgetPassword?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface userData extends mongoose.Document {
  _id: ObjectId;
  username: string;
  password?: string;
  role?: string;
  forgetPassword?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserData {
  name: string;
  username: string;
  password: Buffer | string;
  role: string;
  profile_image?: string;
  scan_image?: string;
  department: string;
  department_name?: string;
  emp_id:number
  personal_details: {
    address: string;
    mobile: string;
    mobile_2?: string;
    unique_identification_number: {
      type: string;
      unique_id: string;
    };
  };
}

interface initialSignupData {
  name: string;
  username: string;
  password: Buffer | string;
  role?: string;
  profile_image?: string;
  scan_image?: string;
  department: string;
  department_name?: string;
  address?: string;
  mobile: string;
  mobile_2?: string;
  type?: string;
  unique_id?: string;
}

export { userDoc, userModel, userData, UserData, initialSignupData };
