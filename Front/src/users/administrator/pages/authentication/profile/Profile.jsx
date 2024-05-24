import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import SecNav from "./SecNav";
import { Outlet } from "react-router-dom";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile nav dialog */}
        <Transition.Root show={isOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setIsOpen}
          >
            <Transition.Child
              as={React.Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Nav</h2>
                  <button
                    className="text-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close nav menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <SecNav />
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {" "}
              Users Information
            </h1>
            <p className="mt-4 text-base text-gray-500"></p>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <SecNav />
            </aside>
            <div className="mt-6 lg:mt-0 lg:col-span-1 xl:col-span-3 grid grid-cols-3">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
