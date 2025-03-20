const { ethers } = require("hardhat");

async function main() {
    const ContractFactory = await ethers.getContractFactory("TransactionLogger"); // Ensure this matches your contract name
    const contract = await ContractFactory.deploy(); // Deploys the contract
    await contract.waitForDeployment(); // <-- Correct function to wait for deployment

    console.log("Contract deployed to:", await contract.getAddress()); // Correct way to get contract address
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
