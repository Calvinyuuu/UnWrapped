import { ResponseData } from "../interfaces/songInterface";
import Image from "next/image";

const CardComponentTop: React.FC<ResponseData> = (data) => {
  return (
    <div className="flex items-center mb-5 ">
      {data.items.map((item) => (
        <div key={item.id} className="flex justify-center py-2 w-full h-[30vh] lg:h-[36vh] lg:py-2">
          <div className="bg-white bg-opacity-10 backdrop backdrop-blur-sm rounded-xl p-3 text-white w-11/12 shadow-lg">
            <div className="aspect-w-1 aspect-h-1 flex flex-col items-center justify-center">
              <Image
                src={item.album.images[0].url}
                alt="album cover"
                className="object-cover h-[15vh] w-[15vh] py-2"
                height={item.album.images[0].height}
                width={item.album.images[0].width}
              />
              <span className="text-center text-sm pt-2 xl:max-w-sm md:max-w-40">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis text-nowrap xl:text-wrap">{item.name}</p>
                {item.artists.map((artist, index) => (
                  <p
                    key={artist.id}
                    className="mx-2 text-orange-400 overflow-hidden whitespace-nowrap text-ellipsis md:text-wrap"
                  >
                    {index === item.artists.length - 1 ? artist.name : `${artist.name}, `}
                  </p>
                ))}
                <p className="overflow-hidden whitespace-nowrap text-ellipsis text-nowrap xl:text-wrap">
                  {item.album.name}
                </p>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponentTop;
