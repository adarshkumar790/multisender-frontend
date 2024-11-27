//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk2Yzg5ZjcwLWRiN2UtNDE3MC05Y2UxLTZmZGFmNDkwYjg4NCIsIm9yZ0lkIjoiMzA2NjUyIiwidXNlcklkIjoiMzE1MDIwIiwidHlwZUlkIjoiMGYxNzcxMjMtYzVkZC00MTY3LWE0NzYtZjM0NWEyMzNkZmNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODczMjE3MDcsImV4cCI6NDg0MzA4MTcwN30.H_LYqFvB7WFYf0kn7eVU_EIy1YzRFivFyhhz84hr8nM
"use client";
import { useState, useEffect } from "react";
import { FaCrown, FaEthereum } from "react-icons/fa";
import Image from "next/image";
import Web3 from "web3";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");


export default function Header() {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);

  //////fetch token by wallet address
  const fetchTokens = async (address) => {
    const chain = EvmChain.ETHEREUM;

    await Moralis.start({
      apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk2Yzg5ZjcwLWRiN2UtNDE3MC05Y2UxLTZmZGFmNDkwYjg4NCIsIm9yZ0lkIjoiMzA2NjUyIiwidXNlcklkIjoiMzE1MDIwIiwidHlwZUlkIjoiMGYxNzcxMjMtYzVkZC00MTY3LWE0NzYtZjM0NWEyMzNkZmNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODczMjE3MDcsImV4cCI6NDg0MzA4MTcwN30.H_LYqFvB7WFYf0kn7eVU_EIy1YzRFivFyhhz84hr8nM', // Replace with your Moralis API key
    });

    try {
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      });

      console.log(response.toJSON());
      setResult(response.toJSON());
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        const userAddress = accounts[0];

        setWalletAddress(userAddress);
        setEthBalance(web3.utils.fromWei(balance, "ether"));

        // Automatically fetch token balances after wallet connection
        fetchTokens(userAddress);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
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
            <div className="bg-[#0F123D] text-white text-xs border border-blue-500 px-3 py-2 hover:bg-sky-900 rounded-xl flex items-center">
              <div className="font-bold text-blue-400">
                {walletAddress.slice(0, 8)}...
              </div>
              <div className="ml-2 font-bold text-blue-400">
                {ethBalance.slice(0, 3)} ETH
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-[#0F123D] text-blue-500 text-xs border border-blue-500 px-3 hover:bg-sky-900 font-bold py-2 rounded-xl flex items-center gap-1"
            >
              <Image
                src="/metamask.png"
                alt="MetaMask"
                width={20}
                height={20}
              />
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      
      {showResult && (
        <div className="p-4">
          <h2 className="text-lg font-bold">Token Balances:</h2>
          <ul>
            {result.map((token, index) => (
              <li key={index}>
                {token.symbol}: {parseFloat(token.balance) / Math.pow(10, token.decimals)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
