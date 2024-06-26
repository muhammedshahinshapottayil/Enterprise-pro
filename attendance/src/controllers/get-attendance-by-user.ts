import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { getAttendanceByUserUsecase },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signup = await getAttendanceByUserUsecase(dependancies);
      const userCreate: any | Error = await signup(req.params.id);
      if (userCreate instanceof Error) throw new Error(userCreate.toString());
      if (userCreate) {
        return res.status(200).json({
          message: "Successfully Completed",
          data: [userCreate],
        });
      } else throw new Error("Try Again");
    } catch (error) {
      next(error);
    }
  };
};
