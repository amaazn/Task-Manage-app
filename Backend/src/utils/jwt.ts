import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "3h" }
  );
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};