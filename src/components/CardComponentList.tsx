import { ResponseData } from "../interfaces/songInterface";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const CardList: React.FC<ResponseData> = (data) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className="xl:h-[50vh] lg:h-[60vh] overflow-hidden">
      {/* remember to have a default height/width if using media breakpoints */}
      <div className="overflow-y-scroll lg:h-[50vh] md:h-[60vh] h-[80vh]">
        <ul className="divide-y divide-gray-200">
          {data.items.map((item, index) => (
            <li key={item.id} className="py-4">
              <div className="flex flex-row items-center">
                <span className="mr-2">{isMobile ? index + 1 + "." : index + 4 + "."}</span>

                <Image
                  src={item.album.images[0].url}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="aspect-square"
                />

                <div className="flex-grow lg:mr-32">
                  <div className="text-center text-xs md:text-lg">{item.name}</div>
                  <div className="flex flex-wrap justify-center py-1">
                    {item.artists.map((artist, index) => (
                      <div key={artist.id} className="mx-2 text-orange-400 text-xs md:text-lg">
                        {index === item.artists.length - 1 ? artist.name : `${artist.name}, `}
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-xs md:text-lg">{item.album.name}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardList;
