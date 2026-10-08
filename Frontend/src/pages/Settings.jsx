import { useEffect, useState } from "react";
import { Copy, Check, RefreshCw, Wallet, Shield, Network } from "lucide-react";

const CONTRACT_ADDRESS =
  "0x645aB33263798dd2a0B11d399ad6dc2228f2CfA8";

const SEPOLIA_CHAIN_ID = "0xaa36a7";

function Settings() {
  const [name, setName] = useState(
    localStorage.getItem("collabos_profile_name") || "Project Owner"
  );

  const [walletAddress, setWalletAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(true);

  const loadWallet = async () => {
    try {
      setLoadingWallet(true);

      if (!window.ethereum) {
        setWalletAddress("");
        setChainId("");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setWalletAddress(accounts[0] || "");
      setChainId(currentChainId || "");
    } catch (error) {
      console.error("Failed to load wallet:", error);
    } finally {
      setLoadingWallet(false);
    }
  };

  useEffect(() => {
    loadWallet();

    if (!window.ethereum) {
      return;
    }

    const handleAccountsChanged = (accounts) => {
      setWalletAddress(accounts[0] || "");
    };

    const handleChainChanged = (newChainId) => {
      setChainId(newChainId);
    };

    window.ethereum.on(
      "accountsChanged",
      handleAccountsChanged
    );

    window.ethereum.on(
      "chainChanged",
      handleChainChanged
    );

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );

      window.ethereum.removeListener(
        "chainChanged",
        handleChainChanged
      );
    };
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "collabos_profile_name",
      name.trim() || "Project Owner"
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleCopyWallet = async () => {
    if (!walletAddress) return;

    try {
      await navigator.clipboard.writeText(walletAddress);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy wallet address:", error);
    }
  };

  const shortenAddress = (address) => {
    if (!address) return "Not connected";

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const networkName =
    chainId === SEPOLIA_CHAIN_ID
      ? "Sepolia Testnet"
      : chainId
        ? `Chain ${parseInt(chainId, 16)}`
        : "Not connected";

  const networkStatus =
    chainId === SEPOLIA_CHAIN_ID
      ? "Connected"
      : chainId
        ? "Wrong Network"
        : "Not connected";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500">
          Account & Protocol
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your CollabOS profile, wallet, and blockchain
          configuration.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-slate-800 p-3">
            <Shield
              size={20}
              className="text-slate-300"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Profile
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Basic information used throughout the CollabOS
              interface.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Display Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Your name"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Stored locally for now. Backend profile
              authentication will be added later.
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Role
            </label>

            <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
              <p className="text-sm font-medium text-white">
                Client
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Project owner and escrow administrator
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            {saved ? "Saved" : "Save Changes"}
          </button>

          {saved && (
            <span className="flex items-center gap-2 text-sm text-green-400">
              <Check size={16} />
              Changes saved
            </span>
          )}
        </div>
      </section>

      {/* Wallet */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-slate-800 p-3">
              <Wallet
                size={20}
                className="text-slate-300"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Wallet
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your connected Web3 wallet used for escrow
                transactions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadWallet}
            disabled={loadingWallet}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loadingWallet ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {/* Wallet address */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Wallet Address
            </p>

            <div className="mt-2 flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-white">
                  {walletAddress || "No wallet connected"}
                </p>

                {walletAddress && (
                  <p className="mt-1 text-xs text-slate-500">
                    {shortenAddress(walletAddress)}
                  </p>
                )}
              </div>

              {walletAddress && (
                <button
                  type="button"
                  onClick={handleCopyWallet}
                  className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Network */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center gap-2">
                <Network
                  size={16}
                  className="text-slate-400"
                />

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Network
                </p>
              </div>

              <p className="mt-3 font-medium text-white">
                {networkName}
              </p>

              <p
                className={`mt-1 text-xs ${
                  networkStatus === "Connected"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {networkStatus}
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Chain ID
              </p>

              <p className="mt-3 font-mono text-sm text-white">
                {chainId
                  ? parseInt(chainId, 16)
                  : "—"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Sepolia = 11155111
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Blockchain Configuration
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Smart contract configuration currently used by
            CollabOS.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {/* Contract */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Escrow Contract
            </p>

            <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
              <p className="break-all font-mono text-sm text-slate-300">
                {CONTRACT_ADDRESS}
              </p>
            </div>
          </div>

          {/* Chain */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Network
              </p>

              <p className="mt-2 font-medium text-white">
                Sepolia
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Asset
              </p>

              <p className="mt-2 font-medium text-white">
                ETH
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">
                Escrow
              </p>

              <p className="mt-2 font-medium text-green-400">
                Operational
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-xl border border-red-900/40 bg-red-950/10 p-6">
        <h2 className="text-lg font-semibold text-white">
          Local Data
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Remove locally stored CollabOS profile preferences
          from this browser.
        </p>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(
              "collabos_profile_name"
            );

            setName("Project Owner");
          }}
          className="mt-5 rounded-lg border border-red-900/60 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-950/40"
        >
          Reset Local Profile
        </button>
      </section>
    </div>
  );
}

export default Settings;