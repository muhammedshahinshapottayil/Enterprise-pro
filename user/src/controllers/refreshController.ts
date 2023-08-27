import { NextFunction, Request, Response } from "express";
export default (dependancies: any) => {
  const {
    useCases: { refreshTokenUsecase },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = await refreshTokenUsecase(dependancies);
      const token: any | Error = await refreshToken(req.user);
      if (token instanceof Error) throw new Error(token.toString());
      
      return res.status(200).json({
        data: [token],
      });
    } catch (error) {
      next(error);
    }
  };
}
