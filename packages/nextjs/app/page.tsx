"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { toast } from "react-hot-toast";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const {
    data: proposals,
    isLoading: isLoadingProposals,
    refetch: refetchProposals,
  } = useScaffoldReadContract({
    contractName: "ProposalContract",
    functionName: "getProposals",
  });

  const { writeContractAsync: writeProposalContractAsync } = useScaffoldWriteContract({
    contractName: "ProposalContract",
  });

  const handleSubmitProposal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tx = await writeProposalContractAsync({
      functionName: "submitProposal",
      args: [proposalTitle, proposalDescription],
    });

    if (tx) {
      setProposalTitle("");
      setProposalDescription("");
      toast.success("Proposal submitted successfully");
      refetchProposals();
    }
  };

  return (
    <div className="flex items-center flex-col grow pt-10">
      <h1 className="text-4xl font-bold">Proposals</h1>
      <form className="flex flex-col gap-4 m-8 p-8 bg-base-100" onSubmit={handleSubmitProposal}>
        <input
          className="border border-1 border-primary p-2"
          type="text"
          placeholder="Proposal Title"
          value={proposalTitle}
          onChange={e => setProposalTitle(e.target.value)}
        />
        <input
          className="border border-1 border-primary p-2"
          type="text"
          placeholder="Proposal Description"
          value={proposalDescription}
          onChange={e => setProposalDescription(e.target.value)}
        />
        <button className="bg-primary rounded-md px-4 py-2" type="submit">
          Submit Proposal
        </button>
      </form>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Proposals</h2>
        <div className="flex flex-col gap-1">
          {isLoadingProposals ? (
            <p>Loading...</p>
          ) : (
            proposals?.map((proposal: { title: string; description: string }, index: number) => (
              <div key={index} className="p-2 border-b border-base-100">
                <h3 className="text-lg font-bold">
                  #{index} - {proposal.title}
                </h3>
                <p>{proposal.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
