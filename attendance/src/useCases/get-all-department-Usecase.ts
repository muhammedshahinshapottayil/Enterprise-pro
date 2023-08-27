const getTasksUsecase = async (dependencies: any) => {
  const {
    Attendance: { getAllDepartmentsAttendance },
  } = dependencies;

  const getTasks = async () => {
    try {
      return await getAllDepartmentsAttendance();
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return getTasks;
};

export default getTasksUsecase;
