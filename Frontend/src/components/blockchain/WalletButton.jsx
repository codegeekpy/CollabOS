import { useWallet } from "../../hooks/useWallet";

const shortenAddress = (address) => {
  if (!address) return "Connect Wallet";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const WalletButton = () => {
  const {
    account,
    isSepolia,
    isConnecting,
    connectWallet,
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isConnecting
        ? "Connecting..."
        : account
          ? `${shortenAddress(account)}${isSepolia ? " • Sepolia" : ""}`
          : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;