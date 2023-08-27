import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { assignTaskUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assign = await assignTaskUsecase(dependancies);
      const response = await assign(req.body);
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
