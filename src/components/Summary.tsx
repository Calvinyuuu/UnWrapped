import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ResponseData } from "../interfaces/songInterface";
import { ArtistData } from "../interfaces/artistInterface";
import { CardData } from "../interfaces/cardInterface";
import { getArtistInfo, getToken, tallyArtist } from "@/functions/apiFunctions";
import Image from "next/image";

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
  const [sortedByValue, setSortedByValue] = useState(new Map<string, number>());

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
      const sortedByValue = new Map(unsortedArray.sort((a, b) => b[1] - a[1]).splice(0, 3));
      setSortedByValue(sortedByValue);
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
          onClick={() => setIsOpen(true)}
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
            <div className="fixed inset-0 bg-grey-500 bg-opacity-85 transition-opacity backdrop-blur-sm" />

            <div className="fixed inset-0 z-10 w-screen">
              <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl w-full bg-gradient-to-br from-[#613DC1]/70 to-[#B0A3D4]/30 backdrop-blur-xl drop-shadow">
                  <div className="px-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="grid grid-cols-3 border-b-2 pb-1">
                        <Dialog.Title
                          as="h1"
                          className="text-xl font-semibold leading-6 text-slate-100 text-center col-start-2 content-center"
                        >
                          {dataRange}
                        </Dialog.Title>
                        <button
                          type="button"
                          className="ml-auto rounded-md inline-flex items-center justify-center text-gray-400 col-start-3 mb-3"
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
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
                              width={150}
                              height={150}
                              className="mx-auto"
                            />
                          ) : (
                            <div>Loading...</div>
                          )}
                        </div>
                        <Dialog.Description as="div" className="mt-2 text-md font-semibold text-slate-100">
                          Overall Top Songs
                        </Dialog.Description>
                        <div className="border-b-2 pb-1">
                          <span className="text-sm inline-block text-white opacity-70">{itemNames}</span>
                        </div>
                        <Dialog.Description as="div" className="mt-2 text-md font-semibold text-slate-100">
                          Overall Top Genres
                        </Dialog.Description>
                        <div className="pb-1">
                          {Array.from(sortedByValue).map((genre, index) => (
                            <span className="ml-2 text-sm inline-block text-white opacity-70">{`${index + 1}. ${
                              genre[0]
                            }`}</span>
                          ))}
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
