import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  faCheck,
  faCaretRight,
  faEnvelope,
  faForward,
  faRepeat,
  faSignIn,
  faPenToSquare,
  faCaretLeft,
  faCheckDouble,
  faCircleExclamation,
  faCircleCheck,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  ACCENT_BUTTON,
  DANGER_BUTTON,
  EMAIL_NOT_SET,
  ICON_PLACE_SELF_CENTER,
  MAIN_BUTTON,
  PRIMARY_RADIO,
  TEXT_FIELD,
  WARNING_BUTTON,
} from "../../assets/styles/styled-components";
import { maskEmail, emailRegex } from "../../helpers/Helper";
import PasswordChecklist from "react-password-checklist";
import { LoadingAnimation } from "../loading/LoadingPage";
import PropTypes from "prop-types";

/**
 * @description User login form for the application
 * @param errorEffect
 * @param errorMessage
 * @param handleAuthFormChange
 * @param handleAuthFormSubmit
 * @param oki
 * @param password
 * @param textChange
 * @param username
 * @constructor
 */
export function UsernamePassword({
  errorEffect,
  errorMessage,
  handleAuthFormChange,
  handleAuthFormSubmit,
  oki,
  password,
  textChange,
  username,
}) {
  UsernamePassword.propTypes = {
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handleAuthFormChange: PropTypes.func,
    handleAuthFormSubmit: PropTypes.func,
    oki: PropTypes.bool,
    password: PropTypes.string,
    textChange: PropTypes.string,
    username: PropTypes.string,
  };
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handleAuthFormSubmit}
    >
      <input
        className={`${TEXT_FIELD} outline outline-2 ${
          errorEffect
            ? `outline-red-500 placeholder-red-500 text-red-500`
            : `text-gray-500 bg-white outline-blue-100`
        }`}
        name="username"
        onChange={handleAuthFormChange}
        placeholder="Username"
        type="username"
        value={username}
      />
      <input
        className={`pr-12 mt-5 ${TEXT_FIELD} outline outline-2 ${
          errorEffect
            ? `outline-red-500 placeholder-red-500 text-red-500`
            : `text-gray-500 bg-white outline-blue-100`
        }`}
        name="password"
        onChange={handleAuthFormChange}
        placeholder="Password"
        type="password"
        value={password}
      />

      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}

      <div className="flex flex-col justify-center mt-6 space-y-6">
        <button
          className={`px-5 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
          type="submit"
        >
          {oki ? (
            <LoadingAnimation />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faSignIn}
            />
          )}
          {textChange}
        </button>

        <button className={`${ACCENT_BUTTON}`} type={"button"}>
          <Link to={"/cant-sign-in"}>
            <h1 className="px-5 py-1">Can&#39;t sign in?</h1>
          </Link>
        </button>
      </div>
    </form>
  );
}

/**
 * @description User login form for the application
 * @param email
 * @param errorEffect
 * @param errorMessage
 * @param handle2FAFormSubmit
 * @param handleAuthFormChange
 * @param id1
 * @param id2
 * @param id3
 * @param oki
 * @param textChange
 * @constructor
 */
export function TFAbyEmail({
  email,
  errorEffect,
  errorMessage,
  handle2FAFormSubmit,
  handleAuthFormChange,
  id1,
  id2,
  id3,
  oki,
  textChange,
}) {
  TFAbyEmail.propTypes = {
    email: PropTypes.string,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handle2FAFormSubmit: PropTypes.func,
    handleAuthFormChange: PropTypes.func,
    id1: PropTypes.string,
    id2: PropTypes.string,
    id3: PropTypes.string,
    oki: PropTypes.bool,
    textChange: PropTypes.string,
  };
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handle2FAFormSubmit}
    >
      {/*  Choice of identity */}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        <li className={`list-none`}>
          <input
            checked={email === id1}
            className={`sr-only peer`}
            id="id1"
            name="email"
            onChange={handleAuthFormChange}
            type="radio"
            value={id1}
          />
          <label
            className={`px-5 py-1 pl-4 flex flex-row justify-start outline outline-2 rounded-lg ${
              errorEffect
                ? `outline-red-500 placeholder-red-500 text-red-500`
                : PRIMARY_RADIO
            }`}
            htmlFor="id1"
          >
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faEnvelope}
            />
            Email {id1}
          </label>
        </li>

        {emailRegex.test(id2) ? (
          <li className="list-none">
            <input
              checked={email === id2}
              className="sr-only peer "
              id="id2"
              name="email"
              onChange={handleAuthFormChange}
              type="radio"
              value={id2}
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
                icon={faEnvelope}
              />
              Email {id2}
            </label>
          </li>
        ) : null}
        {emailRegex.test(id3) ? (
          <li className="list-none">
            <input
              checked={email === id3}
              className="sr-only peer "
              id="id3"
              name="email"
              onChange={handleAuthFormChange}
              type="radio"
              value={id3}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start outline outline-2 rounded-lg ${
                errorEffect
                  ? `outline-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id3"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
              />
              Email {id3}
            </label>
          </li>
        ) : null}
      </div>
      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex flex-col justify-between mt-6 space-y-6">
        <button
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON}`}
          type="submit"
        >
          {oki ? (
            <LoadingAnimation />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={textChange === "Continue" ? faForward : faCheck}
            />
          )}
          {textChange}
        </button>
      </div>
    </form>
  );
}

/**
 * @description User login form for the application
 * @param authForm
 * @param buttonDisabled
 * @param code
 * @param count
 * @param countDown
 * @param errorEffect
 * @param errorMessage
 * @param handle2FAFormSubmit
 * @param handle2FAVerifyFormSubmit
 * @param handleAuthFormChange
 * @param oki
 * @param setAuthForm
 * @param setCount
 * @param setErrorMessage
 * @param textChange
 * @param textChange2
 * @param setCountDown
 * @constructor
 */
export function VerifyTFA({
  authForm,
  buttonDisabled,
  code,
  count,
  countDown,
  errorEffect,
  errorMessage,
  handle2FAFormSubmit,
  handle2FAVerifyFormSubmit,
  handleAuthFormChange,
  oki,
  setAuthForm,
  setCount,
  setErrorMessage,
  textChange,
  textChange2,
  setCountDown,
}) {
  VerifyTFA.propTypes = {
    authForm: PropTypes.shape({
      code: PropTypes.string,
    }),
    buttonDisabled: PropTypes.bool,
    code: PropTypes.string,
    count: PropTypes.number,
    countDown: PropTypes.number,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handle2FAFormSubmit: PropTypes.func,
    handle2FAVerifyFormSubmit: PropTypes.func,
    handleAuthFormChange: PropTypes.func,
    oki: PropTypes.bool,
    setAuthForm: PropTypes.func,
    setCount: PropTypes.func,
    setErrorMessage: PropTypes.func,
    textChange: PropTypes.string,
    textChange2: PropTypes.string,
    setCountDown: PropTypes.func,
  };
  return (
    <>
      <form className="relative mx-auto mt-6 mb-6 max-w-screen">
        <input
          className={`${TEXT_FIELD} outline outline-2 ${
            errorEffect
              ? `outline-red-500 placeholder-red-500 text-red-500`
              : `text-gray-500 bg-white outline-blue-100`
          }`}
          name="code"
          onChange={handleAuthFormChange}
          placeholder="2FA Code"
          type="text"
          value={code}
        />
        {/* Error message */}
        {errorMessage ? (
          <div className="mt-2 text-sm font-semibold text-red-500">
            {errorMessage}
          </div>
        ) : null}
        <div className="flex flex-col justify-center mt-6 space-y-6">
          {code.length < 7 || code.length > 7 ? (
            <button
              className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON} ${
                buttonDisabled &&
                `opacity-50 cursor-not-allowed pointer-events-none`
              }`}
              name="resend"
              onClick={function (event) {
                handle2FAFormSubmit(event) && setCountDown(0);
              }}
              type="reset"
            >
              {oki ? (
                <LoadingAnimation />
              ) : (
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faRepeat}
                />
              )}
              {textChange2} {countDown !== 0 ? `(${countDown})` : null}
            </button>
          ) : (
            <button
              className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON}`}
              name="submit"
              onClick={handle2FAVerifyFormSubmit}
              type="submit"
            >
              {oki ? (
                <LoadingAnimation />
              ) : (
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faCheckDouble}
                />
              )}
              {textChange}
            </button>
          )}
        </div>
      </form>
      <button
        className={`px-5 py-1 pl-4 w-full ${ACCENT_BUTTON} ${
          count === 1 ? "hidden" : ""
        }`}
        onClick={() => {
          setCount(count - 1);
          setAuthForm({
            ...authForm,
            code: "",
            textChange: "Verify email",
          });
          setErrorMessage("");
        }}
        type="button"
      >
        <FontAwesomeIcon
          className={`${ICON_PLACE_SELF_CENTER}`}
          icon={faCaretLeft}
        />
        Previous
      </button>
    </>
  );
}

/**
 * @description Checking username associated with the email.
 * @param count
 * @param errorEffect
 * @param errorMessage
 * @param handleFormChange
 * @param handleUsernameSubmit
 * @param oki
 * @param textChange
 * @param username
 * @constructor
 */
export function Username({
  count,
  errorEffect,
  errorMessage,
  handleFormChange,
  handleUsernameSubmit,
  oki,
  textChange,
  username,
}) {
  Username.propTypes = {
    count: PropTypes.number,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handleFormChange: PropTypes.func,
    handleUsernameSubmit: PropTypes.func,
    oki: PropTypes.bool,
    textChange: PropTypes.string,
    username: PropTypes.string,
  };
  return (
    <form
      className="relative mx-auto max-w-screen"
      onSubmit={handleUsernameSubmit}
    >
      <input
        className={`${TEXT_FIELD} outline outline-2 ${
          errorEffect
            ? `outline-red-500 placeholder-red-500 text-red-500`
            : `text-gray-500 bg-white outline-blue-100`
        }`}
        name="username"
        onChange={handleFormChange}
        placeholder="username"
        type="username"
        value={username}
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
        <button className={`${ACCENT_BUTTON}`} type={"button"}>
          <Link to={"/forgot-username"}>
            <h1 className="px-5 py-1">Forgot Username?</h1>
          </Link>
        </button>
      </div>
    </form>
  );
}

/**
 * @description Users associated with the email address will be displayed, and the user will select an email address.
 * @param confirm_email
 * @param errorEffect
 * @param errorMessage
 * @param handleFormChange
 * @param handleVerifyEmailSubmit
 * @param id1
 * @param id2
 * @param id3
 * @param oki
 * @param textChange
 * @constructor
 */
export function AssociatedEmails({
  confirm_email,
  errorEffect,
  errorMessage,
  handleFormChange,
  handleVerifyEmailSubmit,
  id1,
  id3,
  oki,
  textChange,
}) {
  AssociatedEmails.propTypes = {
    confirm_email: PropTypes.string,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handleFormChange: PropTypes.func,
    handleVerifyEmailSubmit: PropTypes.func,
    id1: PropTypes.string,
    id3: PropTypes.string,
    oki: PropTypes.bool,
    textChange: PropTypes.string,
  };
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handleVerifyEmailSubmit}
    >
      {/*  Choice of identity */}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        {emailRegex.test(id1) ? (
          <li className={`list-none`}>
            <input
              checked={confirm_email === id1}
              className={`sr-only peer`}
              id="id1"
              name="confirm_email"
              onChange={handleFormChange}
              type="radio"
              value={id1}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start outline outline-2 rounded-lg ${
                errorEffect
                  ? `outline-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id1"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
              />
              Email {maskEmail(id1)}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Primary")
        )}
        {emailRegex.test(id3) ? (
          <li className="list-none">
            <input
              checked={confirm_email === id3}
              className="sr-only peer "
              id="id3"
              name="confirm_email"
              onChange={handleFormChange}
              type="radio"
              value={id3}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start outline outline-2 rounded-lg ${
                errorEffect
                  ? `outline-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id3"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
              />
              Email {maskEmail(id3)}
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Recovery")
        )}
      </div>
      {/* Error message */}
      {errorMessage ? (
        <div className="mt-2 text-sm font-semibold text-red-500">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex flex-col justify-between mt-6 space-y-6">
        <button
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON}`}
          type="submit"
        >
          {oki ? (
            <LoadingAnimation />
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faForward}
            />
          )}
          {textChange}
        </button>
      </div>
    </form>
  );
}

/**
 * @description Confirmation of the email address selected by the user.
 * @param count
 * @param email
 * @param errorEffect
 * @param errorMessage
 * @param handleEmailSubmit
 * @param handleFormChange
 * @param oki
 * @param resetForm
 * @param setCount
 * @param setErrorMessage
 * @param setResetForm
 * @param textChange
 * @constructor
 */
export function SendToEmail({
  count,
  email,
  errorEffect,
  errorMessage,
  handleEmailSubmit,
  handleFormChange,
  oki,
  resetForm,
  setCount,
  setErrorMessage,
  setResetForm,
  textChange,
}) {
  SendToEmail.propTypes = {
    count: PropTypes.number,
    email: PropTypes.string,
    errorEffect: PropTypes.bool,
    errorMessage: PropTypes.string,
    handleEmailSubmit: PropTypes.func,
    handleFormChange: PropTypes.func,
    oki: PropTypes.bool,
    resetForm: PropTypes.shape({}),
    setCount: PropTypes.func,
    setErrorMessage: PropTypes.func,
    setResetForm: PropTypes.func,
    textChange: PropTypes.string,
  };
  return (
    <>
      <form
        className="relative mx-auto max-w-screen"
        onSubmit={handleEmailSubmit}
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
        <div className="flex flex-col justify-between mt-6 space-y-6">
          <button
            className={`px-5 py-1 pl-4 flex flex-row justify-center ${ACCENT_BUTTON}`}
            type="submit"
          >
            {oki ? (
              <LoadingAnimation />
            ) : (
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCheck}
              />
            )}
            {textChange}
          </button>
        </div>
      </form>
      <button
        className={`px-5 py-1 pl-4 w-full ${ACCENT_BUTTON} ${
          count === 1 ? "hidden" : ""
        }`}
        disabled={count > 3}
        onClick={() => {
          setCount(count - 1);
          setResetForm({ ...resetForm, email: "", textChange: "Next" });
          setErrorMessage("");
        }}
        type="button"
      >
        Previous
      </button>
    </>
  );
}

/**
 * @description Personal information form.
 * @param email
 * @param verified_email
 * @param errorEffectforPersonalInfo
 * @param errorMessageforPersonalInfo
 * @param full_name
 * @param handleChangeForPersonalInfo
 * @param handleUpdatePersonalInfo
 * @param handleVerifyEmail
 * @param okforPersonalInfo
 * @param okforPersonalInfo2
 * @param profile
 * @param setProfile
 * @param showButtonforPersonalInfo
 * @param textChangeforPersonalInfo
 * @param is_editable
 * @param disabledButtonforPersonalInfo
 * @constructor
 */
export function PersonalInformation({
  email,
  verified_email,
  errorEffectforPersonalInfo,
  errorMessageforPersonalInfo,
  full_name,
  handleChangeForPersonalInfo,
  handleUpdatePersonalInfo,
  handleVerifyEmail,
  okforPersonalInfo,
  okforPersonalInfo2,
  profile,
  setProfile,
  showButtonforPersonalInfo,
  textChangeforPersonalInfo,
  is_editable,
    disabledButtonforPersonalInfo
}) {
  PersonalInformation.propTypes = {
    email: PropTypes.string,
    verified_email: PropTypes.string,
    errorEffectforPersonalInfo: PropTypes.bool,
    errorMessageforPersonalInfo: PropTypes.string,
    full_name: PropTypes.string,
    handleChangeForPersonalInfo: PropTypes.func,
    handleUpdatePersonalInfo: PropTypes.func,
    handleVerifyEmail: PropTypes.func,
    okforPersonalInfo: PropTypes.bool,
    okforPersonalInfo2: PropTypes.bool,
    profile: PropTypes.shape({}),
    setProfile: PropTypes.func,
    showButtonforPersonalInfo: PropTypes.bool,
    textChangeforPersonalInfo: PropTypes.string,
    is_editable: PropTypes.bool,
    disabledButtonforPersonalInfo: PropTypes.bool,
  };

  function DiscardChangeEmail() {
    const user = JSON.parse(localStorage.getItem("user"));
    const originalEmail = user.email;
    setProfile((prevState) => ({
      ...prevState,
      email: originalEmail,
      showButtonforPersonalInfo: true,
      errorMessageforPersonalInfo: "",
      disabledButtonforPersonalInfo: false,
    }));
  }

  return (
    <div
      className={`flex flex-col w-full mb-8 p-8 bg-blue-50 rounded-lg shadow
            ${
              errorEffectforPersonalInfo
                ? `animate-wiggle outline outline-2`
                : ""
            }`}
      id="personal-information"
      onAnimationEnd={() =>
        setProfile({ ...profile, errorEffectforPersonalInfo: false })
      }
    >
      <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
        <div className="col-span-2">
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Personal Information
          </h1>
          <p className="mb-4 text-sm text-gray-500">
            This information is private and only visible to you and your
            organization. It will not be shared with anyone else.
          </p>
        </div>
        <div className="col-span-3 md:pl-8">
          <form onSubmit={handleUpdatePersonalInfo}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col w-full space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base font-medium text-gray-500">Email</h1>
                  {verified_email === "Unverified" && email !== "" ? (
                    <div className="flex flex-row justify-between">
                      <button
                        className={`px-2 py-1 flex flex-row justify-center ${WARNING_BUTTON}`}
                        onClick={handleVerifyEmail}
                        type="button"
                      >
                        {okforPersonalInfo2 ? (
                          <LoadingAnimation />
                        ) : (
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faCircleExclamation}
                          />
                        )}
                        {verified_email}
                      </button>
                    </div>
                  ) : verified_email === "Verified" && email !== "" ? (
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row justify-between">
                        <div
                          className={`px-2 py-1 flex flex-row justify-center ${MAIN_BUTTON}`}
                        >
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faCircleCheck}
                          />
                          {verified_email}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <input
                  className={`${TEXT_FIELD} outline outline-2 ${
                    errorEffectforPersonalInfo
                      ? `outline-red-500 placeholder-red-500 text-red-500`
                      : `text-gray-500 bg-white outline-blue-100`
                  }`}
                  name="email"
                  onChange={handleChangeForPersonalInfo("email")}
                  placeholder="Email"
                  type="text"
                  value={email}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <h1 className="text-base font-medium text-gray-500">
                  Full Name
                </h1>
                <input
                  className={`${TEXT_FIELD} outline outline-2 ${
                    errorEffectforPersonalInfo
                      ? `outline-red-500 placeholder-red-500 text-red-500`
                      : `text-gray-500 bg-white outline-blue-100`
                  }`}
                  name="full_name"
                  onChange={handleChangeForPersonalInfo("full_name")}
                  placeholder="Full Name"
                  readOnly={!is_editable}
                  type="text"
                  value={full_name}
                />
              </div>
            </div>
            {/* Error message */}
            {errorMessageforPersonalInfo ? (
              <div className="mt-2 text-sm font-semibold text-red-500">
                {errorMessageforPersonalInfo}
              </div>
            ) : null}
            <div
              className={`flex flex-wrap content-end justify-start w-full gap-2 mt-8
                        ${showButtonforPersonalInfo ? "hidden" : "block"}`}
            >
              <button
                className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                onClick={DiscardChangeEmail}
                type="button"
              >
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faCircleMinus}
                />
                Discard
              </button>
              <button
                className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON} ${
                  disabledButtonforPersonalInfo ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                disabled={disabledButtonforPersonalInfo}
                type="submit"
              >
                {okforPersonalInfo ? (
                  <LoadingAnimation />
                ) : (
                  <FontAwesomeIcon
                    className={`${ICON_PLACE_SELF_CENTER}`}
                    icon={faPenToSquare}
                  />
                )}
                {textChangeforPersonalInfo}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * @description Security Information form.
 * @param errorEffectforSecurityInfo
 * @param errorMessageforSecurityInfo
 * @param handleChangeForSecurityInfo
 * @param handleUpdateSecurityInfo
 * @param okforSecurityInfo
 * @param profile
 * @param recovery_email
 * @param secondary_email
 * @param setProfile
 * @param showButtonforSecurityInfo
 * @param textChangeforSecurityInfo
 * @constructor
 */
export function SecurityInformation({
  errorEffectforSecurityInfo,
  errorMessageforSecurityInfo,
  handleChangeForSecurityInfo,
  handleUpdateSecurityInfo,
  okforSecurityInfo,
  okforSecurityInfo2,
  profile,
  recovery_email,
  verified_recovery_email,
  handleVerifyEmailRecovery,
  setProfile,
  showButtonforSecurityInfo,
  textChangeforSecurityInfo,
    disabledButtonforSecurityInfo,
}) {
  SecurityInformation.propTypes = {
    errorEffectforSecurityInfo: PropTypes.bool,
    errorMessageforSecurityInfo: PropTypes.string,
    handleChangeForSecurityInfo: PropTypes.func,
    handleUpdateSecurityInfo: PropTypes.func,
    okforSecurityInfo: PropTypes.bool,
    okforSecurityInfo2: PropTypes.bool,
    profile: PropTypes.shape({}),
    recovery_email: PropTypes.string,
    verified_recovery_email: PropTypes.string,
    handleVerifyEmailRecovery: PropTypes.func,
    setProfile: PropTypes.func,
    showButtonforSecurityInfo: PropTypes.bool,
    textChangeforSecurityInfo: PropTypes.string,
    disabledButtonforSecurityInfo: PropTypes.bool,
  };

  function DiscardChangeRecovery() {
    const user = JSON.parse(localStorage.getItem("user"));
    const originalRecoveryEmail = user.recovery_email;
    setProfile((prevState) => ({
      ...prevState,
      recovery_email: originalRecoveryEmail,
      showButtonforSecurityInfo: true,
      errorMessageforSecurityInfo: "",
    }));
  }

  return (
    <div
      className={`
                }flex flex-col w-full mb-8 p-8 bg-blue-50 rounded-lg shadow
          ${
            errorEffectforSecurityInfo ? `animate-wiggle outline outline-2` : ""
          }`}
      id="security-information"
      onAnimationEnd={() =>
        setProfile({ ...profile, errorEffectforSecurityInfo: false })
      }
    >
      <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
        <div className="col-span-2">
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Security Information
          </h1>
          <p className="mb-4 text-sm text-gray-500">
            As of now, you can only prove your identity by providing your email
            address. In the future, you will be able to provide other ways to
            prove your identity.
          </p>
        </div>
        <div className="col-span-3 md:pl-8">
          <div className="flex flex-col w-full h-full col-span-3 space-y-4 text-gray-500">
            <form onSubmit={handleUpdateSecurityInfo}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col w-full space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-base font-medium text-gray-500">
                      Recovery Email
                    </h1>
                    {recovery_email ===
                    null ? null : verified_recovery_email === "Unverified" &&
                      recovery_email !== "" ? (
                      <div className="flex flex-row justify-between">
                        <button
                          className={`px-2 py-1 flex flex-row justify-center ${WARNING_BUTTON}`}
                          onClick={handleVerifyEmailRecovery}
                          type="button"
                        >
                          {okforSecurityInfo2 ? (
                            <LoadingAnimation />
                          ) : (
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faCircleExclamation}
                            />
                          )}
                          {verified_recovery_email}
                        </button>
                      </div>
                    ) : verified_recovery_email === "Verified" &&
                      recovery_email !== "" ? (
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-between">
                          <div
                            className={`px-2 py-1 flex flex-row justify-center ${MAIN_BUTTON}`}
                          >
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faCircleCheck}
                            />
                            {verified_recovery_email}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <input
                    className={`${TEXT_FIELD} outline outline-2 ${
                      errorEffectforSecurityInfo
                        ? `outline-red-500 placeholder-red-500 text-red-500`
                        : `text-gray-500 bg-white outline-blue-100`
                    }`}
                    name="recovery_email"
                    onChange={handleChangeForSecurityInfo("recovery_email")}
                    placeholder="Recovery Email"
                    type="email"
                    value={recovery_email === null ? "" : recovery_email}
                  />
                </div>
              </div>
              {/* Error message */}
              {errorMessageforSecurityInfo ? (
                <div className="mt-2 text-sm font-semibold text-red-500">
                  {errorMessageforSecurityInfo}
                </div>
              ) : null}
              <div
                className={`flex flex-wrap content-end justify-start w-full gap-2 mt-8
                          ${showButtonforSecurityInfo ? "hidden" : "block"}`}
              >
                <button
                  className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                  onClick={DiscardChangeRecovery}
                  type="button"
                >
                  <FontAwesomeIcon
                    className={`${ICON_PLACE_SELF_CENTER}`}
                    icon={faCircleMinus}
                  />
                  Discard
                </button>
                <button
                  className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON} ${
                    disabledButtonforSecurityInfo ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                  }`}
                  disabled={disabledButtonforSecurityInfo}
                  type="submit"
                >
                  {okforSecurityInfo ? (
                    <LoadingAnimation />
                  ) : (
                    <FontAwesomeIcon
                      className={`${ICON_PLACE_SELF_CENTER}`}
                      icon={faPenToSquare}
                    />
                  )}
                  {textChangeforSecurityInfo}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @description Sign In Information form.
 * @param confirm_password
 * @param disabledButtonforUsername
 * @param errorEffectforPassword
 * @param errorEffectforUsername
 * @param errorMessageforPassword
 * @param errorMessageforUsername
 * @param handleChangeForPassword
 * @param handleChangeForUsername
 * @param handleUpdatePassword
 * @param handleUpdateUsername
 * @param new_password
 * @param okforPassword
 * @param okforUsername
 * @param old_password
 * @param profile
 * @param setProfile
 * @param showButtonforPassword
 * @param showButtonforUsername
 * @param template
 * @param textChangeforPassword
 * @param textChangeforUsername
 * @param username
 * @constructor
 */
export function SignInInformation({
  confirm_password,
    disabledButtonforUsername,
  errorEffectforPassword,
  errorEffectforUsername,
  errorMessageforPassword,
  errorMessageforUsername,
  handleChangeForPassword,
  handleChangeForUsername,
  handleUpdatePassword,
  handleUpdateUsername,
  new_password,
  okforPassword,
  okforUsername,
  old_password,
  profile,
  setProfile,
  showButtonforPassword,
  showButtonforUsername,
  template,
  textChangeforPassword,
  textChangeforUsername,
  username,
}) {
  SignInInformation.propTypes = {
    confirm_password: PropTypes.string,
    disabledButtonforUsername: PropTypes.bool,
    errorEffectforPassword: PropTypes.bool,
    errorEffectforUsername: PropTypes.bool,
    errorMessageforPassword: PropTypes.string,
    errorMessageforUsername: PropTypes.string,
    handleChangeForPassword: PropTypes.func,
    handleChangeForUsername: PropTypes.func,
    handleUpdatePassword: PropTypes.func,
    handleUpdateUsername: PropTypes.func,
    new_password: PropTypes.string,
    okforPassword: PropTypes.bool,
    okforUsername: PropTypes.bool,
    old_password: PropTypes.string,
    profile: PropTypes.shape({}),
    setProfile: PropTypes.func,
    showButtonforPassword: PropTypes.bool,
    showButtonforUsername: PropTypes.bool,
    template: PropTypes.bool,
    textChangeforPassword: PropTypes.string,
    textChangeforUsername: PropTypes.string,
    username: PropTypes.string,
  };

  function DiscardChangePassword() {
    setProfile((prevState) => ({
      ...prevState,
      template: true,
      old_password: "",
      new_password: "",
      confirm_password: "",
      showButtonforPassword: true,
      errorMessageforPassword: "",
    }));
  }

  function DiscardChangeUsername() {
    const user = JSON.parse(localStorage.getItem("user"));
    const originalUsername = user.username;
    setProfile((prevState) => ({
      ...prevState,
      username: originalUsername,
      showButtonforUsername: true,
      errorMessageforUsername: "",
    }));
  }

  return (
    <div
      className={`flex flex-col w-full p-8 bg-blue-50 rounded-lg shadow space-y-4
          ${
            errorEffectforUsername || errorEffectforPassword
              ? `animate-wiggle outline outline-2`
              : ""
          }`}
      id="sign-in-information"
      onAnimationEnd={() =>
        setProfile({
          ...profile,
          errorEffectforUsername: false,
          errorEffectforPassword: false,
        })
      }
    >
      <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
        <div className="col-span-2">
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Matrix Account Sign-In
          </h1>
          <p className="mb-4 text-sm text-gray-500">
            We recommend that you periodically update your password to keep your
            account secure and prevent unauthorized access to your account.
          </p>
        </div>
        <div className="col-span-3 md:pl-8">
          <div className="flex flex-col w-full h-full col-span-3 pb-8 space-y-4">
            <form onSubmit={handleUpdateUsername}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-base font-medium text-gray-500">
                    Username
                  </h1>
                  <input
                    className={`${TEXT_FIELD} outline outline-2 ${
                      errorEffectforUsername
                        ? `outline-red-500 placeholder-red-500 text-red-500`
                        : `text-gray-500 bg-white outline-blue-100`
                    }`}
                    name="username"
                    onChange={handleChangeForUsername("username")}
                    placeholder="Username"
                    type="text"
                    value={username}
                  />
                </div>
              </div>
              {/* Error message */}
              {errorMessageforUsername ? (
                <div className="mt-2 text-sm font-semibold text-red-500">
                  {errorMessageforUsername}
                </div>
              ) : null}
              <div
                className={`flex flex-wrap content-end justify-start w-full gap-2 mt-8
                          ${showButtonforUsername ? "hidden" : "block"}`}
              >
                <button
                  className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                  onClick={DiscardChangeUsername}
                  type="button"
                >
                  <FontAwesomeIcon
                    className={`${ICON_PLACE_SELF_CENTER}`}
                    icon={faCircleMinus}
                  />
                  Discard
                </button>
                <button
                  className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON} ${
                    disabledButtonforUsername ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                  }`}
                  type="submit"
                >
                  {okforUsername ? (
                    <LoadingAnimation />
                  ) : (
                    <FontAwesomeIcon
                      className={`${ICON_PLACE_SELF_CENTER}`}
                      icon={faPenToSquare}
                    />
                  )}
                  {textChangeforUsername}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid flex-col w-full h-full grid-cols-1 rounded md:grid-cols-5">
        <div className="col-span-2">
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Change Password
          </h1>
          <p className="mb-4 text-sm text-gray-500">
            Please follow the password requirements below to ensure your account
            is secure. (Shows password requirements when you fill the form)
          </p>
        </div>
        <div className="col-span-3 md:pl-8">
          <div className="flex flex-col w-full h-full col-span-3 pb-8 space-y-4">
            <form onSubmit={handleUpdatePassword}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-base font-medium text-gray-500">
                    Current Password
                  </h1>
                  <input
                    className={`${TEXT_FIELD} outline outline-2 ${
                      errorEffectforPassword
                        ? `outline-red-500 placeholder-red-500 text-red-500`
                        : `text-gray-500 bg-white outline-blue-100`
                    }`}
                    name="old_password"
                    onChange={handleChangeForPassword("old_password")}
                    placeholder="Current Password"
                    type="password"
                    value={old_password}
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-base font-medium text-gray-500">
                    New Password
                  </h1>
                  <input
                    className={`${TEXT_FIELD} outline outline-2 ${
                      errorEffectforPassword
                        ? `outline-red-500 placeholder-red-500 text-red-500`
                        : `text-gray-500 bg-white outline-blue-100`
                    }`}
                    name="new_password"
                    onChange={handleChangeForPassword("new_password")}
                    placeholder="New Password"
                    type="password"
                    value={new_password}
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-base font-medium text-gray-500">
                    Confirm New Password
                  </h1>
                  <input
                    className={`${TEXT_FIELD} outline outline-2 ${
                      errorEffectforPassword
                        ? `outline-red-500 placeholder-red-500 text-red-500`
                        : `text-gray-500 bg-white outline-blue-100`
                    }`}
                    name="confirm_password"
                    onChange={handleChangeForPassword("confirm_password")}
                    placeholder="Confirm New Password"
                    type="password"
                    value={confirm_password}
                  />
                </div>
              </div>
              {/* Error message */}
              {errorMessageforPassword ? (
                <div className="mt-2 text-sm font-semibold text-red-500">
                  {errorMessageforPassword}
                </div>
              ) : null}
              <div
                className={`mt-6 space-y-6 ${template ? "hidden" : "block"}`}
              >
                <PasswordChecklist
                  className="text-sm text-gray-500"
                  iconSize={8}
                  minLength={8}
                  onChange={(isValid) => {
                    setProfile({
                      ...profile,
                      showButtonforPassword: !isValid,
                    });
                  }}
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "match",
                  ]}
                  value={new_password}
                  valueAgain={confirm_password}
                />
                <div
                  className={`flex flex-wrap content-end justify-start w-full gap-2`}
                >
                  <button
                    className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON}`}
                    onClick={DiscardChangePassword}
                    type="button"
                  >
                    <FontAwesomeIcon
                      className={`${ICON_PLACE_SELF_CENTER}`}
                      icon={faCircleMinus}
                    />
                    Discard
                  </button>
                  <button className={`${ACCENT_BUTTON}`} type={"button"}>
                    <Link to={"/forgot-password"}>
                      <h1 className="px-5 py-1">Forgot password?</h1>
                    </Link>
                  </button>
                  <button
                    className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON} ${
                      showButtonforPassword ? "hidden" : "block"
                    }`}
                    type="submit"
                  >
                    {okforPassword ? (
                      <LoadingAnimation />
                    ) : (
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faPenToSquare}
                      />
                    )}
                    {textChangeforPassword}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
