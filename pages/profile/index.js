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
  const [createdNfts, setCreatedNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openTab, setOpenTab] = useState(1);

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
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMyCreatedNFTs() {
    // Array Items
    try {
      const data = await contract.fetchItemsListed();
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
      setCreatedNfts(items);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (openTab === 1) {
      loadMyNFTs();
    }
    if (openTab === 2) {
      loadMyCreatedNFTs();
    }
  }, [contract, openTab]);

  console.log({ nfts });
  console.log({ createdNfts });

  return (
    <main className="container mx-auto my-10">
      <h1 className="text-5xl font-bold mb-10">My NFTs</h1>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white border-b-4 border-b-blue-600"
                    : "text-white bg-base-100")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#collected"
                role="tablist">
                Collected
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white border-b-4 border-b-blue-600"
                    : "text-white bg-base-100")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#created"
                role="tablist">
                Created
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={openTab === 1 ? "block" : "hidden"}
                  id="collected">
                  <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:flex md:flex-col">
                    {isLoading && !createdNfts.length ? (
                      <h3>Loading...</h3>
                    ) : createdNfts.length ? (
                      createdNfts?.map((nft, index) => (
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
                      <h1 className="text-5xl font-bold mb-10">
                        Buy some NFTs :)
                      </h1>
                    )}
                  </div>
                </div>
                <div
                  className={openTab === 2 ? "block" : "hidden"}
                  id="created">
                  <div className="lg:grid lg:grid-cols-4 lg:gap-4 md:flex md:flex-col">
                    {isLoading && !nfts.length ? (
                      <h3>Loading...</h3>
                    ) : nfts.length ? (
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
                      <h1 className="text-5xl font-bold mb-10">
                        Create some NFTs :)
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

Profile.propTypes = {};

export default Profile;
