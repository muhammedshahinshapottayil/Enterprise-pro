const updateDepUsecase = async (dependancies: any) => {
  const {
    Department: { getByname, updateByid },
  } = dependancies;

  const updateDep = async ({ id, name }: { id: number; name: string }) => {
    try {
      const depExists: any = await getByname(name);
      if (depExists.length) throw new Error("Department already Exist ");
      const response = await updateByid({ id, name });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return updateDep;
};

export default updateDepUsecase;
