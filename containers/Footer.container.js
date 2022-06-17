import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "../public/icons/icons";

export default function Footer() {
  const [state, setState] = useState({
    text: ""
  });
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  const FooterList = ({ title, items }) => (
    <div>
      <h4 className="font-bold mb-2">{title}</h4>
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col">
          <Link href="/">
            <a className="text-sm mb-3">{item}</a>
          </Link>
        </div>
      ))}
    </div>
  );
  return (
    <main style={{ backgroundColor: "#04111D" }} className="text-white pt-10">
      <div className="xl:container xl:px-10 xl:mx-auto lg:container lg:px-10 lg:mx-auto md:container-fluid md:px-10 md:mx-auto sm:container-fluid sm:px-10 sm:mx-auto xs:container-fluid xs:px-10 xs:mx-auto 2xs:container-fluid 2xs:px-10 2xs:mx-auto">
        <div className="xl:flex xl:justify-between pb-10 border-b-2 border-slate-600">
          <div className="xl:flex xl:flex-col xl:items-start lg:flex lg:flex-col lg:items-center lg:mb-8 md:flex md:flex-col md:items-center md:mb-8 sm:flex sm:flex-col sm:items-center sm:mb-8 xs:flex xs:flex-col xs:items-center xs:mb-8 2xs:flex 2xs:flex-col 2xs:items-center 2xs:mb-8">
            <h3 className="font-bold text-lg mb-2">Stay in the loop</h3>
            <p className="mb-2 lg:text-center lg:mb-3 md:text-center md:mb-3 sm:text-center sm:mb-3 xs:text-center xs:mb-3 2xs:text-center 2xs:mb-3">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating Vigor
            </p>
            <form className="w-full">
              <input
                type="text"
                name="text"
                placeholder="Your email address"
                value={state.text}
                onChange={handleChange}
                className="xl:w-2/3 bg-slate-600 text-slate-200 rounded-lg px-6 py-4 mr-4 focus:outline-none lg:w-3/4 md:w-3/4 sm:w-3/4 xs:w-3/4 2xs:w-2/3"
              />
              <button className="bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg lg:w-1/5 md:w-1/5 sm:w-1/5 xs:w-1/5 2xs:w-1/4">
                Sign up
              </button>
            </form>
          </div>
          <div className="xl:flex xl:flex-col lg:flex lg:flex-col lg:items-center md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center xs:flex xs:flex-col xs:items-center 2xs:flex 2xs:flex-col 2xs:items-center">
            <h3 className="font-bold text-lg mb-2">Join the community</h3>
            <div className="flex">
              <div className="bg-slate-600 rounded-lg p-2 flex justify-center items-center mr-3 cursor-pointer">
                <Link href="/">{Icons.Twitter}</Link>
              </div>
              <div className="bg-slate-600 rounded-lg p-2 flex justify-center items-center mr-3 cursor-pointer">
                <Link href="/">{Icons.Instagram}</Link>
              </div>
              <div className="bg-slate-600 rounded-lg p-2 flex justify-center items-center mr-3 cursor-pointer">
                <Link href="/">{Icons.Discord}</Link>
              </div>
              <div className="bg-slate-600 rounded-lg p-2 flex justify-center items-center mr-3 cursor-pointer">
                <Link href="/">{Icons.Reddit}</Link>
              </div>
              <div className="bg-slate-600 rounded-lg p-2 flex justify-center items-center mr-3 cursor-pointer">
                <Link href="/">{Icons.Youtube}</Link>
              </div>
              <div className="bg-slate-600 rounded-lg p-2 flex justify-center items-center mr-3 cursor-pointer">
                <Link href="/">Email</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 border-b-2 border-slate-600 pb-14 xl:flex xl:flex-row lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col xs:flex xs:flex-col 2xs:flex 2xs:flex-col">
          <div className="xl:basis-1/3 xl:flex xl:items-start lg:basis-1/3 lg:flex lg:items-start md:basis-1/3 md:flex md:flex-col md:items-center md:mb-6 sm:basis-1/3 sm:flex sm:flex-col sm:items-center sm:mb-6 xs:basis-1/3 xs:flex xs:flex-col xs:items-center xs:mb-6 2xs:basis-1/3 2xs:flex 2xs:flex-col 2xs:items-center 2xs:mb-6">
            <h3 className="font-bold text-xl mb-2">Vigor</h3>
            <p className="xl:text-left lg:text-left md:text-center sm:text-center xs:text-center 2xs:text-center">
              The world’s first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
            </p>
          </div>
          <div className="xl:basis-2/3 lg:basis-2/3 md:basis-2/3 sm:basis-2/3 xs:basis-2/3 2xs:basis-2/3">
            <div className="xl:flex xl:justify-around lg:flex lg:justify-around md:flex md:justify-around sm:flex sm:flex-shrink-0 sm:justify-around xs:flex xs:justify-around 2xs:flex 2xs:justify-around">
              <FooterList
                title="Marketplace"
                items={[
                  "All NFTs",
                  "Art",
                  "Collectibles",
                  "Domain Names",
                  "Music",
                  "Photography",
                  "Sports",
                  "Trading Cards",
                  "Utility",
                  "Virtual Worlds"
                ]}
              />
              <FooterList
                title="My Account"
                items={[
                  "Profile",
                  "Favorites",
                  "Watchlist",
                  "My Collections",
                  "Settings"
                ]}
              />
              <FooterList title="Stats" items={["Rankings", "Activity"]} />
              <FooterList
                title="Resources"
                items={[
                  "Help Center",
                  "Platform Status",
                  "Parners",
                  "Gas-Free Marketplace",
                  "Taxes",
                  "Blog",
                  "Docs",
                  "Newsletter"
                ]}
              />
              <FooterList
                title="Company"
                items={["About", "Careers", "Ventures", "Grants"]}
              />
            </div>
          </div>
        </div>
        <div className="mt-14 pb-14 xl:flex xl:flex-row xl:justify-between lg:flex lg:flex-row lg:justify-between md:flex md:flex-row md:justify-between sm:flex sm:flex-col sm:items-center xs:flex xs:flex-col xs:items-center 2xs:flex 2xs:flex-col 2xs:items-center">
          <p>©️ 2022 Vigor Networks, Inc</p>
          <div className="flex items-start gap-2">
            <Link href="/">Privacy Policy</Link>
            <p>.</p>
            <Link href="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
