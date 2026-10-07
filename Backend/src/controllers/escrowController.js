import Escrow from "../models/Escrow.js";

export const createEscrow = async (req, res) => {
  try {
    const {
      project,
      milestone,
      client,
      contributor,
      amount,
      token,
      chain,
      contractAddress,
    } = req.body;

    const escrow = await Escrow.create({
      project,
      milestone,
      client,
      contributor,
      amount,
      token,
      chain,
      contractAddress,
    });

    return res.status(201).json(escrow);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create escrow",
      error: error.message,
    });
  }
};

export const getEscrows = async (req, res) => {
  try {
    const escrows = await Escrow.find()
      .populate("project")
      .populate("milestone")
      .populate("client")
      .populate("contributor");

    return res.status(200).json(escrows);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch escrows",
      error: error.message,
    });
  }
};

export const getEscrowById = async (req, res) => {
  try {
    const escrow = await Escrow.findById(req.params.id)
      .populate("project")
      .populate("milestone")
      .populate("client")
      .populate("contributor");

    if (!escrow) {
      return res.status(404).json({
        message: "Escrow not found",
      });
    }

    return res.status(200).json(escrow);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch escrow",
      error: error.message,
    });
  }
};

export const updateEscrowStatus = async (req, res) => {
  try {
    const { status, fundingTxHash, releaseTxHash } = req.body;

    const escrow = await Escrow.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(fundingTxHash && { fundingTxHash }),
        ...(releaseTxHash && { releaseTxHash }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!escrow) {
      return res.status(404).json({
        message: "Escrow not found",
      });
    }

    return res.status(200).json(escrow);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update escrow",
      error: error.message,
    });
  }
};