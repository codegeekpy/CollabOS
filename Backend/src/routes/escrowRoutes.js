import express from "express";
import { ethers } from "ethers";
import {
  getOnChainEscrow,
  getContractBalance,
} from "../services/blockchainService.js";
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

router.get("/:id/on-chain", async (req, res) => {
  try {
    const escrow = await getOnChainEscrow(req.params.id);

    return res.status(200).json({
      client: escrow[0],
      contributor: escrow[1],
      amount: escrow[2].toString(),
      funded: escrow[3],
      released: escrow[4],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to read escrow from blockchain",
      error: error.message,
    });
  }
});

router.get("/contract/balance", async (req, res) => {
  try {
    const balance = await getContractBalance();

    return res.status(200).json({
      balanceWei: balance.toString(),
      balanceEth: ethers.formatEther(balance),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to read contract balance",
      error: error.message,
    });
  }
});

export default router;