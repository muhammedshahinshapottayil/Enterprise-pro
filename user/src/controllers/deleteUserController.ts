import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { deleteUseruseCase },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = await deleteUseruseCase(dependancies);
      await getData(req.params.id);
      return res.status(200).json({
        message: "Successfully Completed",
        data: [],
      });
    } catch (error) {
      next(error);
    }
  };
};
