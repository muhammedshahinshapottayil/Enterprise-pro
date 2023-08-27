const saveTaskUsecase = async (dependancies: any) => {
  const {
    Task: { getByname, saveTask },
  } = dependancies;

  const saveDep = async ({
    name,
    fk_department,
  }: {
    name: string;
    fk_department: string;
  }) => {
    try {
      const depExists: any = await getByname({
        name,
        fk_department,
      });
      if (depExists.length) throw new Error("Task already Exist ");
      const response = await saveTask({
        name,
        fk_department,
      });
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return saveDep;
};

export default saveTaskUsecase;
