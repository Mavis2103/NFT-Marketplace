import React, { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import axios from "axios";
import { useContract, useContractSigner } from "hooks";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import { marketplaceAddress } from "../../config";
import NFTMarketplace from "../../artifacts/contracts/NFT.sol/NFT.json";

const Profile = props => {
  const contract = useContract();
  const { contract: contractSigner } = useContractSigner();
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  /**
   * The function loads the NFTs from the contract and then uses the tokenURI function to get the
   * metadata from the tokenURI and then sets the state of the NFTs to the items array.
   */
  async function loadMyNFTs() {
    // Array Items
    try {
      const data = await contract.fetchMyNFTs();
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
    loadMyNFTs();
    console.log("nft" + { nfts });
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
    loadMyNFTs();
  };

  return (
    <main className="container mx-auto my-10">
      <h1 className="text-5xl font-bold mb-10">My NFTs</h1>
      <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:flex md:flex-col">
        {nfts.length ? (
          nfts?.map((nft, index) => (
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
                <h2 className="card-title">{nft?.name}</h2>
                <p>{nft?.description}</p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-5xl font-bold mb-10">Buy some NFTs :)</h1>
        )}
      </div>
    </main>
  );
};

Profile.propTypes = {};

export default Profile;
