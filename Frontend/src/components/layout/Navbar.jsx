import { useWallet } from "../../hooks/useWallet";
// import {
//     createOnChainEscrow,
//     readOnChainEscrow,
//     fundOnChainEscrow,
//     releaseOnChainEscrow,
// } from "../../lib/escrow";


function Navbar() {
    const {
        account,
        isSepolia,
        isConnecting,
        connectWallet,
    } = useWallet();

    const shortenAddress = (address) => {
        if (!address) return "Connect Wallet";

        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleConnect = async () => {
        try {
            await connectWallet();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // testing purpose
    // const testContract = async () => {
    //     try {
    //         const escrow = await readOnChainEscrow(1);

    //         console.log("On-chain escrow:", escrow);
    //     } catch (error) {
    //         console.error("Contract read failed:", error);
    //     }
    // };
    // const testCreateEscrow = async () => {
    //     try {
    //         const contributor =
    //             "0x7F8Db27eb3215631A3a3E4CD14F948D6A8007336";

    //         const result = await createOnChainEscrow(
    //             1,
    //             contributor
    //         );

    //         console.log("Escrow created:", result.hash);

    //         const escrow = await readOnChainEscrow(1);

    //         console.log("Escrow:", escrow);
    //     } catch (error) {
    //         console.error("Escrow creation failed:", error);
    //     }
    // };
    // const testFundEscrow = async () => {
    //     try {
    //         const result = await fundOnChainEscrow(1, "0.001");

    //         console.log("Escrow funded:", result.hash);

    //         const escrow = await readOnChainEscrow(1);

    //         console.log("Funded escrow:", escrow);
    //     } catch (error) {
    //         console.error("Escrow funding failed:", error);
    //     }
    // };
    // const testReleaseEscrow = async () => {
    //     try {
    //         const result = await releaseOnChainEscrow(1);

    //         console.log("Escrow released:", result.hash);

    //         const escrow = await readOnChainEscrow(1);

    //         console.log("Released escrow:", escrow);
    //     } catch (error) {
    //         console.error("Escrow release failed:", error);
    //     }
    // };
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
            <div>
                <h2 className="text-sm font-medium text-slate-300">
                    CollabOS Workspace
                </h2>
            </div>

            <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isConnecting
                    ? "Connecting..."
                    : account
                        ? `${shortenAddress(account)}${isSepolia ? " • Sepolia" : ""}`
                        : "Connect Wallet"}
            </button>
            {/* <button
                onClick={testContract}
                className="ml-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
                Test Contract
            </button>
            <button
                onClick={testCreateEscrow}
                className="ml-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
                Create Test Escrow
            </button>
            <button
                onClick={testFundEscrow}
                className="ml-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
                Fund Test Escrow
            </button>
            <button
                onClick={testReleaseEscrow}
                className="ml-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800"
            >
                Release Test Escrow
            </button> */}
        </header>
    );
}

export default Navbar;