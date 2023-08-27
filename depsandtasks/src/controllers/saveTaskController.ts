import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { saveTaskUsecase, updateTaskUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      let response: any | Error;
      if (id && typeof id == "number") {
        const updateDep = await updateTaskUsecase(dependancies);
        response = await updateDep(req.body);
      } else {
        const saveDep = await saveTaskUsecase(dependancies);
        response = await saveDep(req.body);
      }
      if (response instanceof Error) throw new Error(response.toString());
      return res.status(200).json({
        messege: "Successfully Completed",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  };
};
