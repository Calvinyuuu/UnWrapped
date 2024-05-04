import React, { useEffect, useState } from "react";

const Indicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      setIsVisible(!bottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 pl-1 pb-1 bg-transparent transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="animate-bounce bg-slate-800 p-1.5 w-8 h-8 ring-1 ring-slate-900/5 shadow-lg rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-spotify-green"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Indicator;
