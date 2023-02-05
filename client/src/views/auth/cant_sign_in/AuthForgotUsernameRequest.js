import React, {useEffect, useState} from "react";
import BackNavigation from "../../../components/navbars/BackNavigation";
import logo from "../../../assets/img/android-chrome-192x192.png";
import httpClient from "../../../http/httpClient";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {VerifyTFA} from "../../../components/forms/CredentialForms";
import {ACCENT_BUTTON, ICON_PLACE_SELF_CENTER, TEXT_FIELD,} from "../../../assets/styles/styled-components";
import {LoadingAnimation} from "../../../components/loading/LoadingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight, faSignIn} from "@fortawesome/free-solid-svg-icons";
import SuccessAnimation from "actually-accessible-react-success-animation";
import {MailOptions} from "../../../components/buttons/buttons";

export default function AuthForgotUsernameRequest() {
  const [resetForm, setResetForm] = useState({
    buttonDisabled: false,
    email: "",
    code: "",
    textChange: "Next",
    textChange2: "",
  });

  const { buttonDisabled, email, code, textChange, textChange2 } = resetForm; // Hide email address with mask

  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countDown, setCountDown] = useState(0);
  const [count, setCount] = useState(1);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setResetForm({ ...resetForm, [name]: value });
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
    if (count >= 2) {
      if (countDown > 0) {
        setTimeout(countDownFunction, 1000);
        setResetForm({
          ...resetForm,
          buttonDisabled: true,
        });
      } else {
        setResetForm({
          ...resetForm,
          code: "",
          buttonDisabled: false,
        });
      }
    }
  }, [countDown]);

  /**
   * @description Sends the 2FA code to the users email.
   * @param event
   * @returns {Promise<void>}
   */
  const handle2FAFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setResetForm({ ...resetForm, textChange: "Sending Code..." });
    await httpClient
      .post("/user/checkpoint-2fa-email", {
        email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "success" });
        setCountDown(30);
        if (count >= 2) {
          setCount(count);
        } else {
          setCount(count + 1);
        }
        setResetForm({
          ...resetForm,
          textChange: "Next",
          textChange2: "Resend Code",
        });
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setOki(false);
        toast.error(error.message);
        setErrorMessage(error.response.data.message);
        setResetForm({ ...resetForm, textChange: "Next" });
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
    setResetForm({ ...resetForm, textChange: "Verifying Code..." });
    await httpClient
      .post("/user/verify-2fa-email", {
        code,
        email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "success" });
        setResetForm({ ...resetForm, textChange: "Next" });
        setOki(false);
        setOk(true);
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setResetForm({ ...resetForm, textChange: "Next" });
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
                    We&#39;ve sent you an email with your username. Please check
                    your inbox.
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
                      Forgot Username?
                    </h6>
                  </div>
                  <h1 className="font-medium"> Step {count} of 2</h1>
                  <div className="mb-3 text-start">
                    {count === 1 ? (
                      <p className="text-gray-500">
                        Enter your email below and proceed to the next step.
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Enter the code we sent to your email below and proceed
                        to the next step.
                      </p>
                    )}
                    {count === 1 ? (
                      <form
                        className="relative mx-auto max-w-screen"
                        onSubmit={handle2FAFormSubmit}
                      >
                        <input
                          className={`${TEXT_FIELD} outline outline-2 ${
                            errorEffect
                              ? `outline-red-500 placeholder-red-500 text-red-500`
                              : `text-gray-500 bg-white outline-blue-100`
                          }`}
                          name="email"
                          onChange={handleFormChange}
                          placeholder="Email"
                          type="email"
                          value={email}
                        />
                        {/* Error message */}
                        {errorMessage ? (
                          <div className="mt-2 text-sm font-semibold text-red-500">
                            {errorMessage}
                          </div>
                        ) : null}
                        <div className="flex flex-col justify-center mt-6 space-y-6">
                          <button
                            className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON} ${
                              count === 2 ? "hidden" : ""
                            }`}
                            type="submit"
                          >
                            {oki ? (
                              <LoadingAnimation />
                            ) : (
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faCaretRight}
                              />
                            )}
                            {textChange}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <VerifyTFA
                        authForm={resetForm}
                        buttonDisabled={buttonDisabled}
                        code={code}
                        count={count}
                        countDown={countDown}
                        errorEffect={errorEffect}
                        errorMessage={errorMessage}
                        handle2FAFormSubmit={handle2FAFormSubmit}
                        handle2FAVerifyFormSubmit={handle2FAVerifyFormSubmit}
                        handleAuthFormChange={handleFormChange}
                        oki={oki}
                        setAuthForm={setResetForm}
                        setCount={setCount}
                        setErrorMessage={setErrorMessage}
                        textChange={textChange}
                        textChange2={textChange2}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
