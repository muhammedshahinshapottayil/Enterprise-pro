const getDepByIdUsecase = async (dependancies: any) => {
    const {
      Task: { getByDepid },
    } = dependancies;
  
    const getData = async (id: number) => {
      try {
        const response = await getByDepid(id);
        
        return response;
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    return getData;
  };
  
  export default getDepByIdUsecase;
  