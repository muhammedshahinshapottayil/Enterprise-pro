import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { signUpUsecase },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signup = await signUpUsecase(dependancies);
      const userCreate: any | Error = await signup(req.body);
      if (userCreate instanceof Error) throw new Error(userCreate.toString());
      if (userCreate == undefined) {
        return res.status(200).json({
          message: "Successfully Completed",
          data: [],
        });
      } else throw new Error("Try Again");
    } catch (error) {
      next(error);
    }
  };
};
