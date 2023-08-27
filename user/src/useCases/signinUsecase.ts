import { generateTokens } from "../utils/generateTokens";
import argon2 from "argon2";

const signinUsecase = async (dependancies: any) => {
  const {
    User: { findValidUser },
  } = dependancies;

  const signin = async ({
    username,
    password,
    valid,
  }: {
    username: string;
    password: string;
    valid: string;
  }) => {
    try {
      const userExists: any = await findValidUser({ username });
      if (!userExists) throw new Error("invalid username ");

      if (await argon2.verify(userExists.password, password)) {
        const { accessToken, refreshToken } = generateTokens(userExists);
        return {userExists, accessToken, refreshToken, role: userExists.role };
      }
      throw new Error("invalid password ");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return signin;
};

export default signinUsecase;
