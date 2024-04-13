import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Summary: React.FC<{ genreData: Map<string, number> }> = ({ genreData }) => {
  const [open, setOpen] = useState(false);

  const backButtonRef = useRef(null);

  const unsortedArray = Array.from(genreData.entries());
  const sortedByValue = new Map(
    Array.from(unsortedArray)
      .sort((a, b) => b[1] - a[1])
      .splice(0, 3)
  );

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
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Top Genres
                          </Dialog.Title>
                          <div className="mt-2">
                            <div className="mt-2">
                              <ul className="divide-y divide-gray-200">
                                {Array.from(sortedByValue).map((genre, index) => (
                                  <li key={index} className="py-4 flex justify-between">
                                    <div className="flex w-0 flex-1 items-center">
                                      <span className="ml-2 text-sm font-semibold text-gray-900">{genre[0]}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <p className="text-sm font-semibold text-gray-900">{genre[1]}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
