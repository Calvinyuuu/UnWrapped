import { ResponseData } from '../interfaces/songProp';
import CardComponentCarousel from './CardComponentCarousel';
import CardComponentList from './CardComponentList';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { images } from '../constants'

const Card: React.FC<ResponseData & { dataRange: string }> = ({ items, dataRange }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    if (items && items.length > 0) {
        const tracksWithHeaders = items.slice(0, 3);
        const tracksInList = items.slice(3, 10);
        if (isMobile) {
            return (
                <div className="p-8 mx-auto h-[95vh] bg-neutral-950 mb-10">
                    <div className="grid grid-cols-2 items-center pb-2">
                        <Image
                            src={images[1].icon}
                            alt="spotify logo"
                            width={images[1].width}
                            height={images[1].height}
                        />
                        <h1 className='text-center'>{dataRange}</h1>
                    </div>
                    <CardComponentList items={items} />
                </div>
            );
        } else {
            return (
                <div className="p-8 w-4/5 mx-auto h-[100vh] bg-neutral-950 mb-3">
                    <div className="grid grid-cols-3">
                        <Image
                            src={images[1].icon}
                            alt="spotify logo"
                            width={images[1].width}
                            height={images[1].height}
                            className="mb-5"
                        />
                        <h1 className='text-center'>{dataRange}</h1>
                    </div>
                    {/* these both have div's being returned. */}
                    <CardComponentCarousel items={tracksWithHeaders} />
                    <CardComponentList items={tracksInList} />
                </div>
            );
        }
    } else {
        return (
            <div className="flex flex-col h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        );
    }
}

export default Card;