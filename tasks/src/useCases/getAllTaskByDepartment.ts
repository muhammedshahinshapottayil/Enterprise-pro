const getAllTasksByDepartmentUsecase = async (dependencies: any) => {
  const {
    Tasks: { getTaskByDepartment },
  } = dependencies;

  const getTasks = async (department_id: number) => {
    try {
      return await getTaskByDepartment(department_id);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return getTasks;
};

export default getAllTasksByDepartmentUsecase;
