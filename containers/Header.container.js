import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";

import { useContractSigner } from "hooks";

const Header = (props) => {
  const [avatar, setAvatar] = useState();
  const { contract, info, onConnect } = useContractSigner();
  const handleConnectWallet = () => {
    onConnect();
  };
  useEffect(() => {
    let svg = createAvatar(style, {
      seed: info?.address ?? "default",
      // ... and other options
    });
    const blob = new Blob([svg], { type: "image/svg+xml" });
    let url = URL.createObjectURL(blob);
    setAvatar(url);
  }, [info]);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href='/home'>
          <a className="btn btn-ghost normal-case text-xl">Home</a>
        </Link>
        <Link href='/explore'>
          <a className="btn btn-ghost normal-case text-xl">Explore</a>
        </Link>
        <Link href='/create'>
          <a className="btn btn-ghost normal-case text-xl">Create</a>
        </Link>
        <Link href='/about'>
          <a className="btn btn-ghost normal-case text-xl">About</a>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        {info?.address ? (
          <>
            <p className="text-ellipsis overflow-hidden w-36 mx-5">
              {info?.address}
            </p>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={avatar} alt="" />
                </div>
              </label>
              {/* <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul> */}
            </div>
          </>
        ) : (
          <button className="btn" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
