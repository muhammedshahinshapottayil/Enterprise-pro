const allUsersUsecase = async (dependancies: any) => {
    const {
      User: { getAllUsersByDepartment },
    } = dependancies;
  
    const allusers = async (id:number) => {
      try {
        return await getAllUsersByDepartment(id);
      } catch (error) {
        console.error(error);
        return error;
      }
    };
  
    return allusers;
  };
  
  export default allUsersUsecase;
  