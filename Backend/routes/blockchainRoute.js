// const { ethers } = require("ethers");
// const dotenv = require("dotenv");
// dotenv.config();

// // const contractAddresses = require("../config/contractAddresses.json");

// // Corrected Paths
// // const PeerToPeerEscrowABI = require("../../blockchain/artifacts/contracts/PeerToPeerEscrow.sol/PeerToPeerEscrow.json").abi;
// // const ExchangeAdminABI = require("../../blockchain/artifacts/contracts/ExchangeAdmin.sol/ExchangeAdmin.json").abi;

// // Ethereum Provider
// const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// // Contract Instances
// const escrowContract = new ethers.Contract(
//     contractAddresses.PeerToPeerEscrow,
//     PeerToPeerEscrowABI,
//     wallet
// );

// const adminContract = new ethers.Contract(
//     contractAddresses.ExchangeAdmin,
//     ExchangeAdminABI,
//     wallet
// );


// /** ✅ Create a Blockchain Transaction */
// exports.createTransaction = async (req, res) => {
//     try {
//         const { receiver, amount } = req.body;
//         if (!receiver || !amount) {
//             return res.status(400).json({ error: "Missing receiver or amount" });
//         }

//         const txn = await escrowContract.createEscrow(receiver, ethers.utils.parseEther(amount), {
//             value: ethers.utils.parseEther(amount),
//             gasLimit: 1000000
//         });

//         await txn.wait();
//         res.json({ success: true, txnHash: txn.hash });
//     } catch (error) {
//         console.error("Transaction Error:", error);
//         res.status(500).json({ error: "Transaction failed", details: error.message });
//     }
// };

// /** ✅ Get Transaction Details */
// exports.getTransactionDetails = async (req, res) => {
//     try {
//         const { address } = req.params;
//         if (!ethers.utils.isAddress(address)) {
//             return res.status(400).json({ error: "Invalid Ethereum address" });
//         }

//         const transactions = await escrowContract.getTransaction(address);
//         res.json({ success: true, transactions });
//     } catch (error) {
//         console.error("Transaction Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch transactions" });
//     }
// };

// /** ✅ Get Wallet Balance */
// exports.getBalance = async (req, res) => {
//     try {
//         const { address } = req.params;
//         if (!ethers.utils.isAddress(address)) {
//             return res.status(400).json({ error: "Invalid Ethereum address" });
//         }

//         const balance = await provider.getBalance(address);
//         res.json({ success: true, balance: ethers.utils.formatEther(balance) });
//     } catch (error) {
//         console.error("Balance Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch balance" });
//     }
// };
