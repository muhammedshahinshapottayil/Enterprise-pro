import { TaskData } from "../interfaces/TaskInterface";

const assignTaskUsecase = async (dependancies: any) => {
  const {
    Tasks: { createTask, updateTask },
  } = dependancies;

  const assignTask = async (data: TaskData) => {
    try {
      data.data = data.data.map((item: any) => {
        return { ...item, task_id: data.task_id, task_name: data.task_name };
      });
      await updateTask(data);
      return await createTask(data);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return assignTask;
};

export default assignTaskUsecase;
