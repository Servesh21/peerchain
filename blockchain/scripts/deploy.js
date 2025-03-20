async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Escrow contract
    const EscrowFactory = await ethers.getContractFactory("PeerToPeerEscrow");
    const escrow = await EscrowFactory.deploy();

    await escrow.waitForDeployment(); // ✅ Corrected from deployed()
    console.log("Escrow contract deployed to:", escrow.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
