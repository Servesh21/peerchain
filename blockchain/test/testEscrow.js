const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PeerToPeerEscrow", function () {
    let escrow;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        const Escrow = await ethers.getContractFactory("PeerToPeerEscrow");
        escrow = await Escrow.deploy();
        await escrow.waitForDeployment(); // ✅ Ensure the contract is deployed
    });

    it("Should create an escrow transaction", async function () {
        const amount = ethers.parseEther("1"); // Convert 1 ETH to wei

        // ✅ Ensure that escrow is defined and deployed
        const tx = await escrow.connect(user1).createEscrow(user2.address, amount, { value: amount });
        await tx.wait();

        // Generate escrow ID based on Solidity logic
        const latestBlock = await ethers.provider.getBlock("latest");
        const escrowId = ethers.keccak256(
            ethers.solidityPacked(["address", "address", "uint256"], [user1.address, user2.address, latestBlock.timestamp])
        );

        const escrowData = await escrow.escrows(escrowId);

        expect(escrowData.sender).to.equal(user1.address);
        expect(escrowData.receiver).to.equal(user2.address);
        expect(escrowData.amount).to.equal(amount);
        expect(escrowData.isCompleted).to.equal(false);
    });
});
