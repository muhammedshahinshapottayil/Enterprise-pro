import { ObjectId } from "mongodb";

const todaysAttendanceUsecase = async (dependancies: any) => {
  const {
    Attendance: { getTodayAttendanceByUser },
  } = dependancies;
  const allusers = async ({ id }: { id: ObjectId }) => {
    try {
      return await getTodayAttendanceByUser({ id });
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return allusers;
};

export default todaysAttendanceUsecase;
