// pages/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('../components/Hero'), { ssr: true });

const Page: React.FC = () => {
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Page;
