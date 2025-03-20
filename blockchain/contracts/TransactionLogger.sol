// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionLogger {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string tokenSymbol;
        uint256 timestamp;
        bytes32 txHash;
    }

    mapping(bytes32 => Transaction) public transactions;
    bytes32[] public transactionIds;

    event TransactionRecorded(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        string tokenSymbol,
        uint256 timestamp,
        bytes32 txHash
    );

    function recordTransaction(
        address _receiver,
        uint256 _amount,
        string memory _tokenSymbol,
        bytes32 _txHash
    ) public {
        require(transactions[_txHash].timestamp == 0, "Transaction already recorded");

        transactions[_txHash] = Transaction(
            msg.sender,
            _receiver,
            _amount,
            _tokenSymbol,
            block.timestamp,
            _txHash
        );
        transactionIds.push(_txHash);

        emit TransactionRecorded(msg.sender, _receiver, _amount, _tokenSymbol, block.timestamp, _txHash);
    }

    function getTransaction(bytes32 _txHash) public view returns (Transaction memory) {
        require(transactions[_txHash].timestamp != 0, "Transaction does not exist");
        return transactions[_txHash];
    }
}
