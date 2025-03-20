// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExchangeAdmin {
    address public owner;
    mapping(address => bool) public approvedSellers;

    event SellerApproved(address indexed seller);
    event SellerRemoved(address indexed seller);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function approveSeller(address _seller) public onlyOwner {
        approvedSellers[_seller] = true;
        emit SellerApproved(_seller);
    }

    function removeSeller(address _seller) public onlyOwner {
        approvedSellers[_seller] = false;
        emit SellerRemoved(_seller);
    }

    function isApprovedSeller(address _seller) public view returns (bool) {
        return approvedSellers[_seller];
    }
}
