import { expect } from "chai";
import { network } from "hardhat";

describe("CollabOSEscrow", function () {
  it("should create an escrow", async function () {
    const { ethers } = await network.connect();

    const [client, contributor] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("CollabOSEscrow");
    const escrow = await Escrow.deploy();

    await escrow.waitForDeployment();

    await escrow.createEscrow(1, contributor.address);

    const data = await escrow.getEscrow(1);

    expect(data[0]).to.equal(client.address);
    expect(data[1]).to.equal(contributor.address);
    expect(data[3]).to.equal(false);
    expect(data[4]).to.equal(false);
  });

  it("should fund an escrow", async function () {
    const { ethers } = await network.connect();

    const [client, contributor] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("CollabOSEscrow");
    const escrow = await Escrow.deploy();

    await escrow.waitForDeployment();

    await escrow.createEscrow(1, contributor.address);

    const amount = ethers.parseEther("1");

    await escrow.fundEscrow(1, {
      value: amount,
    });

    const data = await escrow.getEscrow(1);

    expect(data[2]).to.equal(amount);
    expect(data[3]).to.equal(true);
  });

  it("should release funds to the contributor", async function () {
    const { ethers } = await network.connect();

    const [client, contributor] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("CollabOSEscrow");
    const escrow = await Escrow.deploy();

    await escrow.waitForDeployment();

    await escrow.createEscrow(1, contributor.address);

    const amount = ethers.parseEther("1");

    await escrow.fundEscrow(1, {
      value: amount,
    });

    const balanceBefore = await ethers.provider.getBalance(
      contributor.address
    );

    await escrow.releaseEscrow(1);

    const balanceAfter = await ethers.provider.getBalance(
      contributor.address
    );

    expect(balanceAfter - balanceBefore).to.equal(amount);

    const data = await escrow.getEscrow(1);

    expect(data[2]).to.equal(0);
    expect(data[4]).to.equal(true);
  });
});