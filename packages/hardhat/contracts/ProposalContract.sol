//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * A smart contract that allows users to create proposals and retrieve a list of all proposals.
 * @author BuidlGuidl
 */
contract ProposalContract {
    struct Proposal {
        string title;
        string description;
    }

    // State Variables
    mapping(uint256 => Proposal) public proposals; // starts at 0
    uint256 public totalCounter = 0;

    // Events: a way to emit log statements from smart contract that can be listened to by external parties
    event ProposalSubmitted(uint256 indexed id, string title, string description);

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor() {
    }

    /**
     * Function that allows anyone to send a proposal
     *
     * @param _title (string memory) - new proposal title to save on the contract
     */
    function submitProposal(string memory _title, string memory _description) public {
        proposals[totalCounter] = Proposal(_title, _description);
        totalCounter += 1;

        // emit: keyword used to trigger an event
        emit ProposalSubmitted(totalCounter, _title, _description);
    }

    function getProposals() public view returns (Proposal[] memory) {
        Proposal[] memory proposalsList = new Proposal[](totalCounter);
        for (uint256 i = 0; i < totalCounter; i++) {
            proposalsList[i] = proposals[i];
        }
        return proposalsList;
    }
}
