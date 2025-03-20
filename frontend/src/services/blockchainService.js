// blockchainService.js
import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
}

export const getAccount = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

export const sendTransaction = async (to, value) => {
  const account = await getAccount();
  return await web3.eth.sendTransaction({
    from: account,
    to,
    value: web3.utils.toWei(value, "ether"),
  });
};
