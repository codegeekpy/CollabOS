import Badge from "../components/ui/Badge";

function Escrows() {
  const escrows = [
    {
      id: "ESC-001",
      project: "Website Redesign",
      amount: "0.25 ETH",
      status: "Funded",
      network: "Sepolia",
      created: "Oct 4, 2026",
    },
    {
      id: "ESC-002",
      project: "DeFi Dashboard",
      amount: "0.60 ETH",
      status: "Locked",
      network: "Sepolia",
      created: "Oct 3, 2026",
    },
    {
      id: "ESC-003",
      project: "Mobile App",
      amount: "0.40 ETH",
      status: "Released",
      network: "Sepolia",
      created: "Oct 1, 2026",
    },
  ];

  const statusVariants = {
    Funded: "success",
    Locked: "warning",
    Released: "info",
    Disputed: "error",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Escrows</h1>

        <p className="mt-2 text-slate-400">
          Track funds locked against your projects and milestones.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Total Locked</p>
          <p className="mt-2 text-2xl font-bold text-white">
            0.85 ETH
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Active Escrows</p>
          <p className="mt-2 text-2xl font-bold text-white">
            2
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Released</p>
          <p className="mt-2 text-2xl font-bold text-white">
            0.40 ETH
          </p>
        </div>
      </div>

      {/* Escrow list */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Escrow Transactions
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <div className="hidden grid-cols-5 gap-4 border-b border-slate-800 bg-slate-900 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500 md:grid">
            <span>Escrow</span>
            <span>Project</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Network</span>
          </div>

          <div className="divide-y divide-slate-800">
            {escrows.map((escrow) => (
              <div
                key={escrow.id}
                className="grid grid-cols-1 gap-3 bg-slate-950/40 px-5 py-4 md:grid-cols-5 md:items-center md:gap-4"
              >
                <div>
                  <p className="font-medium text-white">
                    {escrow.id}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {escrow.created}
                  </p>
                </div>

                <p className="text-sm text-slate-300">
                  {escrow.project}
                </p>

                <p className="font-semibold text-white">
                  {escrow.amount}
                </p>

                <div>
                  <Badge variant={statusVariants[escrow.status]}>
                    {escrow.status}
                  </Badge>
                </div>

                <p className="text-sm text-slate-400">
                  {escrow.network}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty-state/action placeholder */}
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-6">
        <h3 className="font-semibold text-white">
          Smart Escrow
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Funds will be deposited into the escrow smart contract
          when wallet integration is connected.
        </p>
      </div>
    </div>
  );
}

export default Escrows;