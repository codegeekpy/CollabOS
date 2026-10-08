import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CollabOSEscrowModule = buildModule("CollabOSEscrowModule", (m) => {
  const escrow = m.contract("CollabOSEscrow");

  return { escrow };
});

export default CollabOSEscrowModule;