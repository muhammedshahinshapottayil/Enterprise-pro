const getDepByIdUsecase = async (dependancies: any) => {
  const {
    Department: { getByid },
  } = dependancies;

  const getData = async (id: number) => {
    try {
      const response = await getByid(id);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return getData;
};

export default getDepByIdUsecase;
