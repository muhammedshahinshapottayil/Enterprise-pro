const deleteDepartmentUsecase = async (dependancies: any) => {
    const {
      Department: { deleteByid },
    } = dependancies;
  
    const deleteData = async (id: number) => {
      try {
        const response = await deleteByid(id);
        return response;
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    return deleteData;
  };
  
  export default deleteDepartmentUsecase;
  