import { ObjectId } from "mongodb";

const allUsersUsecase = async (dependancies: any) => {
  const {
    Attendance: { attendanceBetweenByUser },
  } = dependancies;
  const allusers = async (id: ObjectId) => {
    try {
      return await attendanceBetweenByUser(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return allusers;
};

export default allUsersUsecase;
