import { ResponseData } from '../interfaces/songProp';
import Image from 'next/image';

{/* <Image src={item.album.images[0].url} alt={item.name} width={100} height={100}  */ }
const CardComponentCarousel: React.FC<ResponseData> = (data) => {
    return (
        <div className="h-[50vh] overflow-hidden">
            <div className="overflow-y-scroll h-full">
                <ul className="divide-y divide-gray-200">
                    {data.items.map((item, index) => (
                        <li key={index} className="py-4">
                            <div className="flex flex-row items-center">
                                <span className="mr-2"> {(index + 4) + "."} </span>
                                <Image src={item.album.images[0].url} alt={item.name} width={100} height={100} className="aspect-square" />
                                <div className="flex-grow">
                                    <div className="text-center">
                                        {item.name}
                                    </div>
                                    <div className="flex flex-wrap justify-center">
                                        {item.artists.map((artist, index) => (
                                            <div key={index} className="mx-2">
                                                {artist.name}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center">
                                        {item.album.name}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CardComponentCarousel;