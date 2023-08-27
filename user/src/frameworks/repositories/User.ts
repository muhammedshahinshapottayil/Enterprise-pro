import { UserData } from "../../interfaces/userinterface";
import User from "../../models/userMdl";
import { ObjectId } from "mongodb";

const getUserbyusername = async (username: string) => {
  try {
    const data = await User.findOne({ username });
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createUser = async ({
  name,
  username,
  password,
  role,
  profile_image,
  scan_image,
  department,
  department_name,
  personal_details,
  emp_id,
}: UserData) => {
  try {
    const userCreate = await User.create({
      name,
      username,
      password,
      role,
      profile_image,
      scan_image,
      department,
      department_name,
      personal_details,
      emp_id,
    });
    return userCreate ? userCreate : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findValidUser = async ({ username }: { username: string }) => {
  try {
    const user = await User.findOne(
      {
        username,
        status: true,
      },
      { scan_image: 0 }
    );
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const userByid = async (id: ObjectId) => {
  try {
    const userExists = await User.findById({ id });
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllUsers = async () => {
  try {
    const data = await User.find({ status: true, role: { $ne: "admin" } });
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getMaxEmpId = async () => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: null,
          maxKey: { $max: "$emp_id" },
        },
      },
    ]);
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getDataNotAssigned = async ({
  data: arrayOfIds,
  id,
}: {
  data: [{ data: ObjectId[] }];
  id: number;
}) => {
  try {
    const array =
      arrayOfIds?.[0]?.data.map((item) => new ObjectId(item.id)) ?? [];
    const data = await User.aggregate([
      {
        $match: {
          department: Number(id),
          role: "user",
          status: true,
          _id: { $nin: array },
        },
      },
      {
        $project: { userId: "$id", name: 1, emp_id: 1 },
      },
    ]);
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const checkExistingSupervisor = async (department: number) => {
  try {
    const data = await User.findOne({ department, role: "supervisor" });
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUser = async (id: string) => {
  try {
    const user = await User.deleteOne({
      _id: new ObjectId(id),
      status: true,
    });
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllUsersByDepartment = async (department: number) => {
  try {
    const data = await User.find({
      department,
      status: true,
      role: { $ne: "admin" },
    });
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  getUserbyusername,
  createUser,
  findValidUser,
  userByid,
  getAllUsers,
  getMaxEmpId,
  getDataNotAssigned,
  checkExistingSupervisor,
  deleteUser,
  getAllUsersByDepartment,
};
