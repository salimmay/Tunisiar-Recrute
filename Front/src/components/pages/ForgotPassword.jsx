import React from "react";

const ForgotPassword = () => {

  return (
    <>
         <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>

          <div className="mt-10 sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="/" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
                >
                  Request Reset Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
};

export default ForgotPassword;
