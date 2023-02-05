import React, {useEffect, useState} from "react";
import BackNavigation from "../../components/navbars/BackNavigation";
import {ACCENT_BUTTON, ICON_PLACE_SELF_CENTER,} from "../../assets/styles/styled-components";
import {Link, NavLink, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignIn} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/android-chrome-192x192.png";
import {maskEmail, MATRIX_RSA_PUBLIC_KEY} from "../../helpers/Helper";
import {AssociatedEmails, SendToEmail, Username, VerifyTFA,} from "../../components/forms/CredentialForms";
import SuccessAnimation from "actually-accessible-react-success-animation";
import httpClient from "../../http/httpClient";
import {importSPKI, jwtVerify} from "jose";
import {toast} from "react-toastify";
import {MailOptions} from "../../components/buttons/buttons";

export default function AuthAdminUnlock() {
  /**
   * @description Gets the token from the url
   */
  const { token } = useParams();

  /**
   * @description State variables for the Unlock form.
   */
  const [toUnlock, setToUnlock] = useState({
    name: "",
    buttonDisabled: true,
    confirm_email: "",
    email: "",
    code: "",
    id1: "",
    id2: "",
    id3: "",
    textChange: "Next",
    textChange2: "",
    username: "",
  });
  const {
    name,
    email,
    confirm_email,
    code,
    id1,
    id2,
    id3,
    textChange,
    textChange2,
    username,
    buttonDisabled,
  } = toUnlock;
  /**
   * @description Handles the Error/Success animation and messages for the reset password form.
   */
  const [oki, setOki] = useState(false);
  const [ok, setOk] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(1);
  const [countDown, setCountDown] = useState(0);

  /**
   * @description Count down function to reset the 2FA code after 30 seconds.
   */
  function countDownFunction() {
    setCountDown(countDown - 1);
  }

  /**
   * @description Handles the change of the input fields
   * @param event
   */
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setToUnlock({ ...toUnlock, [name]: value });
    // reset the error message when the user starts typing and error effect set to false.
    setErrorEffect(false);
    setErrorMessage("");
  };

  /**
   * @description Handles the submit of the form
   * @param event
   * @returns {Promise<void>}
   */
  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setToUnlock({ ...toUnlock, textChange: "Verifying" });

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
            setToUnlock({
              ...toUnlock,
              id1: result.payload.sub,
              id2: result.payload.secondary_email,
              id3: result.payload.recovery_email,
              textChange: "Continue",
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setErrorEffect(true);
            setOki(false);
            setToUnlock({ ...toUnlock, textChange: "Next" });
          });
        setCount(count + 1);
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setOki(false);
        setErrorMessage(error.response.data.message);
        setToUnlock({ ...toUnlock, textChange: "Next" });
      });
  };

  /**
   * @description Handles if there is a chosen email to send the code to.
   * @param event
   */
  const handleVerifyEmailSubmit = (event) => {
    setOki(true);
    event.preventDefault();

    try {
      if (confirm_email !== "") {
        setToUnlock({ ...toUnlock, textChange: "Verify Email" });
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
   * @description Handles the submit of the form to send the code to the email.
   * @param event
   * @returns {Promise<void>}
   */
  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setToUnlock({ ...toUnlock, textChange: "Sending", is_resend: true });
    await httpClient
      .post("/user/send-verification-code", {
        email,
        confirm_email,
      })
      .then((response) => {
        toast(`${response.data.message}`, { type: "info" });
        setToUnlock({
          ...toUnlock,
          textChange: "Continue",
          textChange2: "Resend Code",
        });
        setCountDown(30);
        if (count >= 4) {
          setCount(count);
        } else {
          setCount(count + 1);
        }
        setOki(false);
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setToUnlock({ ...toUnlock, textChange: "Verify Email" });
      });
  };

  /**
   * @description Handles the submit of the form to verify the code and unlock the account.
   * @param event
   * @returns {Promise<void>}
   */
  const handle2FAVerifyFormSubmit = async (event) => {
    event.preventDefault();
    setOki(true);
    setToUnlock({
      ...toUnlock,
      textChange: "Verifying",
    });
    await httpClient
      .post("/user/verify-verification-code-to-unlock", {
        code,
        email,
      })
      .then((response) => {
        toast.success(`${response.data.message}`);
        setToUnlock({
          ...toUnlock,
          textChange: "Success",
        });
        setOk(true);
      })
      .catch((error) => {
        setErrorEffect(true);
        setErrorMessage(error.response.data.message);
        setOki(false);
        setToUnlock({
          ...toUnlock,
          code: "",
          textChange: "Verify",
        });
      });
  };

  /**
   * @description Decodes the token and checks if the token is valid. If the token is not valid, it redirects the user to the login listbox.
   */
  function decodeToken() {
    httpClient
      .get(`/user/verify-unlock-token/${token}`)
      .then((res) => {
        if (res.data.status === "success") {
          setToUnlock({
            ...toUnlock,
            name: res.data.user_data.name,
          });
          toast.success(
            `Please verify your identity, ${res.data.user_data.name}`,
            {
              position: "top-center",
              width: "100%",
            },
          );
        }
      })
      .catch((err) => {
        window.location.href = "/invalid-token";
        toast(`Error: ${err.response.data.message}`, { type: "error" });
      });
  }

  /**
   * @description useEffect to reset the 2FA code after 30 seconds
   */
  useEffect(() => {
    if (count >= 4) {
      if (countDown > 0) {
        setTimeout(countDownFunction, 1000);
        setToUnlock({
          ...toUnlock,
          buttonDisabled: true,
        });
      } else {
        setToUnlock({
          ...toUnlock,
          code: "",
          buttonDisabled: false,
        });
      }
    }
  }, [countDown]);

  /**
   * @description useEffect to monitor the token and verify it.
   */
  useEffect(() => {
    decodeToken();
  }, [token]);

  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words bg-blue-50 border rounded-lg shadow
                          ${errorEffect && `animate-wiggle`}`}
            onAnimationEnd={() => setErrorEffect(false)}
          >
            <BackNavigation backTo={"/auth"} hasText={false} isSmall />
            {ok ? (
              <div className="py-12 bg-blue-50 rounded-lg shadow">
                <SuccessAnimation color="#5cb85c" text="Success!" />
                <div className="px-6 space-y-6 text-center text-gray-500">
                  <p className="text-lg">
                    We&#39;ve sent you an email with a new password. Please
                    check your inbox.
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
                <NavLink to="/">
                  <div className="flex items-center justify-center py-2 text-gray-800">
                    <img alt="logo" className="w-12 h-12 -mt-12" src={logo} />
                  </div>
                </NavLink>
                <div className="flex-auto mb-24 space-y-6 -mt-14">
                  <div className="mb-3 text-start">
                    <h6 className="mt-16 text-lg font-bold text-blue-500 xl:text-2xl">
                      Let&#39;s get you back in
                    </h6>
                  </div>
                  <h1 className="font-medium">
                    {" "}
                    Step {count > 4 ? 4 : count} of 4
                  </h1>
                  <div className="mb-3 text-start">
                    {count === 1 ? (
                      <p className="text-gray-500">
                        Enter your username below {name} to verify your
                        identity.
                      </p>
                    ) : count === 2 ? (
                      <p className="text-gray-500">
                        Choose an email address on which you want to receive the
                        verification code.
                      </p>
                    ) : count === 3 ? (
                      <p className="text-gray-500">
                        Please confirm your email address below. with the email
                        address of <b>{maskEmail(confirm_email)}</b>
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Enter the verification code sent to your email address.
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
                      id2={id2}
                      id3={id3}
                      oki={oki}
                      textChange={textChange}
                    />
                  ) : count === 3 ? (
                    <SendToEmail
                      count={count}
                      email={email}
                      errorEffect={errorEffect}
                      errorMessage={errorMessage}
                      handleEmailSubmit={handleEmailSubmit}
                      handleFormChange={handleFormChange}
                      oki={oki}
                      setCount={setCount}
                      setErrorMessage={setErrorMessage}
                      setToUnlock={setToUnlock}
                      textChange={textChange}
                      toUnlock={toUnlock}
                    />
                  ) : (
                    <VerifyTFA
                      authForm={toUnlock}
                      buttonDisabled={buttonDisabled}
                      code={code}
                      count={count}
                      countDown={countDown}
                      errorEffect={errorEffect}
                      errorMessage={errorMessage}
                      handle2FAFormSubmit={handleEmailSubmit}
                      handle2FAVerifyFormSubmit={handle2FAVerifyFormSubmit}
                      handleAuthFormChange={handleFormChange}
                      oki={oki}
                      setAuthForm={setToUnlock}
                      setCount={setCount}
                      setCountDown={setCountDown}
                      setErrorMessage={setErrorMessage}
                      textChange={textChange}
                      textChange2={textChange2}
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
