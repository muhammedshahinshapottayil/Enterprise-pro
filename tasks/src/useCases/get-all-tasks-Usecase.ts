const getTasksUsecase = async (dependencies: any) => {
  const {
    Tasks: { getAllTasks },
  } = dependencies;

  const getTasks = async () => {
    try {
      return await getAllTasks();
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return getTasks;
};

export default getTasksUsecase;
