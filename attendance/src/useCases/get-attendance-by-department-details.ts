const getAllTasksByDepartmentUsecase = async (dependencies: any) => {
  const {
    Attendance: { attendanceBetweenByDepartmentDetails },
  } = dependencies;

  const getTasks = async (date: string, department_id: number) => {
    try {
      return await attendanceBetweenByDepartmentDetails(date,department_id);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return getTasks;
};

export default getAllTasksByDepartmentUsecase;
