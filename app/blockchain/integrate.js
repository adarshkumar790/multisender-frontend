import { useContract, useSigner, useProvider } from 'wagmi';
import { ethers } from 'ethers';

const CONTRACT_ABI = [
  
];

const CONTRACT_ADDRESS = "";

export const useMultiSenderContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const randomAddressLength = async () => {
    return await contract.randomAddressLength();
  };

  const depositToken = async (_tokenContractAddress, _amount) => {
    const tx = await contract.depositToken(_tokenContractAddress, _amount);
    return tx.wait();
  };

  const becomeVip = async (value) => {
    const tx = await contract.becomeVip({ value: ethers.utils.parseEther(value.toString()) });
    return tx.wait();
  };

  const addVip = async (_addressToAdd) => {
    const tx = await contract.addVip(_addressToAdd);
    return tx.wait();
  };

  const removeVip = async (_addressToRemove) => {
    const tx = await contract.removeVip(_addressToRemove);
    return tx.wait();
  };

  const changeVipPrice = async (_newVipPrice) => {
    const tx = await contract.changeVipPrice(_newVipPrice);
    return tx.wait();
  };

  const addRandomAddress = async (_addressesArray) => {
    const tx = await contract.addRandomAddress(_addressesArray);
    return tx.wait();
  };

  const changeRandomAddress = async (_addresses, _indices) => {
    const tx = await contract.changeRandomAddress(_addresses, _indices);
    return tx.wait();
  };

  const popRandomAddress = async (_numOfAdrToPop) => {
    const tx = await contract.popRandomAddress(_numOfAdrToPop);
    return tx.wait();
  };

  const deleteRandomAddress = async (_indices) => {
    const tx = await contract.deleteRandomAddress(_indices);
    return tx.wait();
  };

  const setTxFee = async (_fee) => {
    const tx = await contract.setTxFee(_fee);
    return tx.wait();
  };

  const setMinTxFee = async (_fee) => {
    const tx = await contract.setMinTxFee(_fee);
    return tx.wait();
  };

  const sendTokenRandomSame = async (_tokenContractAddress, _amount, fromRandomAddressIndex, toRandomAddressIndex, value) => {
    const tx = await contract.sendTokenRandomSame(_tokenContractAddress, _amount, fromRandomAddressIndex, toRandomAddressIndex, {
      value: ethers.utils.parseEther(value.toString()),
    });
    return tx.wait();
  };

  const sendTokenRandomDifferent = async (_tokenContractAddress, fromRandomAddressIndex, toRandomAddressIndex, _amountsArray, value) => {
    const tx = await contract.sendTokenRandomDifferent(_tokenContractAddress, fromRandomAddressIndex, toRandomAddressIndex, _amountsArray, {
      value: ethers.utils.parseEther(value.toString()),
    });
    return tx.wait();
  };

  const sendTokenCustomDifferent = async (_tokenContractAddress, _addressesArray, _amountsArray, value) => {
    const tx = await contract.sendTokenCustomDIfferent(_tokenContractAddress, _addressesArray, _amountsArray, {
      value: ethers.utils.parseEther(value.toString()),
    });
    return tx.wait();
  };

  const sendTokenCustomSame = async (_tokenContractAddress, _amount, _addressesArray, value) => {
    const tx = await contract.sendTokenCustomSame(_tokenContractAddress, _amount, _addressesArray, {
      value: ethers.utils.parseEther(value.toString()),
    });
    return tx.wait();
  };

  const sendEthCustomSame = async (toAddressArray, _amount, value) => {
    const tx = await contract.sendEthCustomSame(toAddressArray, _amount, {
      value: ethers.utils.parseEther(value.toString()),
    });
    return tx.wait();
  };

  const sendEthCustomDifferent = async (toAddressArray, _amountsArray, value) => {
    const tx = await contract.sendEthCustomDifferent(toAddressArray, _amountsArray, {
      value: ethers.utils.parseEther(value.toString()),
    });
    return tx.wait();
  };

  const recoverTokens = async (_tokenContractAddress, _recipient, _amount) => {
    const tx = await contract.recoverTokens(_tokenContractAddress, _recipient, _amount);
    return tx.wait();
  };

  const recoverEthers = async (_recipient, _amount) => {
    const tx = await contract.recoverEthers(_recipient, ethers.utils.parseEther(_amount.toString()));
    return tx.wait();
  };

  const changeFeeReceiver = async (_newFeeReceiver) => {
    const tx = await contract.changeFeeReceiver(_newFeeReceiver);
    return tx.wait();
  };

  return {
    randomAddressLength,
    depositToken,
    becomeVip,
    addVip,
    removeVip,
    changeVipPrice,
    addRandomAddress,
    changeRandomAddress,
    popRandomAddress,
    deleteRandomAddress,
    setTxFee,
    setMinTxFee,
    sendTokenRandomSame,
    sendTokenRandomDifferent,
    sendTokenCustomDifferent,
    sendTokenCustomSame,
    sendEthCustomSame,
    sendEthCustomDifferent,
    recoverTokens,
    recoverEthers,
    changeFeeReceiver,
  };
};
