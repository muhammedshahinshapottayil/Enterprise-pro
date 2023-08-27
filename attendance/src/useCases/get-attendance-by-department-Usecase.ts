const getUserByDepartmentUsecase = async (dependancies: any) => {
  const {
    Attendance: { attendanceBetweenByDepartment },
  } = dependancies;
  const getUserbyDepartment = async (id: number) => {
    try {
      const assigned = await attendanceBetweenByDepartment(id);
      return assigned;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return getUserbyDepartment;
};

export default getUserByDepartmentUsecase;
