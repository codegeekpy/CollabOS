import Badge from "../components/ui/Badge";

function BlockchainExplorer() {
  const transactions = [
    {
      hash: "0x7a2f...91c4",
      type: "Escrow Funded",
      project: "Website Redesign",
      amount: "0.25 ETH",
      status: "Confirmed",
      block: "#8,421,902",
      time: "12 min ago",
    },
    {
      hash: "0x91bd...4ef2",
      type: "Milestone Released",
      project: "DeFi Dashboard",
      amount: "0.30 ETH",
      status: "Confirmed",
      block: "#8,421,701",
      time: "1 hour ago",
    },
    {
      hash: "0x43ca...8b17",
      type: "Escrow Funded",
      project: "Mobile App",
      amount: "0.40 ETH",
      status: "Confirmed",
      block: "#8,420,884",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Blockchain Explorer
        </h1>

        <p className="mt-2 text-slate-400">
          Track CollabOS escrow and milestone transactions on-chain.
        </p>
      </div>

      {/* Network */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Connected Network
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

            <span className="font-semibold text-white">
              Sepolia Testnet
            </span>

            <Badge variant="success">
              Testnet
            </Badge>
          </div>
        </div>

        <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800">
          View Explorer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Transactions
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            24
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Escrow Volume
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            4.85 ETH
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">
            Contract
          </p>

          <p className="mt-2 font-mono text-sm text-white">
            0x8F...A921
          </p>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Recent Transactions
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-800">
          <div className="hidden grid-cols-6 gap-4 border-b border-slate-800 bg-slate-900 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500 lg:grid">
            <span>Transaction</span>
            <span>Type</span>
            <span>Project</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Block</span>
          </div>

          <div className="divide-y divide-slate-800">
            {transactions.map((transaction) => (
              <div
                key={transaction.hash}
                className="grid grid-cols-1 gap-3 bg-slate-950/40 px-5 py-4 lg:grid-cols-6 lg:items-center lg:gap-4"
              >
                <div>
                  <p className="font-mono text-sm text-white">
                    {transaction.hash}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {transaction.time}
                  </p>
                </div>

                <p className="text-sm text-slate-300">
                  {transaction.type}
                </p>

                <p className="text-sm text-slate-300">
                  {transaction.project}
                </p>

                <p className="font-semibold text-white">
                  {transaction.amount}
                </p>

                <div>
                  <Badge variant="success">
                    {transaction.status}
                  </Badge>
                </div>

                <p className="font-mono text-sm text-slate-400">
                  {transaction.block}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contract */}
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-6">
        <p className="text-sm text-slate-500">
          Escrow Contract
        </p>

        <p className="mt-2 break-all font-mono text-sm text-white">
          0x8F42A7D91B3C4E7F21A9B82D6C91E4A921
        </p>

        <p className="mt-3 text-sm text-slate-400">
          Smart contract interactions will appear here once
          wallet and contract integration is connected.
        </p>
      </div>
    </div>
  );
}

export default BlockchainExplorer;