// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract BitcoinEscrow {
    struct Listing {
        address seller;
        uint256 price; // Price in ETH or ERC-20 tokens
        address tokenAddress; // Payment token (ETH if address(0))
        bool isSold;
        bool isPaid;
        address buyer;
    }

    mapping(bytes32 => Listing) public listings;

    event BitcoinListed(
        bytes32 listingId,
        address indexed seller,
        uint256 price,
        address tokenAddress
    );
    event PaymentReceived(bytes32 listingId, address indexed buyer);
    event BitcoinReleased(bytes32 listingId);

    modifier onlySeller(bytes32 _listingId) {
        require(msg.sender == listings[_listingId].seller, "Not the seller");
        _;
    }

    // Seller lists BTC for sale
    function listBitcoin(uint256 _price, address _tokenAddress) public {
        bytes32 listingId = keccak256(
            abi.encodePacked(msg.sender, _price, _tokenAddress, block.timestamp)
        );
        listings[listingId] = Listing(
            msg.sender,
            _price,
            _tokenAddress,
            false,
            false,
            address(0)
        );

        emit BitcoinListed(listingId, msg.sender, _price, _tokenAddress);
    }

    // Buyer pays with crypto (ETH or ERC-20)
    function buyWithCrypto(bytes32 _listingId) public payable {
        Listing storage listing = listings[_listingId];
        require(!listing.isSold, "Already sold");
        require(listing.buyer == address(0), "Buyer already assigned");

        if (listing.tokenAddress == address(0)) {
            // Buyer pays in ETH
            require(msg.value == listing.price, "Incorrect ETH amount");
        } else {
            // Buyer pays in ERC-20 token
            IERC20 token = IERC20(listing.tokenAddress);
            require(
                token.transferFrom(msg.sender, address(this), listing.price),
                "Token transfer failed"
            );
        }

        listing.buyer = msg.sender;
        listing.isPaid = true;

        emit PaymentReceived(_listingId, msg.sender);
    }

    // Seller confirms fiat payment manually (can also set buyer)
    function confirmFiatPayment(
        bytes32 _listingId,
        address _buyer
    ) public onlySeller(_listingId) {
        Listing storage listing = listings[_listingId];
        require(!listing.isSold, "Already sold");
        require(!listing.isPaid, "Payment already completed");
        require(_buyer != address(0), "Invalid buyer address"); // Ensures a valid buyer is provided

        listing.buyer = _buyer;
        listing.isPaid = true;

        emit PaymentReceived(_listingId, _buyer);
    }

    // Seller releases Bitcoin to the buyer
    function releaseBitcoin(bytes32 _listingId) public onlySeller(_listingId) {
        Listing storage listing = listings[_listingId];
        require(listing.isPaid, "Payment not verified");
        require(!listing.isSold, "Already released");

        listing.isSold = true;

        // Payment transfer (ETH or Token)
        if (listing.tokenAddress == address(0)) {
            payable(listing.seller).transfer(listing.price);
        } else {
            IERC20 token = IERC20(listing.tokenAddress);
            require(
                token.transfer(listing.seller, listing.price),
                "Token transfer failed"
            );
        }

        emit BitcoinReleased(_listingId);
    }
}
