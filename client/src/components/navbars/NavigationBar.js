import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { BsAwardFill } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import logo from "../../assets/img/android-chrome-192x192.png";
import { DELAY_1 } from "../../assets/styles/styled-components";

/**
 * @description NavigationBar component with useful links
 */
export default function NavigationBar() {
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
    return splitLocation[1] === link;
  }

  /**
   * @description Navigation bar array of objects for the navigation bar links
   */
  const NavigationBarlinks = [
    {
      name: "Home",
      icon: <AiFillHome size={16} />,
      icon_: <AiFillHome size={24} />,
      link: "/",
      current: isActive(""),
    },
    {
      name: "Leaderboard",
      icon: <MdLeaderboard size={16} />,
      icon_: <MdLeaderboard size={24} />,
      link: "/department-sentiment-overall",
      current: isActive("department-sentiment-overall"),
    },
    {
      name: "Ranking",
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
      link: "/department-sentiment",
      current: isActive("department-sentiment"),
    },
    {
      name: "Sign In",
      icon: <FaSignInAlt size={16} />,
      icon_: <FaSignInAlt size={24} />,
      link: "/auth",
      current: isActive("auth"),
    },
  ];

  return (
    <Menu
      as={"nav"}
      className="fixed top-0 z-50 flex flex-wrap items-center justify-between w-full p-1 shadow-md bg-blue-500 font-Montserrat"
    >
      {({ open }) => (
        <div className="container flex flex-wrap items-center justify-between mx-auto max-w-7xl">
          <div className="flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink to="/">
              <div className="flex items-center px-3 py-2 text-blue-100 transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
                <img alt="logo" className="w-10 h-10" src={logo} />
                <h1
                  className={`ml-2 text-xl font-bold tracking-widest ${DELAY_1} md:text-3xl lg:flex`}
                >
                  MATRIX LAB
                </h1>
              </div>
            </NavLink>
            <Menu.Button className={`block px-3 py-1 text-blue-100 lg:hidden`}>
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
                {NavigationBarlinks.map((link) => (
                  <NavLink key={link.name} to={link.link}>
                    <li
                      className={`${
                        link.current
                          ? "bg-blue-400 text-white"
                          : "text-blue-100 hover:bg-blue-400 hover:text-white"
                      } ${DELAY_1} flex items-center px-8 py-2 rounded-md text-base font-medium`}
                    >
                      {link.icon}
                      <h1 className="block ml-1 text-lg font-medium">
                        {link.name}
                      </h1>
                    </li>
                  </NavLink>
                ))}
              </ul>
            </Transition>
            <ul className="flex-col justify-start hidden list-none lg:flex lg:flex-row lg:ml-auto">
              {NavigationBarlinks.map((link) => (
                <NavLink key={link.name} to={link.link}>
                  <li
                    className={`${
                      link.current
                        ? "bg-blue-400 text-white"
                        : "text-blue-100 hover:bg-blue-400 hover:text-white"
                    } ${DELAY_1} flex items-center px-8 py-2 rounded-md text-base font-medium`}
                  >
                    {link.icon_}
                  </li>
                </NavLink>
              ))}
            </ul>
          </Menu>
        </div>
      )}
    </Menu>
  );
}
