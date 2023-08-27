const allUsersUsecase = async (dependancies: any) => {
  const {
    User: { getAllUsers },
  } = dependancies;

  const allusers = async () => {
    try {
      return await getAllUsers();
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return allusers;
};

export default allUsersUsecase;
