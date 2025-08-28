import {
  getVacationsCount,
  createVacationRequest,
  getVacationHistory,
} from "../controllers/vacations.controller";
import express from "express";
import authorizeUser from "../helpers/authorize";

const router = express.Router();

router.get(
  "/users/:userId/vacations/count",
  [authorizeUser],
  getVacationsCount,
);

router.post("/users/:userId/vacations", [authorizeUser], createVacationRequest);

router.get(
  "/users/:userId/vacations/history",
  [authorizeUser],
  getVacationHistory,
);

export default router;
