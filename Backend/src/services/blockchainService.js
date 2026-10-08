import { ethers } from "ethers";
import {
  provider,
  contractAddress,
} from "../config/blockchain.js";

import escrowArtifact from "../blockchain/CollabOSEscrow.json" with { type: "json" };

const contract = new ethers.Contract(
  contractAddress,
  escrowArtifact.abi,
  provider
);

export const getOnChainEscrow = async (escrowId) => {
  return await contract.getEscrow(escrowId);
};

export const getContractBalance = async () => {
  return await provider.getBalance(contractAddress);
};

export { contract };