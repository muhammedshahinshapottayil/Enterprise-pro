const saveDepUsecase = async (dependancies: any) => {
  const {
    Department: { getByname, saveDepartment ,getAll},
  } = dependancies;

  const saveDep = async ({ name }: { name: string }) => {
    try {
      const depExists: any = await getByname(name);
      if (depExists.length) throw new Error("Department already Exist ");
      const response = await saveDepartment(name);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return saveDep;
};

export default saveDepUsecase;
