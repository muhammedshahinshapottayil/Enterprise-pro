import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { getDepByIdUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getData = await getDepByIdUsecase(dependancies);
      const response: any | Error = await getData(req.params.id);
      if (response instanceof Error) throw new Error(response.toString());
      return res.status(200).json({
        messege: "Successfully Completed",
        data: [response],
      });
    } catch (error) {
      next(error);
    }
  };
};
