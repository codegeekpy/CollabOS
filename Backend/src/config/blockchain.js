import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  process.env.SEPOLIA_RPC_URL
);

const contractAddress =
  "0x645aB33263798dd2a0B11d399ad6dc2228f2CfA8";

export { provider, contractAddress };