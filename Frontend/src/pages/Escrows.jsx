import { useEffect, useState } from "react";
import { getEscrows } from "../lib/api";

function Escrows() {
    const [escrows, setEscrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEscrows = async () => {
            try {
                const data = await getEscrows();
                setEscrows(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadEscrows();
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-slate-400">
                Loading escrows...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">
                    Escrows
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                    Track blockchain-backed project payments.
                </p>
            </div>

            {escrows.length === 0 ? (
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
                    <p className="text-slate-400">
                        No escrows found.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {escrows.map((escrow) => (
                        <div
                            key={escrow._id}
                            className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
                        >
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <h2 className="font-medium text-white">
                                        Escrow #{escrow.onChainEscrowId}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        {escrow.project?.name || "Unknown project"}
                                    </p>
                                </div>

                                <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-xs capitalize text-slate-300">
                                    {escrow.status}
                                </span>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <p className="text-xs text-slate-500">
                                        Amount
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        {escrow.amount} {escrow.token}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Chain
                                    </p>
                                    <p className="mt-1 text-sm text-white capitalize">
                                        {escrow.chain}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Client
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        {escrow.client?.name || "Unknown"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Contributor
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        {escrow.contributor?.name || "Unknown"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                                {escrow.fundingTxHash && (
                                    <div className="text-sm">
                                        <span className="text-slate-500">
                                            Funding TX:{" "}
                                        </span>
                                        <a
                                            href={`https://sepolia.etherscan.io/tx/${escrow.fundingTxHash}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="break-all text-blue-400 hover:text-blue-300"
                                        >
                                            {escrow.fundingTxHash}
                                        </a>
                                    </div>
                                )}

                                {escrow.releaseTxHash && (
                                    <div className="text-sm">
                                        <span className="text-slate-500">
                                            Release TX:{" "}
                                        </span>
                                        <a
                                            href={`https://sepolia.etherscan.io/tx/${escrow.releaseTxHash}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="break-all text-blue-400 hover:text-blue-300"
                                        >
                                            {escrow.releaseTxHash}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Escrows;