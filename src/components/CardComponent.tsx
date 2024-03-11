import React from 'react';
import { Item } from '../interfaces/songProp';

const CardComponent: React.FC<Item> = (item) => {
    return (
        <div>
            {item.name}
        </div>
    );
};

export default CardComponent;