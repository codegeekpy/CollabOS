import { useEffect, useState } from "react";
import Badge from "../components/ui/Badge";
import {
  getProjects,
  getMilestonesByProject,
  getSubmissionsByMilestone,
  updateSubmissionStatus,
  getEscrows,
  updateEscrow,
} from "../lib/api";

import { releaseOnChainEscrow } from "../lib/escrow";

function VerifyWork() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setError("");

      const projects = await getProjects();

      const allSubmissions = [];

      for (const project of projects) {
        const milestones = await getMilestonesByProject(
          project._id
        );

        for (const milestone of milestones) {
          const milestoneSubmissions =
            await getSubmissionsByMilestone(
              milestone._id
            );

          milestoneSubmissions.forEach((submission) => {
            allSubmissions.push({
              ...submission,
              project,
              milestone,
            });
          });
        }
      }

      setSubmissions(allSubmissions);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (submission, status) => {
  try {
    setProcessingId(submission._id);
    setError("");

    // Reject does not involve blockchain
    if (status === "rejected") {
      await updateSubmissionStatus(
        submission.milestone._id,
        submission._id,
        "rejected"
      );

      await loadSubmissions();
      return;
    }

    // 1. Find escrow belonging to this milestone
    const escrows = await getEscrows();

    const escrow = escrows.find(
      (item) =>
        item.milestone?._id === submission.milestone._id
    );

    if (!escrow) {
      throw new Error(
        "No escrow found for this milestone."
      );
    }

    if (escrow.status === "released") {
      throw new Error(
        "This escrow has already been released."
      );
    }

    // 2. Approve submission in MongoDB
    await updateSubmissionStatus(
      submission.milestone._id,
      submission._id,
      "approved"
    );

    // 3. Ask MetaMask to release the escrow
    const result = await releaseOnChainEscrow(
      escrow.onChainEscrowId
    );

    // 4. Store blockchain transaction in MongoDB
    await updateEscrow(escrow._id, {
      status: "released",
      releaseTxHash: result.hash,
    });

    // 5. Refresh UI
    await loadSubmissions();

  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    setProcessingId(null);
  }
};
  const statusVariants = {
    pending: "warning",
    approved: "success",
    rejected: "error",
  };

  const formatStatus = (status) => {
    return status
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const shortenAddress = (address) => {
    if (!address) return "Unknown";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const pendingCount = submissions.filter(
    (submission) => submission.status === "pending"
  ).length;

  const approvedCount = submissions.filter(
    (submission) => submission.status === "approved"
  ).length;

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400">
        Loading submissions...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Verify Work
        </h1>

        <p className="mt-2 text-slate-400">
          Review milestone submissions before releasing
          escrow funds.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Pending Review
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Approved
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {approvedCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Total Submissions
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {submissions.length}
          </p>
        </div>
      </div>

      {/* Submissions */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Milestone Submissions
        </h2>

        {submissions.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <p className="text-slate-400">
              No submissions found.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {submissions.map((submission) => {
              const isProcessing =
                processingId === submission._id;

              return (
                <div
                  key={submission._id}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-white">
                          {submission.milestone?.title}
                        </h3>

                        <Badge
                          variant={
                            statusVariants[
                              submission.status
                            ] || "neutral"
                          }
                        >
                          {formatStatus(
                            submission.status
                          )}
                        </Badge>
                      </div>

                      <p className="mt-2 text-sm text-slate-400">
                        {submission.project?.name}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span>
                          Contributor:{" "}
                          {submission.contributor
                            ?.walletAddress
                            ? shortenAddress(
                                submission.contributor
                                  .walletAddress
                              )
                            : "Unknown"}
                        </span>

                        <span>
                          Submitted:{" "}
                          {new Date(
                            submission.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-white">
                        {submission.milestone?.amount} ETH
                      </span>

                      {submission.status ===
                        "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(
                                submission,
                                "rejected"
                              )
                            }
                            disabled={isProcessing}
                            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isProcessing
                              ? "Processing..."
                              : "Reject"}
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(
                                submission,
                                "approved"
                              )
                            }
                            disabled={isProcessing}
                            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isProcessing
                              ? "Processing..."
                              : "Approve"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <p className="text-sm text-slate-300">
                      {submission.description}
                    </p>

                    {submission.proofUrl && (
                      <a
                        href={submission.proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm text-blue-400 hover:text-blue-300"
                      >
                        View proof →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyWork;