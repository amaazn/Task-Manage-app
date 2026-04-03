import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {

 try {

    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


// import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {

    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      accessToken,
      user: {
    id: user.id,
    name: user.name,
    email: user.email
  }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const refreshToken = (req: Request, res: Response) => {

  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "Refresh token missing"
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    const accessToken = generateAccessToken(decoded.userId);

    res.json({
      accessToken
    });

  } catch (error) {

    return res.status(403).json({
      message: "Invalid refresh token"
    });

  }

};

export const logoutUser = (req: Request, res: Response) => {

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.json({
    message: "Logged out successfully"
  });

};

