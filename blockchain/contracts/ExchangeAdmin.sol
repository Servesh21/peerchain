// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExchangeAdmin {
    address public owner;
    mapping(address => bool) public approvedExchanges;

    event ExchangeAdded(address indexed exchange);
    event ExchangeRemoved(address indexed exchange);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addExchange(address _exchange) public onlyOwner {
        approvedExchanges[_exchange] = true;
        emit ExchangeAdded(_exchange);
    }

    function removeExchange(address _exchange) public onlyOwner {
        approvedExchanges[_exchange] = false;
        emit ExchangeRemoved(_exchange);
    }

    function isApprovedExchange(address _exchange) public view returns (bool) {
        return approvedExchanges[_exchange];
    }
}
