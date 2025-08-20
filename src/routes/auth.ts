import { authenticate, register } from "../controllers/auth.controller";
import express from "express";

const router = express.Router();

/* login */
router.post("/login", authenticate);

router.post("/register", register);

export default router;
