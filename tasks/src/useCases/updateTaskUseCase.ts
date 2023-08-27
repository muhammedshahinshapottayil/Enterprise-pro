import { ObjectId } from "mongoose";
const updateTaskUseCase = async (dependancies: any) => {
  const {
    Tasks: { addUpdates },
  } = dependancies;

  const updateTask = async ({
    id,
    title,
    user,
  }: {
    id: ObjectId;
    title: string;
    user: ObjectId;
  }) => {
    try {
      return await addUpdates({
        id,
        title,
        user,
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return updateTask;
};

export default updateTaskUseCase;
