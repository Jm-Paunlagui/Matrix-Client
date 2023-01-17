import React, { useState } from "react";
import SuccessAnimation from "actually-accessible-react-success-animation";

import { toast } from "react-toastify";
import logo from "../../../assets/img/android-chrome-192x192.png";
import BackNavigation from "../../../components/navbars/BackNavigation";
import {
  AssociatedEmails,
  SendToEmail,
  Username,
} from "../../../components/forms/CredentialForms";
import { maskEmail, MATRIX_RSA_PUBLIC_KEY } from "../../../helpers/Helper";
import httpClient from "../../../http/httpClient";

import { jwtVerify, importSPKI } from "jose";
import {MailOptions} from "../../../components/buttons/buttons";
import {ACCENT_BUTTON, ICON_PLACE_SELF_CENTER} from "../../../assets/styles/styled-components";
import {faSignIn} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

/**
 * @description Handles the forgot password request listbox
 */

export default function AuthForgotPasswordRequest() {
  /**
   * @description State variables for the forgot password form.
   */
  const [resetForm, setResetForm] = useState({
    confirm_email: "",
    email: "",
    id1: "",
    id3: "",
    textChange: "Next",
    username: "",
  });
  /**
   * @description Handles the Error/Success animation and messages for the forgot password form.
   */

  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * @description Handles the change of the input fields
   * @param event
   */

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setResetForm({ ...resetForm, [name]: value });
    // reset the error message when the user starts typing and error effect set to false.
    setErrorEffect(false);
    setErrorMessage("");
  };
  /**
   * @description For step counter in the forgot password form.
   */

  const [count, setCount] = useState(1);
  /**
   * @description Destructs the state variables
   */

  const { confirm_email, email, id1, id3, textChange, username } =
    resetForm; // Hide email address with mask

  /**
   * @description Handles the form submission and makes a POST request to the backend to check user email.
   * @param event
   * @returns {Promise<void>}
   */

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({ ...resetForm, textChange: "Verifying" });

    await httpClient
      .post("/user/check-email", {
        username,
      })
      .then(async (response) => {
        jwtVerify(
          response.data.emails,
          await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"),
        )
          .then((result) => {
            setResetForm({
              ...resetForm,
              id1: result.payload.sub,
              id3: result.payload.recovery_email,
              textChange: "Continue",
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setErrorEffect(true);
            setOki(false);
            setResetForm({ ...resetForm, textChange: "Next" });
          });
        setCount(count + 1);
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setOki(false);
        setErrorMessage(error.response.data.message);
        setResetForm({ ...resetForm, textChange: "Next" });
      });
  };
  /**
   * @description To make a user choose, which email address to use. If the user has multiple email addresses.
   * @param event
   * @returns {Promise<void>}
   */

  const handleVerifyEmailSubmit = (event) => {
    setOki(true);
    event.preventDefault();

    try {
      if (confirm_email !== "") {
        setResetForm({ ...resetForm, textChange: "Verify Email" });
        setCount(count + 1);
        setOki(false);
      } else {
        setErrorEffect(true);
        setOki(false);
        setErrorMessage("Choose an email");
      }
    } catch (error) {
      setErrorEffect(true);
      setOki(false);
      setErrorMessage(error.response.data.message);
    }
  };

  /**
   * @description Handles the form submission and makes a POST request to the backend to send the email.
   * @param event
   * @returns {Promise<void>}
   */
  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({ ...resetForm, textChange: "Sending" });
    await httpClient
      .post("/user/forgot-password", {
        email,
        confirm_email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "info" });
        setOk(true);
        setResetForm({ ...resetForm, textChange: "Success" });
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setResetForm({ ...resetForm, textChange: "Verify Email" });
      });
  };

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words bg-blue-50 border rounded-lg shadow
                          ${errorEffect && `animate-wiggle`}`}
            onAnimationEnd={() => setErrorEffect(false)}
          >
            <BackNavigation backTo={"/cant-sign-in"} hasText={false} isSmall />
            {ok ? (
              <div className="py-12 bg-blue-50 rounded-lg shadow">
                <SuccessAnimation color="#5cb85c" text="Success!" />
                <div className="px-6 space-y-6 text-center text-gray-500">
                  <p className="text-lg">
                    We&#39;ve sent you an email with a link to reset your
                    password. Please check your inbox.
                  </p>
                  <p className="text-lg">
                    If you don&#39;t see it, check your spam folder.
                  </p>
                  <div className="flex flex-col justify-center mt-6 space-y-4">
                          <MailOptions />
                          <button className={`${ACCENT_BUTTON}`} type={"button"}>
                            <Link to={"/auth"}>
                              <h1 className="px-5 py-1">
                                Done?
                                <FontAwesomeIcon
                                  className={`ml-2 ${ICON_PLACE_SELF_CENTER}`}
                                  icon={faSignIn}
                                />{" "}
                                Sign in
                              </h1>
                            </Link>
                          </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={"px-6 lg:px-28"}>
                <div className="flex items-center justify-center py-2 text-gray-800">
                  <img alt="logo" className="w-12 h-12 -mt-12" src={logo} />
                </div>
                <div className="flex-auto mb-24 space-y-6 -mt-14">
                  <div className="mb-3 text-start">
                    <h6 className="mt-16 text-lg font-bold text-blue-500 xl:text-2xl">
                      Forgot Password?
                    </h6>
                  </div>
                  <h1 className="font-medium"> Step {count} of 3</h1>
                  <div className="mb-3 text-start">
                    {count === 1 ? (
                      <p className="text-gray-500">
                        Enter your username below and proceed to the next step.
                      </p>
                    ) : count === 2 ? (
                      <p className="text-gray-500">
                        Choose an email address to receive the password reset
                        link.
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Please confirm your email address below. with the email
                        address of <b>{maskEmail(confirm_email)}</b>
                      </p>
                    )}
                  </div>
                  {count === 1 ? (
                    <Username
                      count={count}
                      errorEffect={errorEffect}
                      errorMessage={errorMessage}
                      handleFormChange={handleFormChange}
                      handleUsernameSubmit={handleUsernameSubmit}
                      oki={oki}
                      textChange={textChange}
                      username={username}
                    />
                  ) : count === 2 ? (
                    <AssociatedEmails
                      confirm_email={confirm_email}
                      errorEffect={errorEffect}
                      errorMessage={errorMessage}
                      handleFormChange={handleFormChange}
                      handleVerifyEmailSubmit={handleVerifyEmailSubmit}
                      id1={id1}
                      id3={id3}
                      oki={oki}
                      textChange={textChange}
                    />
                  ) : (
                    <SendToEmail
                      count={count}
                      email={email}
                      errorEffect={errorEffect}
                      errorMessage={errorMessage}
                      handleEmailSubmit={handleEmailSubmit}
                      handleFormChange={handleFormChange}
                      oki={oki}
                      resetForm={resetForm}
                      setCount={setCount}
                      setErrorMessage={setErrorMessage}
                      setResetForm={setResetForm}
                      textChange={textChange}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
