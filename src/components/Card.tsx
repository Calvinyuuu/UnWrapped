import { ResponseData } from '../interfaces/songProp';
import CardComponentBig from './CardComponentBig';
import React from 'react';

const Card: React.FC<ResponseData> = (data: ResponseData) => {
    if (data.items && data.items.length > 0) {
        const tracksWithHeaders = data.items.slice(0, 3);
        const tracksInList = data.items.slice(3, 20);
        return (
            <div>
                <div>
                    {tracksWithHeaders.map((item, index) => (
                        <CardComponentBig key={index} {...item} />
                    ))}
                </div>
                {/* <div>
                    {tracksInList.map((item, index) => (
                        <CardComponent key={index} {...item} />
                    ))}
                </div> */}
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