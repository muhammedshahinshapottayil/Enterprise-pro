import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { getAllTaskuseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllData = await getAllTaskuseCases(dependancies);
      const response: any | Error = await getAllData(req.body);
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
