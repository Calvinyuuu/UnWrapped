import React from 'react';
import { Item } from '../interfaces/songProp';
import Image from 'next/image';
import { images } from '../constants';

const CardComponentBig: React.FC<Item> = (item) => {
    return (
        <div className="text-[#003E5C] shadow-none bg-transparent p-3 hover:cursor-pointer m-auto xl:h-full xl:justify-center">
            <div className="flex flex-col justify-center w-full pl-4">
                <h1 className="font-semibold xl:text-xl">{item.name}</h1>
                <h3 className="text-[#007BB8] font-light text-xs xl:text-base">{item.album.name}</h3>
            </div>
        </div>
    );
};

export default CardComponentBig;
