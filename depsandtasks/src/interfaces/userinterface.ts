import mongoose, { ObjectId } from "mongoose";
export default interface User {
  username: string;
  password: string;
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
  password: string;
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
export { userDoc, userModel, userData };
