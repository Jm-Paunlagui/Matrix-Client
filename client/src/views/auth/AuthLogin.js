import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../../assets/img/android-chrome-192x192.png";
import { ICON_PLACE_SELF_CENTER } from "../../assets/styles/styled-components";
import BackNavigation from "../../components/navbars/BackNavigation";
import httpClient from "../../http/httpClient";
import { toast } from "react-toastify";
import {
  TFAbyEmail,
  UsernamePassword,
  VerifyTFA,
} from "../../components/forms/CredentialForms";
import { importSPKI, jwtVerify } from "jose";
import { MATRIX_RSA_PUBLIC_KEY } from "../../helpers/Helper";
import { authenticate, isAuth, setLocalStorage } from "../../helpers/Auth";

/**
 * @description User login form for the application
 */
export default function AuthLogin() {
  /**
   * @description State variables for the login form.
   * @param {string} email - Email of the user.
   * @param {string} password - Password of the user.
   */
  const [authForm, setAuthForm] = useState({
    buttonDisabled: true,
    code: "",
    email: "",
    id1: "",
    id2: "",
    id3: "",
    password: "",
    textChange: "Sign In",
    textChange2: "",
    username: "",
  });

  const navigate = useNavigate();

  /**
   * @description Destructs the state variables
   */
  const {
    buttonDisabled,
    code,
    email,
    id1,
    id2,
    id3,
    password,
    textChange,
    textChange2,
    username,
  } = authForm;

  /**
   * @description Handles the Error/Success animation and messages for the login form.
   */
  const [oki, setOki] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countDown, setCountDown] = useState(0);

  /**
   * @description For step counter in the forgot password form.
   */
  const [count, setCount] = useState(1);

  /**
   * @description Handles the change of the input fields in the login form.
   * @param event
   */
  const handleAuthFormChange = (event) => {
    const { name, value } = event.target;
    setAuthForm({
      ...authForm,
      [name]: value,
    });
    // reset the error message when the user starts typing and error effect set to false.
    setErrorEffect(false);
    setErrorMessage("");
  };

  /**
   * @description Count down function to reset the 2FA code after 30 seconds.
   */
  function countDownFunction() {
    setCountDown(countDown - 1);
  }

  /**
   * @description useEffect to reset the 2FA code after 30 seconds
   */
  useEffect(() => {
    if (count >= 3) {
      if (countDown > 0) {
        setTimeout(countDownFunction, 1000);
        setAuthForm({
          ...authForm,
          buttonDisabled: true,
        });
      } else {
        setAuthForm({
          ...authForm,
          code: "",
          buttonDisabled: false,
        });
      }
    }
  }, [countDown]);

  /**
   * @description Handles the auth form submission and makes a POST request to the backend.
   * @param event
   */
  const handleAuthFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Signing In",
    });
    await httpClient
      .post("/user/authenticate", {
        username,
        password,
      })
      .then(async (response) => {
        if (response.data.status === "success") {
          jwtVerify(
            response.data.emails,
            await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"),
          )
            .then((result) => {
              setAuthForm({
                ...authForm,
                id1: result.payload.id1,
                id2: result.payload.id2,
                id3: result.payload.id3,
                textChange: "Continue",
              });
              setErrorMessage("");
              setCount(count + 1);
              setOki(false);
            })
            .catch((error) => {
              setErrorMessage(error.message);
              setErrorEffect(true);
              setOki(false);
              setAuthForm({ ...authForm, textChange: "Sign In" });
            });
        } else {
          setErrorMessage(response.data.message);
          setErrorEffect(true);
          setOki(false);
          setAuthForm({ ...authForm, textChange: "Sign In" });
        }
      })
      .catch((error) => {
        setErrorEffect(true);
        setOki(false);
        toast.error(error.message);
        setErrorMessage(error.response.data.message);
        setAuthForm({
          ...authForm,
          textChange: "Sign In",
        });
      });
  };

  /**
   * @description Sends the 2FA code to the users email.
   * @param event
   * @returns {Promise<void>}
   */
  const handle2FAFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Sending Code",
    });
    await httpClient
      .post("/user/checkpoint-2fa", {
        email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "success" });
        setCountDown(30);
        if (count >= 3) {
          setCount(count);
        } else {
          setCount(count + 1);
        }
        setAuthForm({
          ...authForm,
          textChange: "Verify code",
          textChange2: "Resend code",
        });
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setOki(false);
        toast.error(error.message);
        setErrorMessage(error.response.data.message);
        setAuthForm({
          ...authForm,
          textChange: "Verify",
        });
      });
  };

  /**
   * @description Verifies the 2FA code and makes a POST request to the backend.
   * @param event
   * @returns {Promise<void>}
   */
  const handle2FAVerifyFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setAuthForm({
      ...authForm,
      textChange: "Verifying",
    });
    await httpClient
      .post("/user/verify-2fa", {
        code,
        username,
      })
      .then(async (response) => {
        console.log(response);
        jwtVerify(
          response.data.token,
          await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"),
        )
          .then((result) => {
            console.log(result);
            setLocalStorage("user", result.payload);
            console.log(result.payload);
            authenticate(response, () => {
              console.log(response);
              toast(`Welcome back ${username}!`, {
                type: "success",
                bodyClassName: "toastify-body",
              });
              setAuthForm({
                ...authForm,
                textChange: "Success",
              });
              isAuth().role === "admin"
                ? navigate("/admin/dashboard/sentiment-analysis")
                : navigate("/user/dashboard/sentiment-analysis");
            });
          })
          .catch((error) => {
            toast(`Error: ${error}`, { type: "error" });
            // navigate("/invalid-token");
          });
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setAuthForm({
          ...authForm,
          code: "",
          textChange: "Verify",
        });
      });
  };

  return isAuth().path ? (
    window.location.replace(isAuth().path)
  ) : (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words bg-blue-50 border rounded-lg shadow 
                ${errorEffect && `animate-wiggle`}`}
            onAnimationEnd={() => setErrorEffect(false)}
          >
            <BackNavigation backTo={"/"} hasText={false} isSmall />
            <div className={"px-6 lg:px-28"}>
              <NavLink to="/">
                <div className="flex items-center justify-center py-2 text-gray-800">
                  <img alt="logo" className="w-12 h-12 -mt-12" src={logo} />
                </div>
              </NavLink>
              <div className="flex-auto pt-0 mb-24 -mt-14">
                <h6 className="mt-16 text-lg font-bold text-blue-500 xl:text-2xl">
                  {count === 1
                    ? "Sign in to MATRIX LAB"
                    : count === 2
                    ? "Verify your identity"
                    : "Two-factor authentication"}
                </h6>
                <div className="mt-4 text-start">
                  {count === 1 ? null : count === 2 ? (
                    <p className="text-gray-500">{authForm.username}</p>
                  ) : (
                    <p className="text-gray-500">
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faEnvelope}
                      />
                      We emailed a code to {email}. Please enter the code to
                      sign in.
                    </p>
                  )}
                </div>
                {count === 1 ? (
                  <UsernamePassword
                    errorEffect={errorEffect}
                    errorMessage={errorMessage}
                    handleAuthFormChange={handleAuthFormChange}
                    handleAuthFormSubmit={handleAuthFormSubmit}
                    oki={oki}
                    password={password}
                    textChange={textChange}
                    username={username}
                  />
                ) : count === 2 ? (
                  <TFAbyEmail
                    email={email}
                    errorEffect={errorEffect}
                    errorMessage={errorMessage}
                    handle2FAFormSubmit={handle2FAFormSubmit}
                    handleAuthFormChange={handleAuthFormChange}
                    id1={id1}
                    id2={id2}
                    id3={id3}
                    oki={oki}
                    textChange={textChange}
                  />
                ) : (
                  <VerifyTFA
                    authForm={authForm}
                    buttonDisabled={buttonDisabled}
                    code={code}
                    count={count}
                    countDown={countDown}
                    errorEffect={errorEffect}
                    errorMessage={errorMessage}
                    handle2FAFormSubmit={handle2FAFormSubmit}
                    handle2FAVerifyFormSubmit={handle2FAVerifyFormSubmit}
                    handleAuthFormChange={handleAuthFormChange}
                    oki={oki}
                    setAuthForm={setAuthForm}
                    setCount={setCount}
                    setErrorMessage={setErrorMessage}
                    textChange={textChange}
                    textChange2={textChange2}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
