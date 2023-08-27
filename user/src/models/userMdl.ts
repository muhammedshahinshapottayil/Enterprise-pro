import mongoose from "mongoose";
import UserInterface, { userModel, userDoc } from "../interfaces/userinterface";
const user = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    forgetPassword: { type: String },
    status: { type: Boolean, default: true },
    profile_image: { type: String, required: true },
    scan_image: { type: String, required: true },
    emp_id: { type: Number, required: true },
    department: { type: Number, required: true },
    department_name: { type: String, required: true },
    personal_details: {
      address: { type: String, required: true },
      mobile: { type: String, required: true },
      mobile_2: { type: String },
      unique_identification_number: {
        type: { type: String, required: true },
        unique_id: { type: String, required: true },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: UserInterface, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

user.statics.build = (attrs: UserInterface) => {
  return new User(attrs);
};
const User = mongoose.model<userDoc, userModel>("users", user);
export default User;
