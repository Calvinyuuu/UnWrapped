/** Code from https://www.hover.dev/components/carousels */
import { ResponseData, Item } from '../interfaces/songInterface';
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";


const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const CardComponentBig: React.FC<ResponseData> = (data) => {
    const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    const imgs = data.items.map(item => {
        // Check if the item has images
        if (item.album.images.length > 0) {
            // If images are present, return the URL of the first image
            return item.album.images[0].url;
        }
        // If no images, return a default URL or handle accordingly
        return '/default-image.jpg';
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
            <Images imgIndex={imgIndex} imgs={imgs} items={data.items} />
        </div>
    );
};

const Images = ({ imgIndex, imgs, items }: { imgIndex: number, imgs: string[], items: Item[] }) => {
    return (
        <>
            {imgs.map((imgSrc, idx) => (                    //come back to this to fix the aspect ratio
                <div key={idx} className='flex flex-col items-center h-[30vh] w-1/3 rounded-xl bg-neutral-800'>
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
                        className="bg-neutral-800 object-cover h-[15vh] w-[15vh] pt-2"
                    />

                    <div className='text-center pt-2 text-wrap'>
                        {items[idx].name}
                    </div>
                    <div className='flex justify-center'>

                        {items[idx].artists.map((artist, index) => (
                            <div key={index} className="mx-2 text-wrap">
                                {artist.name}
                            </div>
                        ))}
                    </div>
                    <div className='text-center text-wrap'>
                        {items[idx].album.name}
                    </div>
                </div>
            ))}
        </>
    );
};

export default CardComponentBig;
