import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export const useContractSigner = () => {
  const [contract, setContract] = useState();
  const [info, setInfo] = useState({});
  const onConnect = useCallback(() => {
    connection();
  }, []);
  useEffect(() => {
    connection();
  }, []);

  async function connection() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider?.getSigner();
      // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/5NPo0o79JPsJ_QVdMWqiV9icfS8QH_Rq");
      const ct = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFT.abi, signer);
      setContract(ct);
      setInfo({
        address: await signer?.getAddress()
      });
    } catch (error) {
      console.log(error);
    }
  }
  return { contract, info, onConnect };
};
