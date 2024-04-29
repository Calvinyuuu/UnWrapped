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
  const topThreeSongs = items.slice(0, 3);

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
      <button
        className="text-sm md:text-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg p-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={() => setIsOpen(true)}
      >
        Open Summary
      </button>
      {isOpen && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={backButtonRef} onClose={setIsOpen}>
            <div className="fixed inset-0 bg-grey-500 bg-opacity-85 transition-opacity backdrop-blur-sm" />

            <div className="fixed inset-0 z-10 w-screen">
              <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all w-full bg-slate-700 bg-opacity-80 backdrop-blur-xl drop-shadow">
                    <div className="px-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <Dialog.Title
                          as="h1"
                          className="text-base font-semibold leading-6 border-b-2 text-slate-100 text-center"
                        >
                          Summary ≈ {dataRange}
                        </Dialog.Title>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Description as="div" className="mt-2 text-sm text-slate-100">
                            Top Artist
                          </Dialog.Description>
                          <div className="pb-2 border-b-2">
                            <h3 className="font-bold font-3xl mt-2 text-slate-100">
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
                          <Dialog.Description as="div" className="mt-2 text-sm text-slate-100">
                            Top Songs
                          </Dialog.Description>
                          <div className="pb-2 border-b-2">
                            <ul className="divide-y divide-gray-200">
                              {topThreeSongs.map((item, index) => (
                                <li key={index} className="py-4 flex">
                                  <div className="flex w-0 flex-1 items-center">
                                    <span className="ml-2 text-sm font-semibold text-slate-100 text-left">
                                      {`${index + 1}. ${item.name}`}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Dialog.Description as="div" className="mt-2 text-sm text-slate-100">
                            Top Genres
                          </Dialog.Description>
                          <div>
                            <ul className="divide-y divide-gray-200">
                              {Array.from(sortedByValue).map((genre, index) => (
                                <li key={index} className="py-2 flex">
                                  <div className="flex w-0 flex-1 items-center">
                                    <span className="ml-2 text-sm font-semibold text-slate-100">
                                      {`${index + 1}. ${genre[0]}`}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 pb-3 sm:flex sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsOpen(false)}
                        ref={backButtonRef}
                      >
                        Back
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default Summary;
