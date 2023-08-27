import { ObjectId } from "mongodb";

const getTaskbyTaskUsecase = async (dependancies: any) => {
  const {
    Attendance: { attendanceBetweenByUserDetails },
  } = dependancies;

  const signin = async (date: string, id: ObjectId) => {
    try {
      return await attendanceBetweenByUserDetails(date, id);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signin;
};

export default getTaskbyTaskUsecase;
