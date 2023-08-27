import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { allUsersUsecase },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = await allUsersUsecase(dependancies);
      const data = await getData();
      return res.status(200).json({
        message: "Successfully Completed",
        data: [data],
      });
    } catch (error) {
      next(error);
    }
  };
};
