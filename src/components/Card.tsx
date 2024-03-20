import { ResponseData } from '../interfaces/songProp';
import CardComponentCarousel from './CardComponentCarousel';
import CardComponentList from './CardComponentList';
import React from 'react';

const Card: React.FC<ResponseData> = (data: ResponseData) => {
    if (data.items && data.items.length > 0) {
        const tracksWithHeaders = data.items.slice(0, 3);
        const tracksInList = data.items.slice(3, 10);
        // console.log(tracksInList)
        return (
            <div className="p-8 w-3/5 mx-auto h-screen bg-neutral-950">
                {/* these both have div's being returned. */}
                <CardComponentCarousel items={tracksWithHeaders} />
                <CardComponentList items={tracksInList} />
            </div>
        );
    } else {
        return (
            <div>
                No items available.
            </div>
        );
    }
}

export default Card;