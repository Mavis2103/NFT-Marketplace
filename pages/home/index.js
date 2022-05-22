import React, { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import axios from "axios";
import { useContract, useContractSigner } from "hooks";

const Home = props => {
  const contract = useContract();
  const { contract: contractSigner } = useContractSigner();
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * The function loads the NFTs from the contract and then uses the tokenURI function to get the
   * metadata from the tokenURI and then sets the state of the NFTs to the items array.
   */
  async function loadNFTs() {
    // Array Items
    try {
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data?.map(async i => {
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
      console.log(error);
    }
  }

  useEffect(() => {
    loadNFTs();
  }, [contract]);

  /**
   * It takes an NFT as an argument, converts the price to wei, and then calls the createMarketSale
   * function on the contract
   */
  const buyNFT = async nft => {
    const price = ethers.utils.parseUnits(nft.price, "ether");
    const transaction = await contractSigner.createMarketSale(nft.tokenId, {
      value: price
    });
    await transaction.wait();
    loadNFTs();
  };

  const updateNewListingPrice = async() => {
    const listingPrice = ethers.utils.parseUnits('0.0001', "ether");
    const transaction = await contract.updateListingPrice({
      value: listingPrice
    });
    await transaction.wait();
  }

  return (
    <main className="container mx-auto my-10">
      <button onClick={updateNewListingPrice}>Update</button>
      <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:flex md:flex-col">
        {nfts?.map((nft, index) => (
          <div
            key={nft.tokenId}
            className="card card-compact bg-base-100 shadow-xl md:mb-10">
            <Link
              href={{
                pathname: `/detail/${index}`,
                query: nft
              }}>
              <div>
                <img
                  src={nft.image}
                  alt="Shoes"
                  className="w-full md:w-full h-40 object-contain"
                />
              </div>
            </Link>
            <div className="card-body">
              <h2 className="card-title">{nft.name}</h2>
              <p>{nft.description}</p>
              <div className="card-actions justify-end items-center">
                <div className="text-2xl">{nft.price}</div>
                <button className="btn btn-primary" onClick={() => buyNFT(nft)}>
                  Buy Now
                </button>
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
