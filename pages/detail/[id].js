import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faArrowUpRightFromSquare,
  faShareNodes,
  faEllipsisVertical,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { useContractSigner } from "@/hooks/useContractSigner";
import { ethers, providers } from "ethers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { marketplaceAddress } from "config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

export default function id() {
  const router = useRouter();
  const nft = router.query;
  const { contract, info } = useContractSigner();
  const [isBuyBtnLoading, setIsBuyBtnLoading] = useState(false);
  const [isSellBtnLoading, setIsSellBtnLoading] = useState(false);
  const [hasItemActivity, setHasItemActivity] = useState(false);
  const [nftId, setNftId] = useState("");
  const [txns, setTxns] = useState({});

  const now = new Date();

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`2022-06-20`) - +new Date();
    let timeLeft = {};

    if (difference >= 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    timerComponents.push(
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="font-mono text-5xl w-14">
          <span>{timeLeft[interval]}</span>
        </span>
        {interval}
      </div>
    );
  });

  const [state, setState] = useState({
    price: nft.price
  });

  function handleChange(e) {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const buyNFT = async () => {
    setIsBuyBtnLoading(true);
    try {
      const price = ethers.utils.parseUnits(nft.price, "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price
      });
      await transaction.wait();
      setIsBuyBtnLoading(false);
    } catch (error) {
      setIsBuyBtnLoading(false);
      toast(error.data?.message || error.message);
      console.log(error);
    }
    /* Go to my nfts */
    // router.push()
  };

  const resellNFT = async () => {
    setIsSellBtnLoading(true);
    try {
      const price = ethers.utils.parseUnits(state.price, "ether");
      const listingPrice = await contract.getListingPrice();
      const transaction = await contract.resellToken(nft.tokenId, price, {
        value: listingPrice.toString()
      });
      await transaction.wait();
      setIsSellBtnLoading(false);
      router.push("/home");
    } catch (error) {
      setIsSellBtnLoading(false);
      toast(error.data?.message || error.message);
      console.log(error);
    }

    /* Go to my nfts */
    // router.push()
  };

  const [priceUSD, setPriceUSD] = useState(0);

  useEffect(() => {
    const fetchMatic = async () => {
      try {
        const data = await axios.get(
          "https://rest.coinapi.io/v1/exchangerate/MATIC/USD",
          {
            headers: {
              "X-CoinAPI-Key": "93987AA6-BC15-46B5-B818-E475AE736104"
            }
          }
        );
        setPriceUSD(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatic();
  }, []);

  // const ct = new ethers.Contract(
  //   process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
  //   NFT.abi,
  //   provider
  // );
  const getItemActivities = async () => {
    setHasItemActivity(true);
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    // const provider = new ethers.providers.EtherscanProvider();
    const blockNumber = await provider.getBlockNumber();

    let txs = [];
    for (let i = 0; i <= blockNumber; i++) {
      const blockWithTransaction = await provider.getBlockWithTransactions(i);
      for (let j = 0; j < blockWithTransaction.transactions?.length; j++) {
        const txns = await provider.getTransactionReceipt(
          blockWithTransaction.transactions[j].hash
        );
        if (parseInt(+txns.logs[1].topics[3]) === nft.tokenId) {
          // if (
          //   blockWithTransaction.transactions[j].from ===
          //   "0x43f64EC0a6f39AAa38247b55A14841A9A0D319aA"
          // ) {
          txs.push({ ...txns, timestamp: blockWithTransaction?.timestamp });
        }
      }
    }
    return txs;
    // for (let txn of blockWithTransaction.transactions) {
    //   const txns = await provider.getTransaction(txn.hash);
    //   return txns;
    // }
    // return blockWithTransaction;
    // const txsHistory = provider.getHistory(contractAddress);
    // return txsHistory;
    // console.log({ blockNumber });
    //  const ct = new ethers.Contract(
    //    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
    //    NFT.abi,
    //    provider
    //  );
  };

  const test = () => {
    const contractAddress = "0xf6f7e99c57d797215730fd5b41c86a2372bab463";
    const smallContractABI = [
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ];
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    const contract = new ethers.Contract(
      contractAddress,
      smallContractABI,
      provider
    );

    let filter = contract.filters.Transfer(
      "0x43f64EC0a6f39AAa38247b55A14841A9A0D319aA",
      null,
      null
    );
    provider.on(filter, (from, to, amount, event) => {
      console.log({ from, to, amount, event });
    });
  };

  useEffect(() => {
    // getItemActivities()
    test();
    // .then(res => {
    //   // setHasItemActivity(false);
    //   console.log({ res }, nft.tokenId);
    //   // if (parseInt(+res.logs[1].topics[3]) === nft.tokenId) {
    //   //   setTxns(res);
    //   // }
    //   // setNftId(parseInt(+res.logs[1].topics[3]));
    // })
    // .catch(err => console.log({ err }));
  }, []);

  return (
    <main className="px-52 my-10">
      <div className="grid grid-cols-12">
        <div className="col-span-5 mr-10 flex flex-col">
          <div className=" w-full h-full">
            <div className="card w-full bg-base-100 shadow-xl border-2 border-black">
              <figure>
                <img
                  className="object-cover w-full"
                  src={nft?.image}
                  alt="Shoes"
                />
              </figure>
            </div>
          </div>
          <div className="flex flex-col w-full border-2 border-black rounded-lg mt-5">
            <div className="collapse collapse-open border border-base-300 bg-base-100 rounded-lg">
              <div className="collapse-title text-xl font-medium bg-gray-700">
                Description
              </div>
              <div className="collapse-content">
                <p className="font-thin text-base pt-5">{nft?.description}</p>
              </div>
            </div>
            <div
              tabindex="0"
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-xl font-medium bg-gray-700">
                Details
              </div>
              <div className="collapse-content flex flex-col">
                <div className="flex justify-between items-center mt-5">
                  <p className="font-medium text-white">Contract Address</p>
                  <p className="font-thin text-base">{marketplaceAddress}</p>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <p className="font-medium text-white">Blockchain</p>
                  <p className="font-thin text-base">Polygon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <div className="w-full h-96">
            <div className="w-full h-20">
              <div className="flex flex-row justify-between items-center">
                <div className="text-2xl font-medium text-gray-300">
                  Collection
                </div>
                <div className="btn-group">
                  <button className="btn border-2 border-gray-400 gap-1 peer">
                    <FontAwesomeIcon icon={faArrowRotateRight} />
                  </button>
                  <button className="btn border-2 border-gray-400 gap-1">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                  <button className="btn border-2 border-gray-400 gap-1">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                  <button className="btn border-2 border-gray-400 gap-1">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-medium text-white w-full mb-3">
                  {nft?.name}
                </span>
                <span className="text-base font-thin flex flex-row">
                  Owned by{" "}
                  {nft?.seller === "0x0000000000000000000000000000000000000000"
                    ? nft?.owner
                    : nft?.seller}
                  <span className="ml-10 w-40 flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    15 favorites
                  </span>
                </span>
              </div>
              <div className="flex flex-col w-full border-2 border-black rounded-lg mt-5">
                {nft.owner === info?.address ? (
                  <div className="px-5 py-5 bg-gray-700 rounded-lg hidden">
                    <div className="mb-5 font-semibold">
                      Sale ends June 20, 2022
                    </div>
                    <div className="flex flex-row gap-5 text-center">
                      {timerComponents}
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-5 bg-gray-700 rounded-lg">
                    <div className="mb-5 font-semibold">
                      Sale ends June 20, 2022
                    </div>
                    <div className="flex flex-row gap-5 text-center">
                      {timerComponents}
                    </div>
                  </div>
                )}
                <div className="px-5 py-5 flex flex-col">
                  <span className="font-semibold text-xl">Current price</span>
                  <span className="font-bold text-3xl text-white flex flex-row items-center">
                    <img
                      alt="MATIC"
                      className="w-7 h-7 mr-2"
                      src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022"></img>
                    {nft?.price}
                    <span className="font-thin text-2xl text-slate-300 ml-3">
                      (${(+priceUSD?.rate * +nft?.price).toFixed(2)})
                    </span>
                  </span>
                  <div className="mt-5">
                    {nft.owner === info?.address ? (
                      <>
                        <label
                          for="resell-modal"
                          className="btn modal-button  btn-info btn-wide gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path
                              fillRule="evenodd"
                              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-sans">Sell</span>
                        </label>
                        <input
                          type="checkbox"
                          id="resell-modal"
                          className="modal-toggle"
                        />
                        <label
                          for="resell-modal"
                          className="modal cursor-pointer">
                          <label className="modal-box relative" for="">
                            <div>
                              <div>
                                <h5 className="font-bold text-lg mb-2">
                                  SELL NFT
                                </h5>
                                <input
                                  name="price"
                                  type="number"
                                  step="any"
                                  onChange={handleChange}
                                  placeholder="Enter your price"
                                  value={state.price}
                                  style={{
                                    width: "100%",
                                    height: 40,
                                    marginBottom: 20,
                                    borderRadius: 5,
                                    padding: 12,
                                    background: "#353840",
                                    outline: "none"
                                  }}
                                />
                                {isSellBtnLoading ? (
                                  <button className="btn btn-info btn-disabled opacity-50 w-full gap-5">
                                    <FontAwesomeIcon
                                      icon={faSpinner}
                                      className="fa-spinner"
                                    />
                                    <span className="flex items-center gap-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="font-sans">Sell</span>
                                    </span>
                                  </button>
                                ) : (
                                  <button className="btn btn-info w-full gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor">
                                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span
                                      className="font-sans"
                                      onClick={resellNFT}>
                                      Sell
                                    </span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </label>
                        </label>
                      </>
                    ) : nft.seller === info?.address ? (
                      <button className="btn btn-disabled btn-wide gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path
                            fillRule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-sans">Buy now</span>
                      </button>
                    ) : isBuyBtnLoading ? (
                      <button className="btn btn-info btn-disabled opacity-50 btn-wide gap-5">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="fa-spinner"
                        />
                        <span className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path
                              fillRule="evenodd"
                              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-sans">Buy now</span>
                        </span>
                      </button>
                    ) : (
                      <button className="btn btn-info btn-wide gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path
                            fillRule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-sans" onClick={buyNFT}>
                          Buy now
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div
          tabindex="0"
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium bg-gray-700">
            Item Activity
          </div>
          <div className="collapse-content flex flex-col">
            <div className="overflow-x-auto">
              <table className="table w-full mt-3">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Price</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {hasItemActivity && (
                    // txs?.map(txn => (
                    //   <tr>
                    //     <th>1</th>
                    //     <td>Cy Ganderton</td>
                    //     <td>{txn.from}</td>
                    //     <td>{txn.to}</td>
                    //     <td>Blue</td>
                    //   </tr>
                    // ))
                    <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
