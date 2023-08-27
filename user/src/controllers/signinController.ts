import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { signinUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signin = await signinUsecase(dependancies);
      const token: any | Error = await signin(req.body);
      if (token instanceof Error) throw new Error(token.toString());  
      return res.status(200).json({
        messege: "SET_LOGIN",
        data: [token],
      });
    } catch (error) {
      next(error);
    }
  };
};
