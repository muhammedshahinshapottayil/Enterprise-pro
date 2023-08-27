import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { getDepartmentUsecase },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gettask = await getDepartmentUsecase(dependancies);
      const data: any | Error = await gettask();
      if (data instanceof Error) throw new Error(data.toString());
      if (data) {
        return res.status(200).json({
          message: "Successfully Completed",
          data: [...data],
        });
      } else throw new Error("Try Again");
    } catch (error) {
      next(error);
    }
  };
};
