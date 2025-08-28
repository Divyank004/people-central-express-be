import {
  getVacationsCount,
  createVacationRequest,
  getVacationHistory,
} from "../controllers/vacations.controller";
import express from "express";
import authorizeUser from "../helpers/authorize";

const router = express.Router();

/**
 * @swagger
 * /users/{userId}/vacations/count:
 *   get:
 *     summary: Get vacation counts for a user
 *     description: Retrieves the count of vacation days taken by type for a specific user
 *     tags: [Vacations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vacation counts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VacationsCount'
 *       400:
 *         description: Bad request - User ID missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/users/:userId/vacations/count",
  [authorizeUser],
  getVacationsCount,
);

/**
 * @swagger
 * /users/{userId}/vacations:
 *   post:
 *     summary: Create a new vacation request
 *     description: Creates a new vacation request for a specific user
 *     tags: [Vacations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacationRequest'
 *     responses:
 *       201:
 *         description: Vacation request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID of the created vacation request
 *       400:
 *         description: Bad request - Missing required fields or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/users/:userId/vacations", [authorizeUser], createVacationRequest);

/**
 * @swagger
 * /users/{userId}/vacations/history:
 *   get:
 *     summary: Get vacation history for a user
 *     description: Retrieves the complete vacation history for a specific user
 *     tags: [Vacations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vacation history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacation'
 *       400:
 *         description: Bad request - User ID missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/users/:userId/vacations/history",
  [authorizeUser],
  getVacationHistory,
);

export default router;
