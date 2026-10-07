import express from "express";

import {
  createEscrow,
  getEscrows,
  getEscrowById,
  updateEscrowStatus,
} from "../controllers/escrowController.js";

const router = express.Router();

router.post("/", createEscrow);
router.get("/", getEscrows);
router.get("/:id", getEscrowById);
router.patch("/:id", updateEscrowStatus);

export default router;