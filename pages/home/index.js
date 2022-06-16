import React, { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import axios from "axios";
import { useContract, useContractSigner } from "hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = props => {
  const contract = useContract();
  const { info, contract: contractSigner } = useContractSigner();
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(null);

  /**
   * The function loads the NFTs from the contract and then uses the tokenURI function to get the
   * metadata from the tokenURI and then sets the state of the NFTs to the items array.
   */
  async function loadNFTs() {
    // Array Items
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadNFTs();
  }, [contract, info?.address]);

  /**
   * It takes an NFT as an argument, converts the price to wei, and then calls the createMarketSale
   * function on the contract
   */
  const buyNFT = async (nft, id) => {
    setIsButtonLoading(id);
    try {
      const price = ethers.utils.parseUnits(nft.price, "ether");
      const transaction = await contractSigner.createMarketSale(nft.tokenId, {
        value: price
      });
      await transaction.wait();
      setIsButtonLoading(null);
      loadNFTs();
    } catch (error) {
      setIsButtonLoading(null);
      toast(error.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <main className="container mx-auto my-10">
      {isLoading ? (
        <div className="flex justify-center">
          <FontAwesomeIcon icon={faSpinner} size="10x" className="fa-spinner" />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:flex md:flex-col cursor-pointer">
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
                <div className="card-actions justify-between items-center">
                  <div className="text-2xl">{nft.price}</div>
                  {nft.seller === info?.address ? (
                    <button className="btn btn-disabled">Buy Now</button>
                  ) : isButtonLoading === nft.tokenId ? (
                    <button
                      key={index}
                      className="btn btn-info btn-disabled opacity-50 font-bold flex flex-row gap-2">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="fa-spinner"
                      />
                      Buy Now
                    </button>
                  ) : (
                    <button
                      className="btn btn-info"
                      key={index}
                      onClick={() => buyNFT(nft, nft.tokenId)}>
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </main>
  );
};

Home.propTypes = {};

export default Home;
