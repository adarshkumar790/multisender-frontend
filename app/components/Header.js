"use client";
import { useState } from "react";
import { FaCrown, FaEthereum } from "react-icons/fa";
import Image from "next/image";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function Header() {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showNetworkOptions, setShowNetworkOptions] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum Mainnet"); 
  const [provider, setProvider] = useState(null);

  const networks = [
    "Ethereum Mainnet",
    "BNB Smart Chain",
    "Polygon (MATIC)"
  ];

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
        setShowWalletOptions(false);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  const connectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          421613: "https://arbitrum-sepolia.infura.io/v3/a0b3a1898f1c4fc5b17650f6647cbcd2", 
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
      setShowWalletOptions(false); 
    } catch (error) {
      console.error("Error connecting to WalletConnect:", error);
    }
  };

  const disconnectWallet = async () => {
    if (provider) {
      await provider.disconnect();
      setProvider(null);
    }
    setWalletAddress("");
    setEthBalance("");
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#1e293b] to-[#0F123D] bg-opacity-80 text-white shadow-md">
      <div className="flex flex-wrap justify-between items-center px-4 py-3 md:px-6 lg:px-8">
        
        <div className="text-2xl font-bold mb-2 sm:mb-0">Ledgerline Multisender</div>

      
        <div className="flex flex-wrap justify-center items-center gap-3">
        
          <button className="text-green-500 border border-green-500 text-xs hover:bg-green-900 px-4 font-bold py-2 rounded-xl flex items-center gap-1">
            <FaCrown /> VIP
          </button>

          
          <button
            onClick={() => setShowNetworkOptions(true)}
            className="bg-[#0F123D] border border-blue-500 text-blue-500 text-xs hover:bg-sky-900 font-bold px-3 py-2 rounded-xl flex items-center gap-1"
          >
            <FaEthereum /> {selectedNetwork.split(" ")[0]} 
          </button>
          {walletAddress ? (
            <div className="bg-[#0F123D] text-white text-xs border border-blue-500 px-3 py-2 hover:bg-sky-900 rounded-xl flex items-center gap-1">
              <div className="font-bold text-blue-400">{walletAddress.slice(0, 8)}...</div>
              <div className="ml-2 font-bold text-blue-400">{ethBalance.slice(0, 5)} ETH</div>
              <button
                onClick={disconnectWallet}
                className="ml-4 text-red-500 hover:text-red-700"
              >
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
      {showNetworkOptions && (
        <div className="fixed inset-0 bg-[#0F123D] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setShowNetworkOptions(false)}
              className="absolute top-2 right-2 text-white text-xl hover:text-gray-100"
            >
              &times;
            </button>
            <h3 className="text-lg text-blue-500 font-bold mb-4">Select Network</h3>
            <div className="grid grid-cols-2 gap-4">
              {networks.map((network) => (
                <button
                  key={network}
                  onClick={() => {
                    setSelectedNetwork(network);
                    setShowNetworkOptions(false);
                  }}
                  className="bg-gray-600 text-blue-300 px-3 py-2 rounded-lg hover:text-gray-100 hover:bg-gray-400"
                >
                  {network}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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
    </header>
  );
}
