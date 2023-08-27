const allUsersUsecase = async (dependancies: any) => {
  const {
    User: { deleteUser },
  } = dependancies;

  const allusers = async (id: string) => {
    try {
      return await deleteUser(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return allusers;
};

export default allUsersUsecase;
