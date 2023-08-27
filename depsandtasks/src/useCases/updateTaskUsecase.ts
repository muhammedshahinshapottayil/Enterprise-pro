const updateTaskUsecase = async (dependancies: any) => {
  const {
    Task: { getByname, updateTasks },
  } = dependancies;
  const updateTask = async ({
    id,
    name,
    fk_department,
  }: {
    id: number;
    name: string;
    fk_department: string;
  }) => {
    try {
      const depExists: any = await getByname({ name, fk_department });
      if (depExists.length) throw new Error("Task already Exist ");
      const response = await updateTasks({ id, name, fk_department });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return updateTask;
};

export default updateTaskUsecase;
