import { NextFunction, Request, Response } from "express";
import db from "../models/db";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/user";
import HttpStatusCodes from "../helpers/httpStatusCodes";

async function authorizeUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get("Authorization") || "";
  try {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "Access token is required" });
    }
    const access_token = authHeader.split(" ")[1];

    if (!access_token) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "Access token is required" });
    }
    const reqUser: JWTPayload = jwt.verify(
      access_token,
      process.env.JWT_SECRET || "",
    ) as JWTPayload;
    const userCount = await db
      .count(["users.id"])
      .from("users")
      .where({ "users.id": reqUser.userId, username: reqUser.userName });

    if (userCount.length === 0) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized access" });
    }
    next();
  } catch (e) {
    console.error(e);
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: "JWT token expired" });
  }
}

export default authorizeUser;
