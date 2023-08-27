import { Types } from "mongoose";
import User from "../models/userMdl";
export default async (id: Types.ObjectId) => {
  try {
    return await User.findById({ _id: id }).select("-password");
  } catch (error) {
    console.log(error);
    return false;
  }
};
