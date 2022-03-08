import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "../public/icons/icons";

export default function Footer() {
  const [state, setState] = useState({
    text: "",
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const FooterList = ({ title, items }) => (
    <div>
      <h4 className="font-bold mb-2">{title}</h4>
      {items.map((item) => (
        <div className="flex flex-col">
          <Link href="/" className="text-sm mb-5">
            {item}
          </Link>
        </div>
      ))}
    </div>
  );
  return (
    <main style={{ backgroundColor: "#04111D" }} className="text-white pt-10">
      <div className="container mx-auto">
        <div className="flex justify-between pb-10 border-b-2 border-slate-600">
          <div className="">
            <h3 className="font-bold text-lg mb-2">Stay in the loop</h3>
            <p className="mb-2">
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
                className="w-2/3 bg-slate-600 text-slate-200 rounded-lg px-6 py-4 mr-4 focus:outline-none"
              />
              <button className="bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg">
                Sign up
              </button>
            </form>
          </div>
          <div className="flex flex-col">
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
        <div className="mt-14 flex border-b-2 border-slate-600 pb-14">
          <div className="basis-1/3">
            <h3 className="font-bold text-xl mb-2">Vigor</h3>
            <p>
              The world’s first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
            </p>
          </div>
          <div className="basis-2/3">
            <div className="flex justify-around">
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
                  "Virtual Worlds",
                ]}
              />
              <FooterList
                title="My Account"
                items={[
                  "Profile",
                  "Favorites",
                  "Watchlist",
                  "My Collections",
                  "Settings",
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
                  "Newsletter",
                ]}
              />
              <FooterList
                title="Company"
                items={["About", "Careers", "Ventures", "Grants"]}
              />
            </div>
          </div>
        </div>
        <div className="mt-14 pb-14 flex justify-between">
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
