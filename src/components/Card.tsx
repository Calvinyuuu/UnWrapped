import { ResponseData } from '../interfaces/songProp';
import CardComponent from './CardComponent';
import React from 'react';

const Card: React.FC<ResponseData> = (data: ResponseData) => {
    if (data.items && data.items.length > 0) {
        return (
            <div>
                {data.items.map((item, index) => (
                    <CardComponent key={index} {...item} />
                ))}
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