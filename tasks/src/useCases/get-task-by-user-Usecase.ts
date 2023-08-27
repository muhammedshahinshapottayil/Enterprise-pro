import { ObjectId } from "mongodb";

const allUsersUsecase = async (dependancies: any) => {
  const {
    Tasks: { getTaskByUser },
  } = dependancies;
  const allusers = async ({ id, dep }: { id: ObjectId; dep: number }) => {
    try {
      return await getTaskByUser({ id, dep });
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return allusers;
};

export default allUsersUsecase;
