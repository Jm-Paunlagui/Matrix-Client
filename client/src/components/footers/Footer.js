import React from "react";
import { Link } from "react-router-dom";

import {
  faFacebookMessenger,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DELAY_1, DELAY_3 } from "../../assets/styles/styled-components";

/**
 * @type {Array}
 * @description Links to be displayed in the footer
 */
const UsefulLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "aboutus",
  },
  {
    name: "Terms & Conditions",
    link: "legal/terms-and-conditions",
  },
  {
    name: "Privacy Policy",
    link: "legal/privacy-policy",
  },
];

/**
 * @description Footer component for the application that displays useful links
 */
export default function Footer() {
  return (
    <footer className="px-6 pt-8 pb-6 mt-auto text-blue-500 font-Montserrat bg-blue-50">
      <div className="container mx-auto max-w-7xl">
        <hr className="my-6 border-blue-200" />
        <div className="flex flex-wrap py-4 text-center">
          <div className="items-center w-full lg:flex lg:space-x-6 place-content-center">
            <h4 className="text-2xl font-semibold">
              Let&apos;s keep in touch!
            </h4>
            <h5 className="text-lg">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-4 mb-6 space-x-4 text-blue-500 lg:mb-0 lg:mt-0 place-self-center">
              <button
                className={`${DELAY_3} w-10 h-10 font-normal bg-white rounded-full shadow outline-none hover:shadow-lg align-center focus:outline-none hover:text-blue-700 hover:bg-gray-200 hover:-translate-y-1 hover:scale-110`}
                type="button"
              >
                <a
                  href="https://twitter.com/messages/719487995892539393-719487995892539393?text="
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </button>
              <button
                className={`${DELAY_3} w-10 h-10 font-normal bg-white rounded-full shadow outline-none hover:shadow-lg align-center focus:outline-none hover:text-blue-700 hover:bg-gray-200 hover:-translate-y-1 hover:scale-110`}
                type="button"
              >
                <a
                  href="https://www.messenger.com/t/100001178366981"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebookMessenger} />
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap py-4 text-center">
          <div className="items-center w-full md:flex md:space-x-20 lg:place-content-end lg:px-4 xl:px-44 place-content-center">
            {UsefulLinks.map((link) => (
              <Link key={link.name} to={`/${link.link}`}>
                <div
                  className={`block pb-2 text-sm font-semibold hover:text-gray-800 ${DELAY_1}`}
                >
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <hr className="my-6 border-blue-200" />
        <div className="flex flex-wrap md:justify-between">
          <div className="w-full px-4 mx-auto text-center md:w-4/12">
            <div className="py-1 text-sm font-semibold text-blue-500">
              Copyright © {new Date().getFullYear()} Matrix Lab by{" "}
              <Link to="https://www.creative-tim.com?ref=nr-footer">
                <div className="text-blue-500 hover:text-blue-800">
                  Morning Group.
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
