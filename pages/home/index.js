import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

const Home = props => {
  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      // const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/5NPo0o79JPsJ_QVdMWqiV9icfS8QH_Rq");
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFT.abi, provider);
      const data = await contract.fetchMarketItems();
      console.log(data);
    })();
  }, []);

  return <div>Home</div>;
};

Home.propTypes = {};

export default Home;
