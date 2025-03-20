const { ethers } = require("hardhat");

async function deployEscrow() {
    const [deployer] = await ethers.getSigners();
    console.log("🚀 Deploying Escrow contract with account:", deployer.address);

    const EscrowFactory = await ethers.getContractFactory("BitcoinEscrow");
    const escrow = await EscrowFactory.deploy();
    await escrow.waitForDeployment();  // ✅ Use this instead of `.deployed()`

    console.log("✅ Escrow contract deployed to:", await escrow.getAddress()); // ✅ Use getAddress()
    return escrow;
}

async function main() {
    try {
        await deployEscrow();
    } catch (error) {
        console.error("❌ Error deploying contracts:", error);
        process.exit(1);
    }
}

main();
