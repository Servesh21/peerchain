// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PeerToPeerEscrow {
    struct Escrow {
        address sender;
        address receiver;
        uint256 amount;
        bool isCompleted;
    }

    mapping(bytes32 => Escrow) public escrows;
    
    event EscrowCreated(bytes32 escrowId, address sender, address receiver, uint256 amount);
    event EscrowCompleted(bytes32 escrowId);

    function createEscrow(address _receiver, uint256 _amount) public payable {
        require(msg.value == _amount, "Incorrect ETH sent");

        bytes32 escrowId = keccak256(abi.encodePacked(msg.sender, _receiver, block.timestamp));
        escrows[escrowId] = Escrow(msg.sender, _receiver, _amount, false);

        emit EscrowCreated(escrowId, msg.sender, _receiver, _amount);
    }

    function releaseFunds(bytes32 _escrowId) public {
        Escrow storage e = escrows[_escrowId];
        require(msg.sender == e.sender, "Only sender can release funds");
        require(!e.isCompleted, "Escrow already completed");

        payable(e.receiver).transfer(e.amount);
        e.isCompleted = true;

        emit EscrowCompleted(_escrowId);
    }
}
