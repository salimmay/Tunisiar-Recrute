import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import API from "../../../../../service/api";

export default function ApplicationModal({ open, setOpen, application }) {
  const [quizResult, setQuizResult] = useState(null);

  const getQuizResult = async () => {
    try {
      const user = await API.get(`/users/email/${application.email}`);
      const quizResult = await API.get(`/quizResults/quiz-results/${user.data._id}`);
      console.log(quizResult);
      setQuizResult(quizResult);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-red-900">
                        <h1>Application Details</h1>
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <p className="text-2xl text-gray-400">First Name:</p>
                    <p className="text-2xl text-gray-900">{application.firstName}</p>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">Last Name:</p>
                    <p className="text-2xl text-gray-900">{application.lastName}</p>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">Email:</p>
                    <p className="text-2xl text-gray-900">{application.email}</p>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">University:</p>
                    <p className="text-2xl text-gray-900">{application.university}</p>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">Phone Number:</p>
                    <p className="text-2xl text-gray-900">{application.phoneNumber}</p>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">Cover Letter:</p>
                    <a href={application.coverLetter} download className="text-2xl text-red-600">
                      Download Cover Letter
                    </a>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">Resume:</p>
                    <a href={application.resume} download className="text-2xl text-red-600">
                      Download Resume
                    </a>
                    <hr className="my-4" />
                    <p className="text-2xl text-gray-400">About Yourself:</p>
                    <p className="text-2xl text-gray-900">{application.aboutYourself}</p>
                    <hr className="my-4" />
                    {quizResult ? (
                      <div>
                        <p className="text-2xl text-gray-400">Quiz Score:</p>
                        <div className="text-2xl text-gray-900">{quizResult.data[0].score}</div>
                      </div>
                    ) : (
                      <button
                        className="bg-red-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={getQuizResult}
                      >
                        Quiz results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
