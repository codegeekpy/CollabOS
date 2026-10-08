import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import {
  getProjectById,
  getMilestonesByProject,
  getEscrows,
  reserveEscrow,
  updateEscrow,
} from "../lib/api";

import {
  createOnChainEscrow,
  fundOnChainEscrow,
  readOnChainEscrow,
  CONTRACT_ADDRESS,
} from "../lib/escrow";


function Workspace() {
  const { projectId } = useParams();

  const [escrows, setEscrows] = useState([]);
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        const [projectData, milestoneData, escrowData] =
          await Promise.all([
            getProjectById(projectId),
            getMilestonesByProject(projectId),
            getEscrows(),
          ]);

        setProject(projectData);
        setMilestones(milestoneData);
        setEscrows(escrowData);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspace();
  }, [projectId]);

  const statusVariants = {
    completed: "success",
    in_progress: "warning",
    pending: "neutral",
  };

  const formatStatus = (status) => {
    return status
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const shortenAddress = (address) => {
    if (!address) return "Not assigned";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Escrows belonging to this project
  const projectEscrows = escrows.filter(
    (escrow) => escrow.project?._id === projectId
  );

  // Total original amount of funded/released escrows
  const escrowFundedAmount = projectEscrows
    .filter((escrow) =>
      ["funded", "released"].includes(escrow.status)
    )
    .reduce(
      (total, escrow) => total + Number(escrow.amount || 0),
      0
    );

  const handleCreateEscrow = async (milestone) => {
    try {
      setError("");

      // Prevent duplicate escrow for the same milestone
      const existingEscrow = projectEscrows.find(
        (escrow) => escrow.milestone?._id === milestone._id
      );

      if (existingEscrow) {
        throw new Error("An escrow already exists for this milestone.");
      }

      // Get the assigned contributor
      const contributor = project.contributors?.[0];

      if (!contributor) {
        throw new Error("No contributor assigned to this project.");
      }

      if (!contributor.walletAddress) {
        throw new Error("Contributor does not have a wallet address.");
      }

      // 1. Reserve escrow ID in MongoDB
      const escrow = await reserveEscrow({
        project: project._id,
        milestone: milestone._id,
        client: project.owner?._id || project.owner,
        contributor: contributor._id || contributor,
        amount: milestone.amount,
      });

      // 2. Create escrow on blockchain
      const result = await createOnChainEscrow(
        escrow.onChainEscrowId,
        contributor.walletAddress
      );

      // 3. Save blockchain information
      await updateEscrow(escrow._id, {
        contractAddress: CONTRACT_ADDRESS,
      });

      console.log("Escrow created on-chain:", result.hash);

      // 4. Refresh escrow data
      const updatedEscrows = await getEscrows();
      setEscrows(updatedEscrows);
    } catch (error) {
      console.error("Failed to create escrow:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading workspace...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400">
        {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 text-center text-slate-400">
        Project not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500">
          Workspace
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {project.name}
            </h1>

            <p className="mt-2 text-slate-400">
              {project.description}
            </p>
          </div>

          <Badge
            variant={
              project.status === "active"
                ? "success"
                : "neutral"
            }
          >
            {formatStatus(project.status)}
          </Badge>
        </div>
      </div>

      {/* Project overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Budget */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Project Budget
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            ${project.budget}
          </p>
        </div>

        {/* Escrow */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Escrow Funded
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {escrowFundedAmount} ETH
          </p>
        </div>

        {/* Milestones */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Milestones
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {milestones.length}
          </p>
        </div>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Milestones */}
        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Milestones
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Track project progress and payouts.
              </p>
            </div>

            <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-800">
              + Add Milestone
            </button>
          </div>

          {milestones.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
              <p className="text-slate-400">
                No milestones found for this project.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone._id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-medium text-white">
                      {milestone.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {milestone.description}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Milestone #
                      {milestone._id.slice(-6)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant={
                        statusVariants[milestone.status] ||
                        "neutral"
                      }
                    >
                      {formatStatus(milestone.status)}
                    </Badge>

                    <span className="font-semibold text-white">
                      ${milestone.amount}
                    </span>

                    {(() => {
                      const escrow = projectEscrows.find(
                        (item) => item.milestone?._id === milestone._id
                      );

                      if (!escrow) {
                        return (
                          <button
                            onClick={() => handleCreateEscrow(milestone)}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                          >
                            Create Escrow
                          </button>
                        );
                      }

                      if (escrow.status === "created") {
                        return (
                          <button
                            onClick={async () => {
                              try {
                                setError("");

                                const onChainEscrow = await readOnChainEscrow(
                                  escrow.onChainEscrowId
                                );

                                console.log("ON-CHAIN ESCROW:", {
                                  id: escrow.onChainEscrowId,
                                  client: onChainEscrow.client,
                                  contributor: onChainEscrow.contributor,
                                  amount: onChainEscrow.amount.toString(),
                                  funded: onChainEscrow.funded,
                                  released: onChainEscrow.released,
                                });

                                const result = await fundOnChainEscrow(
                                  escrow.onChainEscrowId
                                );

                                await updateEscrow(escrow._id, {
                                  status: "funded",
                                  fundingTxHash: result.hash,
                                });

                                const updatedEscrows = await getEscrows();
                                setEscrows(updatedEscrows);
                              } catch (error) {
                                console.error("Failed to fund escrow:", error);
                                setError(error.message);
                              }
                            }}
                            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                          >
                            Fund Escrow
                          </button>
                        );
                      }

                      if (escrow.status === "funded") {
                        return (
                          <Badge variant="warning">
                            Funded
                          </Badge>
                        );
                      }

                      if (escrow.status === "released") {
                        return (
                          <Badge variant="success">
                            Released
                          </Badge>
                        );
                      }

                      return null;
                    })()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h2 className="text-lg font-semibold text-white">
            Project Information
          </h2>

          <div className="mt-5 space-y-5">
            {/* Owner */}
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Owner
              </p>

              <p className="mt-1 text-sm text-white">
                {project.owner?.walletAddress
                  ? shortenAddress(
                    project.owner.walletAddress
                  )
                  : project.owner?.name || "Unknown"}
              </p>
            </div>

            {/* Contributors */}
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Contributors
              </p>

              <p className="mt-1 text-sm text-white">
                {project.contributors?.length || 0}
              </p>
            </div>

            {/* Network */}
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Network
              </p>

              <p className="mt-1 text-sm text-white">
                Sepolia
              </p>
            </div>

            {/* Created */}
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Created
              </p>

              <p className="mt-1 text-sm text-white">
                {new Date(
                  project.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Escrows */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Escrows
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Blockchain-backed payments for this project.
          </p>
        </div>

        {projectEscrows.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <p className="text-sm text-slate-400">
              No escrow has been created for this project yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {projectEscrows.map((escrow) => (
              <div
                key={escrow._id}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium text-white">
                      Escrow #{escrow.onChainEscrowId}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {escrow.amount} {escrow.token}
                    </p>
                  </div>

                  <Badge
                    variant={
                      escrow.status === "released"
                        ? "success"
                        : escrow.status === "funded"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {formatStatus(escrow.status)}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {/* Milestone */}
                  <div>
                    <p className="text-xs text-slate-500">
                      Milestone
                    </p>

                    <p className="mt-1 text-sm text-white">
                      {escrow.milestone?.title ||
                        "Unknown"}
                    </p>
                  </div>

                  {/* Network */}
                  <div>
                    <p className="text-xs text-slate-500">
                      Network
                    </p>

                    <p className="mt-1 text-sm text-white">
                      {escrow.chain}
                    </p>
                  </div>
                </div>

                {/* Funding transaction */}
                {escrow.fundingTxHash && (
                  <div className="mt-4 border-t border-slate-800 pt-4">
                    <a
                      href={`https://sepolia.etherscan.io/tx/${escrow.fundingTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      View funding transaction →
                    </a>
                  </div>
                )}

                {/* Release transaction */}
                {escrow.releaseTxHash && (
                  <div
                    className={
                      escrow.fundingTxHash
                        ? "mt-2"
                        : "mt-4 border-t border-slate-800 pt-4"
                    }
                  >
                    <a
                      href={`https://sepolia.etherscan.io/tx/${escrow.releaseTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      View release transaction →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Activity tracking will be connected to
            submissions and blockchain transactions next.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Workspace;