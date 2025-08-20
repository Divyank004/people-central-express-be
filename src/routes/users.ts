import { getUser } from "../controllers/user.controller";
import express from "express";
import authorizeUser from "../helpers/authorize";

const router = express.Router();

router.get("/users/:userId", [authorizeUser], getUser);

export default router;
