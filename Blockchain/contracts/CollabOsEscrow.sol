// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CollabOSEscrow {
    struct Escrow {
        address client;
        address contributor;
        uint256 amount;
        bool funded;
        bool released;
    }

    mapping(uint256 => Escrow) public escrows;

    event EscrowCreated(
        uint256 indexed escrowId,
        address indexed client,
        address indexed contributor,
        uint256 amount
    );

    event EscrowFunded(
        uint256 indexed escrowId,
        uint256 amount
    );

    event EscrowReleased(
        uint256 indexed escrowId,
        address indexed contributor,
        uint256 amount
    );

    function createEscrow(
        uint256 escrowId,
        address contributor
    ) external {
        require(escrows[escrowId].client == address(0), "Escrow exists");
        require(contributor != address(0), "Invalid contributor");

        escrows[escrowId] = Escrow({
            client: msg.sender,
            contributor: contributor,
            amount: 0,
            funded: false,
            released: false
        });

        emit EscrowCreated(
            escrowId,
            msg.sender,
            contributor,
            0
        );
    }

    function fundEscrow(uint256 escrowId) external payable {
        Escrow storage escrow = escrows[escrowId];

        require(escrow.client != address(0), "Escrow not found");
        require(msg.sender == escrow.client, "Only client");
        require(!escrow.funded, "Already funded");
        require(msg.value > 0, "Amount must be greater than zero");

        escrow.amount = msg.value;
        escrow.funded = true;

        emit EscrowFunded(escrowId, msg.value);
    }

    function releaseEscrow(uint256 escrowId) external {
        Escrow storage escrow = escrows[escrowId];

        require(escrow.client != address(0), "Escrow not found");
        require(msg.sender == escrow.client, "Only client");
        require(escrow.funded, "Escrow not funded");
        require(!escrow.released, "Already released");

        escrow.released = true;

        uint256 amount = escrow.amount;
        escrow.amount = 0;

        (bool success, ) = payable(escrow.contributor).call{
            value: amount
        }("");

        require(success, "Transfer failed");

        emit EscrowReleased(
            escrowId,
            escrow.contributor,
            amount
        );
    }

    function getEscrow(
        uint256 escrowId
    ) external view returns (
        address client,
        address contributor,
        uint256 amount,
        bool funded,
        bool released
    ) {
        Escrow memory escrow = escrows[escrowId];

        return (
            escrow.client,
            escrow.contributor,
            escrow.amount,
            escrow.funded,
            escrow.released
        );
    }
}