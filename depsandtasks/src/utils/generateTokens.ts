import jwt from "jsonwebtoken";
import { userData } from "../interfaces/userinterface";
const generateAccessToken = (data: userData) => {
  try {
    return jwt.sign({ data }, "4Zp:EBnn9i5(rRSk", {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generateRefreshToken = (data: userData) => {
  try {
    return jwt.sign({ data }, "4Zp:EBnn9i5(rRSk", {
      expiresIn: "14d",
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generateTokens = (data: userData) => {
  const accessToken = generateAccessToken(data);
  const refreshToken = generateRefreshToken(data);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export { generateTokens };
