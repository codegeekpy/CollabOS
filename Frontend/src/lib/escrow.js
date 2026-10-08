import { ethers } from "ethers";

const CONTRACT_ADDRESS =
  "0x645aB33263798dd2a0B11d399ad6dc2228f2CfA8";

const CONTRACT_ABI = [
  "function createEscrow(uint256 escrowId, address contributor)",
  "function fundEscrow(uint256 escrowId) payable",
  "function releaseEscrow(uint256 escrowId)",
  "function getEscrow(uint256 escrowId) view returns (address client, address contributor, uint256 amount, bool funded, bool released)",
];

export const getEscrowContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
};

// export const createOnChainEscrow = async (
//   escrowId,
//   contributorAddress
// ) => {
//   const contract = await getEscrowContract();

//   const tx = await contract.createEscrow(
//     escrowId,
//     contributorAddress
//   );

//   const receipt = await tx.wait();

//   return {
//     hash: receipt.hash,
//     receipt,
//   };
// };

export const fundOnChainEscrow = async (escrowId) => {
  const contract = await getEscrowContract();

  const value = ethers.parseEther("0.001");

  console.log("Funding escrow:", {
    escrowId,
    value: value.toString(),
    eth: ethers.formatEther(value),
  });

  const tx = await contract.fundEscrow(escrowId, {
    value,
  });

  console.log("Funding transaction:", tx.hash);

  const receipt = await tx.wait();

  return {
    hash: tx.hash,
    receipt,
  };
};

export const releaseOnChainEscrow = async (escrowId) => {
  const contract = await getEscrowContract();

  const tx = await contract.releaseEscrow(escrowId);

  const receipt = await tx.wait();

  return {
    hash: tx.hash,
    receipt,
  };
};

export const readOnChainEscrow = async (escrowId) => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const escrow = await contract.getEscrow(escrowId);

  return {
    client: escrow.client,
    contributor: escrow.contributor,
    amount: escrow.amount,
    funded: escrow.funded,
    released: escrow.released,
  };
};


export const createOnChainEscrow = async (
  escrowId,
  contributorAddress
) => {
  const contract = await getEscrowContract();

  const tx = await contract.createEscrow(
    escrowId,
    contributorAddress
  );

  const receipt = await tx.wait();

  return {
    hash: tx.hash,
    receipt,
  };
};

export { CONTRACT_ADDRESS };