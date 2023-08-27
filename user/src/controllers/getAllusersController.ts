import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { getAllusersByDepartmentuseCase },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = await getAllusersByDepartmentuseCase(dependancies);
      const data = await getData(req.params.id);
      return res.status(200).json({
        message: "Successfully Completed",
        data: [data],
      });
    } catch (error) {
      next(error);
    }
  };
};
