import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export const useContract = () => {
  const [contract, setContract] = useState();
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/5NPo0o79JPsJ_QVdMWqiV9icfS8QH_Rq");
    const ct = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFT.abi, provider);
    setContract(ct);
  }, []);
  return contract;
};
