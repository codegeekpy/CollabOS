import { ethers } from "ethers";
import User from "../models/User.js";


export const createUser = async (req, res) => {
  try {
    const { walletAddress, role, name } = req.body;

    // Required fields
    if (!walletAddress || !role) {
      return res.status(400).json({
        message: "walletAddress and role are required",
      });
    }

    // Validate Ethereum address
    if (!ethers.isAddress(walletAddress)) {
      return res.status(400).json({
        message: "Invalid Ethereum wallet address",
      });
    }

    // Validate role
    if (!["client", "contributor"].includes(role)) {
      return res.status(400).json({
        message: "Role must be client or contributor",
      });
    }

    // Normalize wallet address
    const normalizedWallet = walletAddress.toLowerCase();

    // Prevent duplicate wallet
    const existingUser = await User.findOne({
      walletAddress: normalizedWallet,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with this wallet address already exists",
      });
    }

    const user = await User.create({
      walletAddress: normalizedWallet,
      role,
      name: name?.trim() || undefined,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);

    return res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};


export const getUser = async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({
            message:"Couldn't fetch users",
            error: error.message,
        });
    }
};