import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ResponseData } from "../interfaces/songInterface";
import { ArtistData } from "../interfaces/artistInterface";
import { CardData } from "../interfaces/cardInterface";
import { getArtistInfo, getToken, tallyArtist } from "@/functions/apiFunctions";
import { images } from "../constants";
import Image from "next/image";

function chooseColor(selectColor: number): string {
  const colors = [
    "bg-gradient-to-br from-[#2c0735]/60 via-[#613dc1]/70 to-[#d7dffc]/50",
    "bg-gradient-to-br from-[#ffcbf2]/75 via-[#deaaff]/65 to-[#a2d2ff]/65",
    "bg-gradient-to-br from-[#571098]/50 via-[#973aa8]/60 to-[#ea698b]/50",
    "bg-gradient-to-br from-[#a8dadc]/50 via-[#457b9d]/70 to-[#1B3354]/60",
    "bg-gradient-to-b from-[#001F54]/70 via-[#D14081]/55 to-[#001F54]/70",
    "bg-gradient-to-br from-[#FFD9DA]/65 via-[#ea638c]/65 to-[#89023e]/65",
  ];
  return colors[selectColor % colors.length];
}

const Summary: React.FC<ResponseData & CardData> = ({ items, genreData, dataRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const backButtonRef = useRef(null);
  const itemNames = items.map((item) => item.name).join(" · ");

  const [artistData, setArtistData] = useState<ArtistData | null>({
    genres: [],
    href: "",
    id: "",
    images: [],
    name: "",
    popularity: 0,
    type: "",
    uri: "",
  });

  const [topArtistHref, setTopArtistHref] = useState("");
  const [sortedArtists, setSortedArtists] = useState(new Map<string, number>());
  const [sortedByValue, setSortedByValue] = useState<{ genre: string; key: string }[]>([]);
  const [colorNumber, setColorNumber] = useState(0);
  const [colorCombinations, setColorCombinations] = useState("");

  useEffect(() => {
    setColorCombinations(chooseColor(colorNumber));
  }, [colorNumber]);

  useEffect(() => {
    const artistCounts = tallyArtist({ items });
    if (artistCounts.entries().next().value) {
      const unsortedArtists = Array.from(artistCounts.entries());
      const sortedArtists = new Map(unsortedArtists.sort((a, b) => b[1] - a[1]));
      setSortedArtists(sortedArtists);
      // Find the first artist that matches in the top 3 songs so we can get the href of the most listened to artist instead of the very first artist we find
      const topArtist = items.find((item) => {
        return item.artists.some((artist) => artist.name === sortedArtists.entries().next().value[0]);
      });
      if (topArtist) {
        setTopArtistHref(
          topArtist.artists.find((artist) => artist.name === sortedArtists.entries().next().value[0])?.href || ""
        );
      }
    }
    if (genreData) {
      const unsortedArray = Array.from(genreData.entries());
      const sortedByValue = unsortedArray.sort((a, b) => b[1] - a[1]).splice(0, 3);
      const displayGenres: { genre: string; key: string }[] = sortedByValue.map((genre, index, array) => {
        if (index === array.length - 1) {
          return {
            genre: `${index + 1}. ${genre[0]}`,
            key: genre[0],
          };
        } else {
          return {
            genre: `${index + 1}. ${genre[0]}, `,
            key: genre[0],
          };
        }
      });

      setSortedByValue(displayGenres);
    }
  }, [items, genreData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await getArtistInfo(token, topArtistHref);
        setArtistData(response); // Update state with the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, [topArtistHref]); // Add topArtistHref as a dependency

  return (
    <div className="flex justify-end">
      <span className="relative inline-flex">
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 font-semibold leading-6 text-sm shadow rounded-md text-spotify-green bg-neutral-800"
          onClick={() => {
            setIsOpen(true);
            setColorNumber(colorNumber + 1);
          }}
        >
          Share
        </button>
        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spotify-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-spotify-green"></span>
        </span>
      </span>
      {isOpen && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={backButtonRef} onClose={setIsOpen}>
            <div className="fixed inset-0 bg-grey-500 bg-opacity-85 backdrop-blur-sm" />

            <div className="fixed inset-0 z-10 w-screen">
              <div className="flex min-h-full items-start justify-center p-4 text-center">
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-lg text-left shadow-xl w-full backdrop-blur-xl drop-shadow 
                ${colorCombinations}`}
                >
                  <div className="px-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="grid grid-cols-11 border-b-2 pb-1">
                        <Dialog.Title
                          as="h1"
                          className="text-xl font-semibold leading-6 text-slate-100 text-center col-start-2 col-span-9 content-center"
                        >
                          {`UnWrapped ${dataRange}`}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="ml-auto rounded-md inline-flex items-center justify-center text-gray-400 mb-3"
                          onClick={() => setIsOpen(false)}
                          ref={backButtonRef}
                        >
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Description as="div" className="mt-2 text-md font-bold text-slate-100">
                          Overall Top Artist
                        </Dialog.Description>
                        <div className="pb-2 border-b-2">
                          <h3 className="font-xl font-semibold mt-2 text-slate-100">
                            {sortedArtists.entries().next().value[0]}
                          </h3>

                          {artistData?.images && artistData.images.length > 0 ? (
                            <Image
                              src={artistData.images[0].url}
                              alt="top album image"
                              width={200}
                              height={200}
                              className="mx-auto"
                            />
                          ) : (
                            <div>Loading...</div>
                          )}
                        </div>
                        <Dialog.Description as="div" className="mt-2 text-md font-semibold text-slate-100">
                          Top 10
                        </Dialog.Description>
                        <div className="border-b-2 pb-1">
                          <span className="text-sm inline-block text-white opacity-70">{itemNames}</span>
                        </div>
                        <Dialog.Description as="div" className="mt-2 text-md font-semibold text-slate-100">
                          Overall Top Genres
                        </Dialog.Description>
                        <div className="pb-2.5 border-b-2">
                          {sortedByValue.map((genreObject) => (
                            <span key={genreObject.key} className="ml-2 text-sm inline-block text-white opacity-70">
                              {genreObject.genre}
                            </span>
                          ))}
                        </div>
                        <div>
                          <div className="flex items-center justify-between m-2">
                            <Image
                              src={images[1].icon}
                              alt="spotify logo"
                              width={images[1].width - 20}
                              height={images[1].height - 20}
                              className="row-span-2"
                            />
                            <span className="text-sm font-bold inline-block text-white opacity-70">
                              unwrapped-app.vercel.app
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default Summary;
