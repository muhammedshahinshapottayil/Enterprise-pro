const deleteTaskUsecase = async (dependancies: any) => {
  const {
    Task: { deleteByid },
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

export default deleteTaskUsecase;
