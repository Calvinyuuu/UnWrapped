'use client';
import { socials } from '../constants'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const Hero: React.FC = () => {
    //title for the hero animation
    const title = 'Welcome to UnWrapped';
    const router = useRouter();

    async function auth() {
        try {
            const response = await fetch('/api/auth', { mode: 'no-cors' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            router.push(json.url);
        } catch (error) {
            console.error('Error authorizing with Spotify:', error);
            router.push('/');
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col justify-around text-center">
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
                <p className="mt-4 text-lg leading-8 animate-fade-up animate-delay-[1600ms] animate-ease-in">This is where you discover your recent listen history from Spotify!</p>

                <div className="flex justify-center text-center items-center mt-4 animate-fade-up animate-delay-[2400ms] animate-ease-in">
                    <p className="pr-1">
                        Created by Calvin Yu, Check out my portfolio and socials!
                    </p>
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
                </div>
                {/* redirects to /auth for spotify authentication */}
                <button
                    className="inline-block rounded border-2 border-info px-6 mt-4 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-info-50/50 hover:text-info-600 focus:border-info-600 focus:bg-info-50/50 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 motion-reduce:transition-none dark:hover:bg-cyan-950 dark:focus:bg-cyan-950"
                    onClick={auth}
                >
                    Authorize
                </button>
            </div>
        </div >
    );
};

export default Hero;
