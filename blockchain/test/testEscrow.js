const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PeerToPeerEscrow", function () {
    let Escrow, escrow;
    let owner, sender, receiver;

    beforeEach(async function () {
        [owner, sender, receiver] = await ethers.getSigners();
        Escrow = await ethers.getContractFactory("PeerToPeerEscrow");
        escrow = await Escrow.deploy();
        await escrow.deployed();
    });

    it("Should create an escrow transaction", async function () {
        const amount = ethers.parseEther("1.0");
        await escrow.connect(sender).createEscrow(receiver.address, amount, { value: amount });

        const escrowId = ethers.keccak256(ethers.solidityPacked(["address", "address", "uint256"], [sender.address, receiver.address, amount]));

        const escrowData = await escrow.escrows(escrowId);
        expect(escrowData.sender).to.equal(sender.address);
        expect(escrowData.receiver).to.equal(receiver.address);
        expect(escrowData.amount).to.equal(amount);
        expect(escrowData.isCompleted).to.equal(false);
    });

    it("Should allow sender to release funds", async function () {
        const amount = ethers.parseEther("1.0");
        await escrow.connect(sender).createEscrow(receiver.address, amount, { value: amount });

        const escrowId = ethers.keccak256(ethers.solidityPacked(["address", "address", "uint256"], [sender.address, receiver.address, amount]));

        await escrow.connect(sender).releaseFunds(escrowId);

        const escrowData = await escrow.escrows(escrowId);
        expect(escrowData.isCompleted).to.equal(true);
    });

    it("Should prevent non-sender from releasing funds", async function () {
        const amount = ethers.parseEther("1.0");
        await escrow.connect(sender).createEscrow(receiver.address, amount, { value: amount });

        const escrowId = ethers.keccak256(ethers.solidityPacked(["address", "address", "uint256"], [sender.address, receiver.address, amount]));

        await expect(escrow.connect(receiver).releaseFunds(escrowId))
            .to.be.revertedWith("Only sender can release funds");
    });
});
