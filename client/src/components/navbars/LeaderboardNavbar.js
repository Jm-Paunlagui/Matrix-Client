import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BsAwardFill } from "react-icons/bs";

export default function LeaderboardNavbar() {
  /**
   * @description Navigation bar array of objects for the navigation bar links
   * @type {Location}
   */
  const location = useLocation();

  /**
   * @description Destructure the location object to get the pathname
   */
  const { pathname } = location;

  /**
   * @description Javascript split method to get the first part of the pathname.
   */
  const splitLocation = pathname.split("/");

  /**
   * @description Handles the link if it is active or not.
   * @param link
   * @returns {boolean}
   */
  function isActive(link) {
    return splitLocation[3] === link;
  }

  /**
   * @description Handles the navigation bar for the admin pages
   * @type {[{current: boolean, name: string, href: string}]}
   */
  const navigation = [
    {
      name: "Department",
      href: "/admin/insights/departments",
      current: isActive("departments"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Employee",
      href: "/admin/insights/employees",
      current: isActive("employees"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Per Semester Department",
      href: "/admin/insights/per-semester-department",
      current: isActive("per-semester-department"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Per Semester Employee",
      href: "/admin/insights/per-semester-employee",
      current: isActive("per-semester-employee"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
  ];

  return (
    <div className="flex items-center justify-between mx-auto bg-white border-gray-200">
      <Menu
        as={"nav"}
        className="fixed z-40 top-16 flex items-center justify-between w-full p-1 backdrop-blur-xl bg-white/50 font-Montserrat"
      >
        {({ open }) => (
          <div className="container flex flex-wrap items-center justify-between px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
              <div className="flex items-center py-2 text-gray-900 transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                <h1 className="text-base font-bold lg:flex">
                  Sentiment Analysis
                </h1>
              </div>
              <Menu.Button className={`block px-1 py-1 lg:hidden`}>
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block w-6 h-6" />
                ) : (
                  <Bars3Icon className="block w-6 h-6" />
                )}
              </Menu.Button>
            </div>
            <Menu
              as={"div"}
              className={`lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none ${
                open ? " block" : " hidden"
              }`}
            >
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                show={open}
              >
                <ul className="flex flex-col ml-auto space-y-1">
                  {navigation.map((link) => (
                    <NavLink key={link.name} to={link.href}>
                      <li
                        className={`${
                          link.current
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                        } block px-3 py-2 text-base font-medium`}
                      >
                        <h1 className="block ml-1 text-lg font-medium">
                          {link.name}
                        </h1>
                      </li>
                    </NavLink>
                  ))}
                </ul>
              </Transition>
              <ul className="justify-start flex-col hidden list-none lg:flex lg:flex-row lg:ml-auto">
                {navigation.map((link) => (
                  <NavLink key={link.name} to={link.href}>
                    <li
                      className={`${
                        link.current
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                          : "hover:text-transparent bg-clip-text hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500"
                      } block px-3 py-2 text-base font-medium`}
                    >
                      {link.name}
                    </li>
                  </NavLink>
                ))}
              </ul>
            </Menu>
          </div>
        )}
      </Menu>
    </div>
  );
}
