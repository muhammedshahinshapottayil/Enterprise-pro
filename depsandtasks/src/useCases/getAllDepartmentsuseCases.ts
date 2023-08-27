const getAlluseCases = async (dependancies: any) => {
  const {
    Department: { getAll },
  } = dependancies;

  const getAllData = async () => {
    try {
      const response = await getAll();
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return getAllData;
};

export default getAlluseCases;
