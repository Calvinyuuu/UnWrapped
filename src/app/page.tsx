// pages/page.tsx
import React from "react";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Hero = dynamic(() => import("../components/Hero"), { ssr: true });

const Page: React.FC = () => {
  return (
    <div>
      <Hero />
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Page;
