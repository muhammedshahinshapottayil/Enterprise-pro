import { userData } from "../interfaces/userinterface";
import { generateTokens } from "../utils/generateTokens";
const refreshTokenUsecase = async (dependancies: any) => {
  const refreshToken = async (userExists: userData) => {
    try {
      const { accessToken, refreshToken } = generateTokens(userExists);
      return { accessToken, refreshToken, role: userExists.role };
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  return refreshToken;
};
export default refreshTokenUsecase;
