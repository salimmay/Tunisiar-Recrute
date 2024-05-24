import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../../assets/logo.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const navigation = [
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Disclosure as="nav" className="bg-white shadow fixed w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-10 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-3 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-3 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to="/" className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={logo}
                    alt="Tunisair"
                  />
                </NavLink>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-center w-full">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "border-red-700 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-red-700 hover:text-gray-700",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isLoggedIn ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/"
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </NavLink>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-red-50 border-red-700 text-red-700"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
