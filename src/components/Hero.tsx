'use client';
import { socials } from '../constants'
import Link from 'next/link'
import Image from 'next/image';

const Hero: React.FC = () => {
    const title = 'Welcome to UnWrapped';

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="overflow-hidden text-4xl font-bold tracking-tight leading-10 text-white">
                    {title.split('').map((char, index) => (
                        <span
                            className="animate-text-reveal inline-block"
                            key={`${char}-${index}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>
                <p className="mt-6 text-lg leading-8 animate-fade-up animate-delay-[1600ms] animate-ease-in">This is where you discover your recent listen history from Spotify!</p>

                <div className="flex justify-center text-center items-center pt-5 animate-fade-up animate-delay-[2400ms] animate-ease-in">
                    <p className="pr-1">
                        Created by Calvin Yu, Check out my portfolio and socials!
                    </p>
                    <div className="flex flex-row">
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
                </div>
                <Link className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/auth">Dashboard</Link>
            </div>
        </div >
    );
};

export default Hero;
