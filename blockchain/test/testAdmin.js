const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ExchangeAdmin", function () {
    let ExchangeAdmin, admin;
    let owner, exchange1, exchange2, randomUser;

    beforeEach(async function () {
        [owner, exchange1, exchange2, randomUser] = await ethers.getSigners();
        ExchangeAdmin = await ethers.getContractFactory("ExchangeAdmin");
        admin = await ExchangeAdmin.deploy();
        // await admin.deployed();
    });

    it("Should allow the owner to add an exchange", async function () {
        await admin.addExchange(exchange1.address);
        expect(await admin.isApprovedExchange(exchange1.address)).to.be.true;
    });

    it("Should allow the owner to remove an exchange", async function () {
        await admin.addExchange(exchange1.address);
        await admin.removeExchange(exchange1.address);
        expect(await admin.isApprovedExchange(exchange1.address)).to.be.false;
    });

    it("Should prevent non-owner from adding an exchange", async function () {
        await expect(admin.connect(randomUser).addExchange(exchange2.address))
            .to.be.revertedWith("Not contract owner");
    });

    it("Should prevent non-owner from removing an exchange", async function () {
        await admin.addExchange(exchange1.address);
        await expect(admin.connect(randomUser).removeExchange(exchange1.address))
            .to.be.revertedWith("Not contract owner");
    });
    
});
