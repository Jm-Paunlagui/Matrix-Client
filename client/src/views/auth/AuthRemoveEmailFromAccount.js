import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../../assets/img/android-chrome-192x192.png";
import {
  ACCENT_BUTTON,
  DANGER_RADIO,
  ICON_PLACE_SELF_CENTER,
  PRIMARY_RADIO,
} from "../../assets/styles/styled-components";
import httpClient from "../../http/httpClient";
import { maskUsername } from "../../helpers/Helper";
import { toast } from "react-toastify";
import { LoadingAnimation } from "../../components/loading/LoadingPage";

/**
 * @description Handles the forgot password request listbox
 */
export default function AuthRemoveEmailFromAccount() {
  /**
   * @description Gets the token from the url
   */
  const { token } = useParams();

  /**
   * @description State variables for the reset password form.
   */
  const [removeEmailFromAccount, setRemoveEmailFromAccount] = useState({
    buttonDisabled: true,
    email: "",
    option: "",
    textChange: "Next",
    trigger: "",
    username: "",
  });

  /**
   * @description Decoding the token from the server to get the email and username of the user
   */
  function decodeToken() {
    httpClient
      .get(`/user/verify-remove-account-token/${token}`)
      .then((res) => {
        setRemoveEmailFromAccount({
          ...removeEmailFromAccount,
          email: res.data.user_data.email,
          username: res.data.user_data.username,
        });
      })
      .catch((err) => {
        window.location.href = "/invalid-token";
        toast(`Error: ${err.response.data.message}`, { type: "error" });
      });
  }

  useEffect(() => {
    decodeToken();
  }, [token]);

  /**
   * @description Handles the Error/Success animation and messages for the reset password form.
   */
  const [oki, setOki] = useState(false);
  const [errorEffect, setErrorEffect] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  /**
   * @description Handles the change of the input fields
   * @param event
   */
  const handleOptionsChange = (event) => {
    const { name, value } = event.target;
    setRemoveEmailFromAccount({
      ...removeEmailFromAccount,
      buttonDisabled: false,
      [name]: value,
    });
    // reset the error message when the user starts typing and error effect set to false.
    setErrorEffect(false);
    setErrorMessage("");
  };

  /**
   * @description Destructs the state variables
   */
  const { buttonDisabled, email, option, textChange, trigger, username } =
    removeEmailFromAccount;

  /**
   * @description Handles the form submission and makes a POST request to the backend to reset the password.
   * @param event
   * @returns {Promise<void>}
   */
  const handleRemoveEmailSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setRemoveEmailFromAccount({
      ...removeEmailFromAccount,
      textChange: "Processing...",
      buttonDisabled: true,
    });
    try {
      await httpClient
        .post(`/user/remove-email-from-account`, {
          option,
          email,
          username,
        })
        .then((response) => {
          if (option === "no") {
            toast(response.data.message, {
              type: "success",
            });
            setRemoveEmailFromAccount({
              ...removeEmailFromAccount,
              trigger: "no",
            });
          } else {
            toast(response.data.message, {
              type: "success",
            });
            setRemoveEmailFromAccount({
              ...removeEmailFromAccount,
              trigger: "yes",
            });
          }
        });
    } catch (error) {
      setErrorEffect(true);
      setErrorMessage(error.response.data.message);
      setRemoveEmailFromAccount({
        ...removeEmailFromAccount,
        textChange: "Next",
        buttonDisabled: true,
      });
      setOki(false);
    }
  };

  return (
    <div className="container mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center">
        <div className="w-full">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words
                          ${errorEffect && `animate-wiggle`}`}
            onAnimationEnd={() => setErrorEffect(false)}
          >
            <div className={"px-6 lg:px-28"}>
              <div className="flex items-center justify-between py-4 text-gray-800">
                <div className="flex items-center">
                  <img alt="logo" className="w-12 h-12" src={logo} />
                  <h1 className="ml-2 text-2xl font-bold">Matrix</h1>
                  <h1 className="hidden ml-2 text-2xl font-light md:block">
                    | Account
                  </h1>
                </div>

                {/*  Sign in button*/}
                <button className={`${ACCENT_BUTTON}`} type={"button"}>
                  <Link to={"/auth"}>
                    <h1 className="px-5 py-1">Sign in</h1>
                  </Link>
                </button>
              </div>
              {trigger === "yes" ? (
                <div className="relative mx-auto max-w-screen">
                  <div className="flex flex-col py-1 justify-left">
                    <h6 className="text-xl font-medium text-gray-500">
                      No changes were made
                    </h6>
                    <p className="mt-8 text-sm text-gray-500">
                      {email} is still listed as security info for{" "}
                      {maskUsername(username)}&#39;s account.
                    </p>
                  </div>
                </div>
              ) : trigger === "no" ? (
                <div className="relative mx-auto max-w-screen bg-blue-50 p-8 rounded-lg">
                  <div className="flex flex-col py-1 justify-left">
                    <h6 className="text-xl font-medium text-gray-500">
                      {email} was removed from {maskUsername(username)}&#39;s
                      account
                    </h6>
                    <p className="mt-8 text-sm text-gray-500">
                      You should no longer receive security notifications about{" "}
                      {username}&#39;s account.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-auto mb-24 space-y-6 bg-blue-50 p-8 rounded-lg">
                  <div className="mb-3 text-start">
                    <h6 className="text-xl font-medium text-gray-500">
                      Do you own the Matrix account, {maskUsername(username)}?
                    </h6>
                    <div className="mt-4 text-start">
                      <p className="text-sm text-gray-500">
                        We hide the full username for security reasons.
                      </p>
                    </div>
                  </div>
                  <form
                    className="relative mx-auto max-w-screen"
                    onSubmit={handleRemoveEmailSubmit}
                  >
                    <div className="flex flex-col justify-center mt-6 space-y-6">
                      <li className={`list-none w-full md:w-1/2`}>
                        <input
                          checked={option === "no"}
                          className={`sr-only peer`}
                          id="id1"
                          name="option"
                          onChange={handleOptionsChange}
                          type="radio"
                          value="no"
                        />
                        <label
                          className={`px-5 py-1 pl-4 flex flex-row justify-start outline outline-2 rounded-lg ${
                            errorEffect
                              ? `outline-red-500 placeholder-red-500 text-red-500`
                              : DANGER_RADIO
                          }`}
                          htmlFor="id1"
                        >
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faCircleXmark}
                          />
                          <p>
                            No, remove my email address {email} from{" "}
                            {maskUsername(username)}&#39;s account
                          </p>
                        </label>
                      </li>
                      <li className="w-full list-none md:w-1/2">
                        <input
                          checked={option === "yes"}
                          className="sr-only peer "
                          id="id2"
                          name="option"
                          onChange={handleOptionsChange}
                          type="radio"
                          value="yes"
                        />
                        <label
                          className={`px-5 py-1 pl-4 flex flex-row justify-start outline outline-2 rounded-lg ${
                            errorEffect
                              ? `outline-red-500 placeholder-red-500 text-red-500`
                              : PRIMARY_RADIO
                          }`}
                          htmlFor="id2"
                        >
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faCircleCheck}
                          />
                          <p>
                            Yes, {maskUsername(username)} is my Matrix account
                          </p>
                        </label>
                      </li>
                    </div>
                    {/* Error message */}
                    {errorMessage ? (
                      <div className="mt-2 text-sm font-semibold text-red-500">
                        {errorMessage}
                      </div>
                    ) : null}
                    <div className="mt-6 space-y-6">
                      <div className="flex flex-col justify-center w-1/3 md:w-2/12">
                        <button
                          className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON} ${
                            buttonDisabled &&
                            `opacity-50 cursor-not-allowed pointer-events-none`
                          }`}
                          disabled={buttonDisabled}
                          type="submit"
                        >
                          {oki ? (
                            <LoadingAnimation moreClasses="text-teal-600" />
                          ) : null}
                          {textChange}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
