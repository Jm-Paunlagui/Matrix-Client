import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import React, { Fragment } from "react";

import logo from "../../assets/img/android-chrome-192x192.png";
import { isAuth, signout } from "../../helpers/Auth";
import httpClient from "../../http/httpClient";
import { BsAwardFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function UserNavigationBar() {
  /**
   * @description Gets the user data from the Auth helper
   */
  const user = isAuth();

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
    return splitLocation[2] === link;
  }

  /**
   * @description Handles the sub link if it is active or not.
   * @param link
   * @returns {boolean}
   */
  function isActiveSubs(link) {
    return splitLocation[3] === link;
  }

  /**
   * @description Handles the logout of the user
   * @returns {Promise<void>}
   */
  const logoutUser = async () => {
    await httpClient
      .post("/user/sign-out")
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 2100);
        signout();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
  };

  /**
   * @description Handles the navigation bar for the admin pages
   * @type @type {[{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string},{current: boolean, name: string, href: string}]}
   */
  const navigation = [
    {
      name: "Evaluation Results",
      href: "/user/evaluation-results/files",
      current: isActive("evaluation-results"),
    },
  ];

  /**
   * @description Handles the profile menu for the admin pages
   * @type {[{current: boolean, name: string, href: string},{current: boolean, name: string, href: string}]}
   */
  const user_controllers = [
    {
      name: "Your Profile",
      href: `/user/profile/${user.username}`,
      current: isActive("profile"),
    },
    {
      name: "Sign out",
      href: "logout",
      current: isActive("logout"),
    },
  ];

  const navigation_for_dashboard = [
    {
      name: "Sentiment Analysis",
      href: "/user/dashboard/sentiment-analysis",
      current: isActiveSubs("sentiment-analysis"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
  ];

  const navigation_for_insights = [
    {
      name: "Department",
      href: "/user/insights/departments",
      current: isActiveSubs("departments"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
    {
      name: "Per Semester Department",
      href: "/user/insights/per-semester-department",
      current: isActiveSubs("per-semester-department"),
      icon: <BsAwardFill size={16} />,
      icon_: <BsAwardFill size={24} />,
    },
  ];

  return (
    <Menu
      as="nav"
      className="sticky fixed top-0 z-50 w-full bg-blue-500 shadow font-Montserrat"
    >
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Menu.Button className="inline-flex items-center justify-center p-2 text-blue-100 rounded-md ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon aria-hidden="true" className="block w-6 h-6" />
                  ) : (
                    <Bars3Icon aria-hidden="true" className="block w-6 h-6" />
                  )}
                </Menu.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch lg:justify-start">
                <NavLink to="/">
                  <div className="flex items-center flex-shrink-0">
                    <img
                      alt="Your Company"
                      className="block w-auto h-10 md:hidden"
                      src={logo}
                    />
                    <img
                      alt="Your Company"
                      className="hidden w-auto h-10 md:block"
                      src={logo}
                    />
                  </div>
                </NavLink>
                <div className="hidden sm:ml-6 lg:block">
                  <div className="flex space-x-4">
                    <div className="text-base font-medium">
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button
                            className={`flex text-sm rounded ${
                              isActive("dashboard")
                                ? "bg-blue-400 text-white"
                                : "text-blue-100 hover:bg-blue-400 hover:text-white"
                            } px-3 py-2 rounded-md text-sm font-medium`}
                          >
                            <div className="text-base font-medium text-blue-100 hover:text-white">
                              Dashboard
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute left-0 z-10 py-1 mt-2 origin-top-right bg-blue-100 rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {navigation_for_dashboard.map((item) => (
                              <Menu.Item key={item.name}>
                                <NavLink to={item.href}>
                                  <h5
                                    className={`${
                                      item.current
                                        ? "bg-blue-400 text-white"
                                        : "text-blue-500 hover:bg-blue-400 hover:text-white"
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                  >
                                    {item.name}
                                  </h5>
                                </NavLink>
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    {navigation.map((item) => (
                      <NavLink key={item.name} to={item.href}>
                        <h5
                          className={`${
                            item.current
                              ? "bg-blue-400 text-white"
                              : "text-blue-100 hover:bg-blue-400 hover:text-white"
                          } px-3 py-2 rounded-md text-base font-medium`}
                        >
                          {item.name}
                        </h5>
                      </NavLink>
                    ))}

                    <div className="text-base font-medium">
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button
                            className={`flex text-sm rounded ${
                              isActive("insights")
                                ? "bg-blue-400 text-white"
                                : "text-blue-100 hover:bg-blue-400 hover:text-white"
                            } px-3 py-2 rounded-md text-sm font-medium`}
                          >
                            <h1 className="text-base font-medium text-blue-100 hover:text-white">
                              Insights
                            </h1>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-blue-100 rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {navigation_for_insights.map((item) => (
                              <Menu.Item key={item.name}>
                                <NavLink to={item.href}>
                                  <h5
                                    className={`${
                                      item.current
                                        ? "bg-blue-400 text-white"
                                        : "text-blue-500 hover:bg-blue-400 hover:text-white"
                                    } px-3 py-2 rounded-md text-sm font-medium`}
                                  >
                                    {item.name}
                                  </h5>
                                </NavLink>
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 inset-auto right-0 flex items-center ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button
                      className={`flex text-sm rounded ${
                        isActive("profile")
                          ? "bg-blue-400 text-white"
                          : "text-blue-100 hover:bg-blue-400 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      <span className="sr-only">Open user menu</span>
                      <h1 className="text-base font-medium">{user.username}</h1>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-blue-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <NavLink to={user_controllers[0].href}>
                          <h5
                            className={`${
                              user_controllers[0].current
                                ? "bg-blue-400 text-white"
                                : "text-blue-500 hover:bg-blue-400 hover:text-white"
                            } px-3 py-2 rounded-md text-sm font-medium`}
                          >
                            {user_controllers[0].name}
                          </h5>
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            onClick={logoutUser}
                            to={user_controllers[1].href}
                          >
                            <h5
                              className={`${
                                active
                                  ? "bg-blue-400 text-white"
                                  : "text-blue-500 hover:bg-gray-700 hover:text-white"
                              } px-3 py-2 rounded-md text-sm font-medium`}
                            >
                              {user_controllers[1].name}
                            </h5>
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            show={open}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-100">
              <h5
                className={`block px-3 py-2 text-base font-bold text-blue-500`}
              >
                Dashboard
              </h5>
              {navigation_for_dashboard.map((item) => (
                <NavLink key={item.name} to={item.href}>
                  <h5
                    className={`${
                      item.current
                        ? "bg-blue-400 text-white"
                        : "text-blue-500 hover:bg-blue-400 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {item.name}
                  </h5>
                </NavLink>
              ))}
              <h5
                className={`block px-3 py-2 text-base font-bold text-blue-500`}
              >
                Evaluation Results
              </h5>

              {navigation.map((item) => (
                <NavLink key={item.name} to={item.href}>
                  <h5
                    className={`${
                      item.current
                        ? "bg-blue-400 text-white"
                        : "text-blue-500 hover:bg-blue-400 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {item.name}
                  </h5>
                </NavLink>
              ))}

              <h5
                className={`block px-3 py-2 text-base font-bold text-blue-500`}
              >
                Insights
              </h5>

              {navigation_for_insights.map((item) => (
                <NavLink key={item.name} to={item.href}>
                  <h5
                    className={`${
                      item.current
                        ? "bg-blue-400 text-white"
                        : "text-blue-500 hover:bg-blue-400 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {item.name}
                  </h5>
                </NavLink>
              ))}
            </div>
          </Transition>
        </>
      )}
    </Menu>
  );
}
