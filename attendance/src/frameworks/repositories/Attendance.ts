import { attendanceData } from "../../interfaces/AttendanceInterface";
import AttendanceMdl from "../../models/attendanceMdl";
import { ObjectId } from "mongodb";

const createTask = async ({
  EmpID,
  userId,
  department_name,
  supervisor_name,
  type,
  name,
  department_id,
}: attendanceData) => {
  try {
    const Create = await AttendanceMdl.create({
      EmpID,
      userId,
      department_name,
      supervisor_name,
      type,
      name,
      department_id,
    });
    return Create ? Create : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTodayAttendanceByUser = async ({ id }: { id: ObjectId }) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayEvening = new Date(today);
    todayEvening.setDate(today.getDate() + 1);

    const userExists = await AttendanceMdl.find({
      userId: new ObjectId(id),
      createdAt: {
        $lte: new Date(todayEvening),
        $gte: new Date(today),
      },
    });
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const attendanceBetweenByDepartment = async (department_id: number) => {
  try {
    const userExists = await AttendanceMdl.aggregate([
      {
        $match: { department_id: Number(department_id) },
      },
      {
        $group: {
          _id: {
            department_name: "$department_name",
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
      },
    ]);
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const attendanceBetweenByUser = async (id: ObjectId) => {
  try {
    const userExists = await AttendanceMdl.aggregate([
      {
        $match: { userId: new ObjectId(id) },
      },
      {
        $group: {
          _id: {
            name: "$name",
            type: "$type",
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const attendanceBetweenByUserDetails = async (date: string, id: ObjectId) => {
  try {
    const today = new Date(date);
    today.setUTCHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    const todayEvening = new Date(today);
    todayEvening.setDate(today.getDate() + 1);
    const userExists = await AttendanceMdl.find({
      userId: new ObjectId(id),
      createdAt: {
        $lte: new Date(todayEvening),
        $gte: new Date(today),
      },
    });
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const attendanceBetweenByDepartmentDetails = async (
  date: string,
  department_id: number
) => {
  try {
    const today = new Date(date);
    today.setUTCHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    const todayEvening = new Date(today);
    todayEvening.setDate(today.getDate() + 1);
    const userExists = await AttendanceMdl.find({
      department_id: Number(department_id),
      createdAt: {
        $lte: new Date(todayEvening),
        $gte: new Date(today),
      },
    }).sort({ EmpID: 1 });
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllDepartmentsAttendance = async () => {
  try {
    const userExists = await AttendanceMdl.aggregate([
      {
        $group: {
          _id: {
            department_id: "$department_id",
            department_name: "$department_name",
          },
        },
      },
    ]);
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  createTask,
  getTodayAttendanceByUser,
  getAllDepartmentsAttendance,
  attendanceBetweenByDepartment,
  attendanceBetweenByDepartmentDetails,
  attendanceBetweenByUser,
  attendanceBetweenByUserDetails,
};
