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
export const verifyEscrowFunding = async (escrowId) => {
  const escrow = await contract.getEscrow(escrowId);

  return {
    client: escrow.client,
    contributor: escrow.contributor,
    amount: escrow.amount.toString(),
    funded: escrow.funded,
    released: escrow.released,
  };
};

export const getContractBalance = async () => {
  return await provider.getBalance(contractAddress);
};

export { contract };