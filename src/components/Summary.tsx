import { Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { ResponseData } from "../interfaces/songInterface";
import { ArtistData } from "../interfaces/artistInterface";
import { getArtistInfo, getToken } from "@/functions/apiFunctions";
import Image from "next/image";

const Summary: React.FC<ResponseData & { genreData: Map<string, number> }> = ({ items, genreData }) => {
  const [open, setOpen] = useState(false);
  const backButtonRef = useRef(null);

  const [artistData, setArtistData] = useState<ArtistData>({
    genres: [],
    href: "",
    id: "",
    images: [],
    name: "",
    popularity: 0,
    type: "",
    uri: "",
  });

  const unsortedArray = Array.from(genreData.entries());
  const sortedByValue = new Map(
    Array.from(unsortedArray)
      .sort((a, b) => b[1] - a[1])
      .splice(0, 3)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await getArtistInfo(token, items[0].artists[0].href);
        setArtistData(response); // Update state with the fetched data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Summary</button>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={backButtonRef} onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-grey-500 bg-opacity-85 transition-opacity backdrop-blur-sm" />
            </Transition.Child>

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
                        <Dialog.Title as="h1" className="text-base font-semibold leading-6 border-b-2 text-slate-100">
                          Summary
                        </Dialog.Title>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Description as="div" className="mt-2 text-sm text-slate-100">
                            Top Artist
                          </Dialog.Description>
                          <div className="pb-2 border-b-2">
                            <h3 className="font-bold font-3xl mt-2 text-slate-100">{items[0].artists[0].name}</h3>
                            <Image
                              src={artistData.images[0].url}
                              alt="top album image"
                              width={200}
                              height={200}
                              className="mx-auto"
                            />
                          </div>
                          <Dialog.Description as="div" className="mt-2 text-sm text-slate-100">
                            Top Genres
                          </Dialog.Description>
                          <div>
                            <ul className="divide-y divide-gray-200">
                              {Array.from(sortedByValue).map((genre, index) => (
                                <li key={index} className="py-4 flex justify-between">
                                  <div className="flex w-0 flex-1 items-center">
                                    <span className="ml-2 text-sm font-semibold text-slate-100">{genre[0]}</span>
                                  </div>
                                  <div className="mr-2 flex-shrink-0">
                                    <p className="text-sm text-center font-semibold text-slate-100">{genre[1]}</p>
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
                        onClick={() => setOpen(false)}
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
