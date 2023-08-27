import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { getTaskByDepartmentUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = await getTaskByDepartmentUsecase(dependancies);
      const data = await getData(req.params.id);
      if (data instanceof Error) throw new Error(data.toString());
      return res.status(200).json({
        message: "Successfully Completed",
        data: [data],
      });
    } catch (error) {
      next(error);
    }
  };
};
