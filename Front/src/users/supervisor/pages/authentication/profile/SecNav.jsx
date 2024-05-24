import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  ClipboardCopyIcon,
} from "@heroicons/react/outline";

const secondNavigation = [
  {
    name: "Profile",
    href: "SupervisorProfileContent",
    icon: HomeIcon,
  },
  {
    name: "Manage Supervision",
    href: "applications",
    icon: ClipboardCopyIcon,
  },
  {
    name: "Workshops",
    href: "Workshops",
    icon: CalendarIcon,
  },
];

function SecNav() {
  return (
    <nav className="bg-white h-screen left-0 top-0 w-64 flex flex-col">
      {secondNavigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            `text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center ${
              isActive ? 'bg-red-700 text-white' : 'hover:bg-red-700 hover:text-white'
            }`
          }
        >
          <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default SecNav;

