const { ethers } = require("hardhat");

async function deployEscrow() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Escrow contract with account:", deployer.address);

    const EscrowFactory = await ethers.getContractFactory("BitcoinEscrow");
    const escrow = await EscrowFactory.deploy();
    await escrow.waitForDeployment(); // ✅ Correct way to wait for deployment

    console.log("Escrow contract deployed to:", escrow.target);
    return escrow; // ✅ Return deployed contract instance
}

async function main() {
    try {
        const escrowContract = await deployEscrow(); // Call deployment function
    } catch (error) {
        console.error("Error deploying contracts:", error);
        process.exit(1);
    }
}

main();
