import { attendanceData } from "../interfaces/AttendanceInterface";

const assignTaskUsecase = async (dependancies: any) => {
  const {
    Attendance: { createTask },
  } = dependancies;

  const assignTask = async (data: attendanceData) => {
    try {
      return await createTask(data);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return assignTask;
};

export default assignTaskUsecase;
