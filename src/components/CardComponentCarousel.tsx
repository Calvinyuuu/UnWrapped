/** Code from https://www.hover.dev/components/carousels */
import { ResponseData, Item } from '../interfaces/songProp';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

let imgs: string[] = [];
let items: Item[] = [];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const CardComponentBig: React.FC<ResponseData> = (data) => {
    items = data.items;
    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    imgs = data.items.map(item => {
        // Check if the item has images
        if (item.album.images.length > 0) {
            // If images are present, return the URL of the first image
            return item.album.images[0].url;
        } else {
            // If no images, return a default URL or handle accordingly
            return '/default-image.jpg';
        }
    });

    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === imgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);
    return (
        <div className="flex justify-between items-center mb-5">
            <Images imgIndex={imgIndex} />
        </div>
    );
};

const Images = ({ imgIndex }: { imgIndex: number }) => {
    return (
        <>
            {imgs.map((imgSrc, idx) => {
                return (
                    //come back to this to fix the aspect ratio
                    <div className='flex flex-col h-[40vh] rounded-xl bg-neutral-800'>
                        <motion.div
                            key={idx}
                            //controls the images properties
                            style={{
                                backgroundImage: `url(${imgSrc})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            //this is the "focus" animation for the image
                            animate={{
                                scale: imgIndex === idx ? 0.95 : 0.85,
                            }}
                            transition={SPRING_OPTIONS}
                            className="h-[30vh] aspect-square bg-neutral-800 object-cover"
                        />

                        <div className='text-center'>
                            {items[idx].name}
                        </div>
                        <div className='flex justify-center'>

                            {items[idx].artists.map((artist, index) => (
                                <div key={index} className="mx-2">
                                    {artist.name}
                                </div>
                            ))}
                        </div>
                        <div className='text-center'>
                            {items[idx].album.name}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default CardComponentBig;
