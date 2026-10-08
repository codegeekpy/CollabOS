import { useEffect, useState } from "react";
import { ethers } from "ethers";

const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111

export const useWallet = () => {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = async () => {
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
        }

        setIsConnecting(true);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);

            await provider.send("eth_requestAccounts", []);

            await provider.send("wallet_switchEthereumChain", [
                { chainId: "0xaa36a7" },
            ]);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            const network = await provider.getNetwork();

            setAccount(address);
            setChainId(network.chainId.toString());

            return {
                address,
                chainId: network.chainId.toString(),
            };
        } finally {
            setIsConnecting(false);
        }
    };

    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = (accounts) => {
            setAccount(accounts[0] || null);
        };

        const handleChainChanged = (newChainId) => {
            setChainId(newChainId);
        };

        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);

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

    return {
        account,
        chainId,
        isSepolia: chainId === "11155111",
        isConnecting,
        connectWallet,
    };
};