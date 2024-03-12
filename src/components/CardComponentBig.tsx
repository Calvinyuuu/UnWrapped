import React from 'react';
import { Item } from '../interfaces/songProp';
import Image from 'next/image';
import { images } from '../constants';

const CardComponentBig: React.FC<Item> = (item) => {
    return (
        <div className="text-[#003E5C] shadow-none bg-transparent p-3 hover:cursor-pointer m-auto xl:h-full xl:justify-center">
            <div id="header" className="max-h-2/6 pt-2">
                <div className="flex justify-between items-center">
                    <Image src={images[0].icon} width={images[0].width} height={images[0].height} className="h-7 xl:h-10" alt="Spotify Logo" />
                </div>
                <h2 className="text-center font-bold w-3/4 m-auto xl:text-2xl">{item.name}</h2>
            </div>

            <div id="body" className="2xl:flex 2xl:w-3/4 2xl:m-auto">
                <Image src={item.album.images[0].url} width={item.album.images[0].width} height={item.album.images[0].height} alt={item.id} className="w-3/5 mx-auto pt-3" />
            </div>

            <div id="footer" className="mt-2 font-semibold">
                <div className="flex flex-wrap gap-3 justify-center my-4">
                    {item.artists.map((artist) => (
                        <h2 className="text-center text-sm font-light xl:text-xl" key={artist.id}>
                            {artist.name}
                        </h2>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardComponentBig;
