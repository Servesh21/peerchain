const { Web3 } = require("web3");
require("dotenv").config(); // Load environment variables

const web3 = new Web3(process.env.ALCHEMY_SEPOLIA_URL);

// ERC-20 Token ABI (Minimal Required Functions)
const erc20Abi = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function"
  }
];

/**
 * @desc Create ETH transaction (User signs in MetaMask)
 * @param {Object} txData - Transaction details
 * @returns {Object} Unsigned transaction object
 */
async function createEthTransaction({ sender, to, value }) {
  if (!sender) throw new Error("Sender address is required");

  const nonce = await web3.eth.getTransactionCount(sender, "latest");
  const gasPrice = await web3.eth.getGasPrice();
  const chainId = await web3.eth.getChainId();

  return {
    from: sender,
    to,
    value: web3.utils.toWei(value.toString(), "ether"),
    gas: 21000,
    gasPrice,
    nonce,
    chainId
  };
}
const signAndSendTransaction = async ({ sender, privateKey, to, value }) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);

    let chainId = await web3.eth.getChainId();
    chainId = Number(chainId);
    console.log("✅ Current Chain ID:", chainId);

    if (chainId !== 11155111) {
      throw new Error("❌ Incorrect network! Please switch to Sepolia.");
    }

    if (!web3.utils.isAddress(to)) {
      throw new Error("❌ Invalid recipient address.");
    }

    const senderBalanceWei = await web3.eth.getBalance(sender);
    const senderBalanceEth = web3.utils.fromWei(senderBalanceWei, "ether");

    console.log(`💰 Sender Balance: ${senderBalanceEth} ETH`);

    const gasPrice = await web3.eth.getGasPrice();
    const increasedGasPrice = BigInt(gasPrice) * BigInt(120) / BigInt(100); // Increase by 20%
    
    const ethValue = web3.utils.toWei(value.toString(), "ether");
    
    const gasLimit = await web3.eth.estimateGas({
      from: sender,
      to,
      value: 10,
    });

    // Check if sender has enough balance for transaction + gas
    if (BigInt(senderBalanceWei) < BigInt(ethValue) + BigInt(gasLimit) * increasedGasPrice) {
      throw new Error("❌ Insufficient balance for gas fees and transaction value.");
    }

    const tx = {
      from: sender,
      to,
      value: ethValue,
      gasPrice,
      gas: gasLimit,
      chainId: 11155111, 
    };

    console.log("🚀 Sending transaction:", tx);

    const signedTx = await account.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("✅ Transaction successful! Hash:", receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error("❌ Transaction failed:", error);
    throw new Error(`Transaction signing failed: ${error.message}`);
  }
};



/**
 * @desc Create ERC-20 Token transaction (User signs in MetaMask)
 * @param {Object} txData - Transaction details
 * @returns {Object} Unsigned transaction object
 */
async function createTokenTransaction({ sender, to, value, tokenContract }) {
  if (!sender) throw new Error("Sender address is required");

  const token = new web3.eth.Contract(erc20Abi, tokenContract);
  const decimals = await token.methods.decimals().call();
  const adjustedValue = BigInt(value) * BigInt(10) ** BigInt(decimals);


  const data = token.methods.transfer(to, adjustedValue.toString()).encodeABI();
  const gas = await token.methods.transfer(to, adjustedValue.toString()).estimateGas({ from: sender });
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(sender, "latest");
  const chainId = await web3.eth.getChainId();

  return {
    from: sender,
    to: tokenContract,
    data,
    gas,
    gasPrice,
    nonce,
    chainId
  };
}

/**
 * @desc Fetch transaction details
 * @param {String} txHash - Transaction hash
 * @returns {Object} Transaction details
 */
async function getTransactionDetails(txHash) {
  try {
    const txDetails = await web3.eth.getTransaction(txHash);
    if (!txDetails) {
      throw new Error("Transaction not found");
    }
    return txDetails;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw new Error("Failed to fetch transaction details");
  }
}

module.exports = { createEthTransaction, createTokenTransaction, getTransactionDetails,signAndSendTransaction };
