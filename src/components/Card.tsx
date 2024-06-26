import { ResponseData } from "../interfaces/songInterface";
import { CardData } from "../interfaces/cardInterface";
import CardComponentTop from "./CardComponentTop";
import CardComponentList from "./CardComponentList";
import Summary from "./Summary";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { images } from "../constants";

const Card: React.FC<ResponseData & CardData> = ({ items, dataRange, genreData }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  if (items && items.length > 0) {
    const tracksWithHeaders = items.slice(0, 3);
    const tracksInList = items.slice(3, 10);

    return isMobile ? (
      <div className="p-8 mx-auto h-[95vh] bg-background-image bg-cover my-5">
        <div className="grid grid-cols-4 items-center pb-2">
          <Image
            src={images[1].icon}
            alt="spotify logo"
            width={images[1].width}
            height={images[1].height}
            className="row-span-2"
          />
          <h1 className="text-center text-balance text-sm md:text-lg col-span-2 row-span-2">{`UnWrapped ${dataRange}`}</h1>
          <div className="row-span-2">
            <Summary items={items} genreData={genreData} dataRange={dataRange} />
          </div>
        </div>
        <CardComponentList items={items} />
      </div>
    ) : (
      <div className="p-8 w-5/6 mx-auto h-[100vh] bg-background-image bg-cover bg-center mb-3">
        <div className="grid grid-cols-3">
          <Image
            src={images[1].icon}
            alt="spotify logo"
            width={images[1].width}
            height={images[1].height}
            className="mb-5"
          />
          <h1 className="text-center">{`UnWrapped ${dataRange}`}</h1>
        </div>
        {/* these both have div's being returned. */}
        <CardComponentTop items={tracksWithHeaders} />
        <CardComponentList items={tracksInList} />
      </div>
    );
  } else {
    return (
      <div className="h-[33vh]">
        <div
          className="flex flex-col h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white mx-auto"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
};

export default Card;
