import Badge from "../components/ui/Badge";

function VerifyWork() {
  const submissions = [
    {
      id: 1,
      project: "Website Redesign",
      milestone: "Frontend Development",
      contributor: "0x39...F21B",
      amount: "0.15 ETH",
      status: "Pending Review",
      submitted: "2 hours ago",
    },
    {
      id: 2,
      project: "DeFi Dashboard",
      milestone: "Analytics Dashboard",
      contributor: "0x82...91AC",
      amount: "0.30 ETH",
      status: "Approved",
      submitted: "1 day ago",
    },
  ];

  const statusVariants = {
    "Pending Review": "warning",
    Approved: "success",
    Rejected: "error",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Verify Work
        </h1>

        <p className="mt-2 text-slate-400">
          Review milestone submissions before releasing escrow funds.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Pending Review
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            1
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Approved
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            1
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Awaiting Payout
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            0.15 ETH
          </p>
        </div>
      </div>

      {/* Submissions */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Milestone Submissions
        </h2>

        <div className="mt-4 space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-white">
                      {submission.milestone}
                    </h3>

                    <Badge
                      variant={statusVariants[submission.status]}
                    >
                      {submission.status}
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {submission.project}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>
                      Contributor: {submission.contributor}
                    </span>

                    <span>
                      Submitted: {submission.submitted}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold text-white">
                    {submission.amount}
                  </span>

                  {submission.status === "Pending Review" && (
                    <>
                      <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
                        Reject
                      </button>

                      <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200">
                        Approve
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="text-sm text-slate-400">
                  Submission details, GitHub PR, proof of work,
                  and verification data will appear here.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerifyWork;