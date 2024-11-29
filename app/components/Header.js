"use client";
import { useState } from "react";
import { FaCrown, FaEthereum } from "react-icons/fa";
import Image from "next/image";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

export default function Header() {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [provider, setProvider] = useState(null);
  const [tokens, setTokens] = useState([]); // State to store token information

  // Fetch tokens by wallet address
  // const fetchTokens = async (address) => {
  //   const chain = EvmChain.HOLESKY;

  //   await Moralis.start({
  //     apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk2Yzg5ZjcwLWRiN2UtNDE3MC05Y2UxLTZmZGFmNDkwYjg4NCIsIm9yZ0lkIjoiMzA2NjUyIiwidXNlcklkIjoiMzE1MDIwIiwidHlwZUlkIjoiMGYxNzcxMjMtYzVkZC00MTY3LWE0NzYtZjM0NWEyMzNkZmNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODczMjE3MDcsImV4cCI6NDg0MzA4MTcwN30.H_LYqFvB7WFYf0kn7eVU_EIy1YzRFivFyhhz84hr8nM", // Replace with your Moralis API key
  //   });

  //   try {
  //     const response = await Moralis.EvmApi.token.getWalletTokenBalances({
  //       address,
  //       chain,
  //     });

  //     const tokenData = response.toJSON();
  //     setTokens(tokenData); // Save tokens in state
  //     console.log(tokenData);
  //   } catch (error) {
  //     console.error("Error fetching token balances:", error);
  //   }
  // };

  // Connect wallet using MetaMask
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        const userAddress = accounts[0];

        setWalletAddress(userAddress);
        setEthBalance(web3.utils.fromWei(balance, "ether"));

        // Fetch token balances
        // fetchTokens(userAddress);
        setShowWalletOptions(false); // Close modal after connection
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  // Connect wallet using WalletConnect
  const connectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          421613: "https://arbitrum-sepolia.infura.io/v3/a0b3a1898f1c4fc5b17650f6647cbcd2", // Arbitrum Sepolia RPC URL
        },
      });

      await walletConnectProvider.enable();
      const web3 = new Web3(walletConnectProvider);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const userAddress = accounts[0];

      setWalletAddress(userAddress);
      setEthBalance(web3.utils.fromWei(balance, "ether"));
      setProvider(walletConnectProvider);

      // Fetch token balances
      fetchTokens(userAddress);
      setShowWalletOptions(false); // Close modal after connection
    } catch (error) {
      console.error("Error connecting to WalletConnect:", error);
    }
  };

  // Disconnect WalletConnect
  const disconnectWallet = async () => {
    if (provider) {
      await provider.disconnect();
      setProvider(null);
    }
    setWalletAddress("");
    setEthBalance("");
    setTokens([]); // Clear tokens on disconnect
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#1e293b] to-[#0F123D] bg-opacity-80 text-white shadow-md">
      <div className="flex flex-wrap justify-between items-center px-4 py-3 md:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="text-2xl font-bold mb-2 sm:mb-0">Ledgerline Multisender</div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* VIP Button */}
          <button className="text-green-500 border border-green-500 text-xs hover:bg-green-900 px-4 font-bold py-2 rounded-xl flex items-center gap-1">
            <FaCrown /> VIP
          </button>

          {/* Ethereum Button */}
          <button className="bg-[#0F123D] border border-blue-500 text-blue-500 text-xs hover:bg-sky-900 font-bold px-3 py-2 rounded-xl flex items-center gap-1">
            <FaEthereum /> Eth
          </button>

          {/* Wallet Connection */}
          {walletAddress ? (
            <div className="bg-[#0F123D] text-white text-xs border border-blue-500 px-3 py-2 hover:bg-sky-900 rounded-xl flex items-center gap-1">
              <div className="font-bold text-blue-400">{walletAddress.slice(0, 8)}...</div>
              <div className="ml-2 font-bold text-blue-400">{ethBalance.slice(0, 3)} ETH</div>
              <button onClick={disconnectWallet} className="ml-4 text-red-500 hover:text-red-700">
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowWalletOptions(true)}
              className="bg-[#0F123D] text-blue-500 text-xs border border-blue-500 px-3 hover:bg-sky-900 font-bold py-2 rounded-xl flex items-center gap-1"
            >
              <Image src="/metamask.png" alt="MetaMask" width={20} height={20} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Modal Section */}
      {showWalletOptions && (
        <div className="fixed inset-0 bg-[#0F123D] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setShowWalletOptions(false)}
              className="absolute top-2 right-2 text-white text-xl hover:text-gray-100"
            >
              &times;
            </button>
            <h3 className="text-lg text-blue-500 font-bold mb-4">Connect wallet</h3>
            <button
              onClick={connectMetaMask}
              className="block w-full text-left px-4 py-2 bg-gray-600 text-blue-300 rounded-lg mb-2 hover:text-gray-100 hover:bg-gray-400"
            >
              <Image src="/metamask.png" alt="MetaMask" width={20} height={20} className="inline mr-2" />
              MetaMask
            </button>
            <button
              onClick={connectWalletConnect}
              className="block w-full text-left px-4 py-2 bg-gray-600 text-blue-300 rounded-lg mb-2 hover:text-gray-100 hover:bg-gray-400"
            >
              <Image src="/walletconnect.jpg" alt="WalletConnect" width={20} height={20} className="inline mr-2" />
              WalletConnect
            </button>
          </div>
        </div>
      )}

      {/* Token Display Section */}
      {/* {tokens.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg text-blue-400 font-bold">Tokens:</h3>
          <ul className="mt-2 space-y-2">
            {tokens.map((token, index) => (
              <li key={index} className="bg-gray-800 p-3 rounded-lg flex justify-between">
                <span className="text-white">{token.name} ({token.symbol})</span>
                <span className="text-green-400">{parseFloat(token.balance).toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </header>
  );
}
