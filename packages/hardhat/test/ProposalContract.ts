import { expect } from "chai";
import { ethers } from "hardhat";
import { ProposalContract } from "../typechain-types";

describe("ProposalContract", function () {
  // We define a fixture to reuse the same setup in every test.
  let proposalContract: ProposalContract;
  before(async () => {
    const proposalContractFactory = await ethers.getContractFactory("ProposalContract");
    proposalContract = (await proposalContractFactory.deploy()) as ProposalContract;
    await proposalContract.waitForDeployment();
  });
  describe("Deployment", function () {
    it("Should allow sending a proposal", async function () {
      const newGreeting = ["Hire Gil ;P", "He is good!"];
      await proposalContract.submitProposal(newGreeting[0], newGreeting[1]);
      expect(await proposalContract.getProposals()).to.deep.equal([newGreeting]);
    });
  });
});
