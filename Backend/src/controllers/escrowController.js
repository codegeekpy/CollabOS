import Escrow from "../models/Escrow.js";
import { verifyEscrowFunding } from "../services/blockchainService.js";
import Milestone from "../models/Milestone.js";

import Project from "../models/Project.js";


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
      onChainEscrowId,
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
      onChainEscrowId,
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
      { new: true, runValidators: true }
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




//mongoo-blockchain:

export const syncEscrowWithBlockchain = async (req, res) => {
  try {
    const escrow = await Escrow.findById(req.params.id);

    if (!escrow) {
      return res.status(404).json({
        message: "Escrow not found",
      });
    }

    const onChain = await verifyEscrowFunding(
      escrow.onChainEscrowId
    );

    let status = escrow.status;

    if (onChain.released) {
      status = "released";
    } else if (onChain.funded) {
      status = "funded";
    } else {
      status = "created";
    }

    escrow.status = status;

    await escrow.save();

    return res.status(200).json({
      message: "Escrow synchronized with blockchain",
      escrow,
      onChain,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to synchronize escrow",
      error: error.message,
    });
  }
};


export const reserveEscrow = async (req, res) => {
  try {
    const {
      project,
      milestone,
      client,
      contributor,
      amount,
      token = "ETH",
      chain = "sepolia",
      contractAddress,
    } = req.body;

    if (
      !project ||
      !milestone ||
      !client ||
      !contributor ||
      amount === undefined
    ) {
      return res.status(400).json({
        message:
          "project, milestone, client, contributor, and amount are required",
      });
    }

    if (token !== "ETH") {
      return res.status(400).json({
        message: "Only ETH escrow is supported in the MVP",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Escrow amount must be greater than zero",
      });
    }

    const projectDoc = await Project.findById(project);

    if (!projectDoc) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const milestoneDoc = await Milestone.findById(milestone);

    if (!milestoneDoc) {
      return res.status(404).json({
        message: "Milestone not found",
      });
    }

    if (milestoneDoc.project.toString() !== projectDoc._id.toString()) {
      return res.status(400).json({
        message: "Milestone does not belong to this project",
      });
    }

    if (projectDoc.owner.toString() !== client.toString()) {
      return res.status(403).json({
        message: "Client must be the project owner",
      });
    }

    const contributorAssigned = projectDoc.contributors.some(
      (id) => id.toString() === contributor.toString()
    );

    if (!contributorAssigned) {
      return res.status(400).json({
        message: "Contributor is not assigned to this project",
      });
    }

    if (milestoneDoc.status === "completed") {
      return res.status(400).json({
        message: "Cannot create escrow for a completed milestone",
      });
    }

    const existingEscrow = await Escrow.findOne({ milestone });

    if (existingEscrow) {
      return res.status(409).json({
        message: "An escrow already exists for this milestone",
      });
    }

    const latestEscrow = await Escrow.findOne()
  .sort({ onChainEscrowId: -1 })
  .select("onChainEscrowId");

const onChainEscrowId = latestEscrow
  ? Math.max(latestEscrow.onChainEscrowId + 1, 5)
  : 5;
    const escrow = await Escrow.create({
      project,
      milestone,
      client,
      contributor,
      onChainEscrowId,
      amount,
      token,
      chain,
      contractAddress,
      status: "created",
    });

    return res.status(201).json(escrow);
  } catch (error) {
    console.error("Failed to reserve escrow:", error);

    return res.status(500).json({
      message: "Failed to reserve escrow",
      error: error.message,
    });
  }
};