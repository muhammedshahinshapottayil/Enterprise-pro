import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { deleteTaskUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteData = await deleteTaskUsecase(dependancies);
      const response: any | Error = await deleteData(req.params.id);
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
