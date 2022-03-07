import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import axios from "axios";
import { useContract, useContractSigner } from "hooks";

const Home = props => {
  const contract = useContract();

  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // Array Items
      try {
        const data = await contract.fetchMarketItems();
        const items = await Promise.all(
          data?.map(async i => {
            console.log(i);
            const tokenUri = await contract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
              name: meta.data.name,
              description: meta.data.description
            };
            return item;
          })
        );
        setNfts(items);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  return (
    <main className="container mx-auto my-10">
      <div className="grid grid-cols-4 gap-4">
        {Array(10)
          .fill({
            img: "https://api.lorem.space/image/shoes?w=400&h=225",
            name: "Shoes!",
            description: "If a dog chews shoes whose shoes does he choose?"
          })
          .map((i, index) => (
            <div key={index} className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img src={i.img} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{i.name}</h2>
                <p>{i.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

Home.propTypes = {};

export default Home;
