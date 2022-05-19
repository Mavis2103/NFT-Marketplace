import React, { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { useContractSigner } from "hooks";

export default function Create() {
  const router = useRouter();
  const { contract } = useContractSigner();
  const [state, setState] = useState({
    text: "",
    des: "",
    price: null,
    file: null
  });
  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  function handleChange(e) {
    if (e.target.files) {
      setState(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }
  const removeImage = e => {
    setState({ file: null });
  };
  async function uploadIPFS(file) {
    const added = await client.add(file, (err, ipfsHash) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("IPFS Hash:", ipfsHash);
    });
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  }

  async function upMetadataIPFS() {
    const { text: name, des: description, file } = state;
    const image = await uploadIPFS(file);
    const data = JSON.stringify({ name, description, image });
    const added = await client.add(data, (err, ipfsHash) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("IPFS Hash:", ipfsHash);
    });
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const url = await upMetadataIPFS();
      let listingPrice = await contract.getListingPrice();

      const price = ethers.utils.parseUnits(state.price, "ether");

      let transaction = await contract.createToken(url, price, {
        value: listingPrice.toString()
      });
      await transaction.wait();
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="container mx-auto my-10">
      <h1 className="text-5xl font-bold mb-10">Create New Item</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <label className="mb-2">
            <span
              className="before:content-['*'] before:ml-0.5 before:text-red-500"
              style={{ fontSize: 12, fontWeight: "medium" }}>
              Require fields
            </span>
          </label>
          <div className="flex flex-col relative mb-5">
            <label className="mb-2">
              <span
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
                style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Image, Video, Audio, or 3D Model
              </span>
              <br />
              <span className="text-xs font-medium">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </span>
            </label>
            {state.file ? (
              <div
                className="hover:bg-black"
                style={{
                  width: 350,
                  height: 350,
                  borderRadius: 10,
                  background: "#353840",
                  borderStyle: "dashed",
                  borderWidth: 3,
                  borderColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative"
                }}>
                <img
                  style={{
                    width: 350,
                    height: 350,
                    borderRadius: 10,
                    objectFit: "cover",
                    position: "relative"
                  }}
                  src={URL.createObjectURL(state.file)}
                  alt="img"
                />
                <button
                  style={{ position: "absolute", top: 8, right: 12 }}
                  onClick={removeImage}>
                  X
                </button>
              </div>
            ) : (
              <div
                className="hover:bg-black"
                style={{
                  width: 350,
                  height: 350,
                  borderRadius: 10,
                  background: "#353840",
                  borderStyle: "dashed",
                  borderWidth: 3,
                  borderColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative"
                }}>
                <label htmlFor="input">
                  <img
                    style={{
                      width: 80,
                      position: "absolute",
                      left: "39%",
                      top: "36%"
                    }}
                    src="https://icon-library.com/images/upload-icon-vector/upload-icon-vector-10.jpg"
                  />
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  style={{
                    width: 800,
                    height: 200,
                    opacity: 0,
                    zIndex: 100
                  }}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2">
              <span
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
                style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Name
              </span>
            </label>
            <input
              name="text"
              type="text"
              placeholder="Item name"
              onChange={handleChange}
              value={state.text}
              required
              style={{
                width: 800,
                height: 40,
                marginBottom: 20,
                borderRadius: 5,
                padding: 5,
                background: "#353840",
                outline: "none",
                fontSize: 16
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">
              <span style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Description
              </span>
              <br />
              <span className="text-xs font-medium">
                The description will be included on the item's detail page
                underneath its image
              </span>
            </label>
            <textarea
              name="des"
              placeholder="Provide a detailed description of your item."
              onChange={handleChange}
              value={state.des}
              required
              style={{
                width: 800,
                height: 200,
                fontSize: 16,
                borderRadius: 5,
                padding: 5,
                marginBottom: 20,
                background: "#353840",
                outline: "none"
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">
              <span style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Price
              </span>
              <br />
              <span className="text-xs font-medium">
        
              </span>
            </label>
            <input
              name="price"
              type="text"
              onChange={handleChange}
              value={state.price}
              style={{
                width: 800,
                height: 40,
                marginBottom: 20,
                borderRadius: 5,
                padding: 5,
                background: "#353840",
                outline: "none"
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">
              <span style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Blockchain
              </span>
            </label>
            <select
              style={{
                width: 800,
                height: 40,
                marginBottom: 20,
                borderRadius: 5,
                padding: 5,
                background: "#353840",
                outline: "none"
              }}>
              <option value={"Ethereum"}>Ethereum</option>
              <option value={"Polygon"}>Polygon</option>
            </select>
          </div>
          <button className="btn btn-info font-bold " type="submit">
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
