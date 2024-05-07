"use client";
import { socials } from "../constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Hero: React.FC = () => {
  //title for the hero animation
  const title = "Welcome to UnWrapped";
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  async function auth() {
    try {
      const response = await fetch("/api/auth", { mode: "no-cors" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      router.push(json.url);
    } catch (error) {
      console.error("Error authorizing with Spotify:", error);
      router.push("/");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <div className="flex flex-col justify-around text-center w-96 md:w-4/5">
        <h1 className="overflow-hidden text-[2rem] md:text-4xl font-bold tracking-tight leading-10 text-white ">
          {title.split("").map((char, index) => (
            <span
              className="animate-text-reveal inline-block"
              key={`${char}-${index}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="mt-4 text-lg leading-8 animate-fade-up animate-delay-[1600ms] animate-ease-in text-balance">
          This is where you discover your recent listen history from Spotify!
        </p>

        <div className="flex flex-col justify-center text-center items-center mt-4 animate-fade-up animate-delay-[2400ms] animate-ease-in">
          <p className="pr-1 text-lg text-balance">Created by Calvin Yu, Check out my portfolio and socials!</p>
          <div className="flex">
            {socials.map((soc, index) => (
              <div
                key={index}
                onClick={() => window.open(soc.link, "_blank")}
                className="w-10 h-10 flex items-center cursor-pointer"
              >
                <Image
                  src={soc.icon}
                  alt="source code"
                  width={100}
                  height={100}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
            ))}
          </div>
          {/* redirects to /auth for spotify authentication */}
          <button
            className="inline-block rounded border-2 border-info px-6 mt-2 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-info-50/50 hover:text-info-600 focus:border-info-600 focus:bg-info-50/50 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 motion-reduce:transition-none hover:bg-cyan-950 focus:bg-cyan-950"
            onClick={auth}
          >
            Authorize
          </button>
          {/* disclaimer */}
          <div
            className={`transition-opacity duration-500 ease-in-out opacity-${
              isVisible ? "100" : "0"
            } flex items-center p-4 rounded-lg bg-gray-800 text-yellow-300 mt-4`}
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 text-sm font-medium">
              Launched on Vercel, this app has Vercel Analytics and Speed Insights enabled. For more information, visit{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                className="font-semibold underline hover:no-underline"
              >
                vercel/privacy-policy
              </a>
            </div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 bg-gray-800 text-yellow-300"
              aria-label="Close"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
