import { useContract, useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
// Contract Address
const CONTRACT_ADDRESS = "0x86889B10376dB115763050eba1Ed20b1d4Eb0fd3";
// Contract ABI
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_feeReceiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_txFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minTxFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_pack0price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_pack0validity",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "newMinTxFee",
        "type": "uint256"
      }
    ],
    "name": "MinTxFeeUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "validity",
        "type": "uint256"
      }
    ],
    "name": "NewVipUser",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "newTxFee",
        "type": "uint256"
      }
    ],
    "name": "TxFeeUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint8",
        "name": "pid",
        "type": "uint8"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "validity",
        "type": "uint256"
      }
    ],
    "name": "VipPackUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToAdd",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_isVipTill",
        "type": "uint256"
      }
    ],
    "name": "addVip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      }
    ],
    "name": "becomeVip",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "noOfAddresses",
        "type": "uint256"
      }
    ],
    "name": "calculateFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_newFeeReceiver",
        "type": "address"
      }
    ],
    "name": "changeFeeReceiver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeReceiver",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToCheck",
        "type": "address"
      }
    ],
    "name": "isVip",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isVipTill",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minTxFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenContractAddress",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_addressesArray",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_amountsArray",
        "type": "uint256[]"
      }
    ],
    "name": "multisendToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "recoverEthers",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "recoverTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressToRemove",
        "type": "address"
      }
    ],
    "name": "removeVip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minTxfee",
        "type": "uint256"
      }
    ],
    "name": "setMinTxFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_txFee",
        "type": "uint256"
      }
    ],
    "name": "setTxFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_pid",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_validity",
        "type": "uint256"
      }
    ],
    "name": "setVipPacks",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "txFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "vipPacks",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "validity",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const useMultiSenderContract = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  return { contract, address };
};


export const useBecomeVip = async (pid, value) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const tx = await contract.becomeVip(pid, { value: ethers.utils.parseEther(value.toString()) });
    await tx.wait();
    console.log("VIP Status Updated");
  } catch (error) {
    console.error("Error becoming VIP:", error);
  }
};


export const useIsVip = async (userAddress) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const isVip = await contract.isVip(userAddress);
    console.log("VIP Status:", isVip);
    return isVip;
  } catch (error) {
    console.error("Error checking VIP status:", error);
  }
};


export const useMultisendTokens = async (tokenAddress, recipients, amounts, value) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const tx = await contract.multisendToken(
      tokenAddress,
      recipients,
      amounts,
      { value: ethers.utils.parseEther(value.toString()) }
    );
    await tx.wait();
    console.log("Tokens Multisend Successful");
  } catch (error) {
    console.error("Error in multisend tokens:", error);
  }
};


export const useCalculateFee = async (numAddresses) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const fee = await contract.calculateFee(numAddresses);
    console.log("Transaction Fee:", ethers.utils.formatEther(fee.toString()), "ETH");
    return fee;
  } catch (error) {
    console.error("Error calculating fee:", error);
  }
};


export const useRecoverTokens = async (tokenAddress, recipient, amount) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const tx = await contract.recoverTokens(tokenAddress, recipient, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    console.log("Tokens Recovered Successfully");
  } catch (error) {
    console.error("Error recovering tokens:", error);
  }
};


export const useRecoverEthers = async (recipient, amount) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const tx = await contract.recoverEthers(recipient, ethers.utils.parseEther(amount.toString()));
    await tx.wait();
    console.log("Ethers Recovered Successfully");
  } catch (error) {
    console.error("Error recovering ethers:", error);
  }
};


export const useSetFeeReceiver = async (newFeeReceiver) => {
  const { contract } = useMultiSenderContract();
  if (!contract) throw new Error("Contract not initialized");

  try {
    const tx = await contract.changeFeeReceiver(newFeeReceiver);
    await tx.wait();
    console.log("Fee Receiver Updated Successfully");
  } catch (error) {
    console.error("Error updating fee receiver:", error);
  }
};
