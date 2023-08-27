const getTaskbyTaskUsecase = async (dependancies: any) => {
  const {
    Tasks: { getTaskByTask },
  } = dependancies;

  const signin = async (id: number) => {
    try {
      return await getTaskByTask(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signin;
};

export default getTaskbyTaskUsecase;
