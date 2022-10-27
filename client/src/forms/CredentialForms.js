import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  faCircleCheck,
  faCircleRight,
  faEnvelope,
  faForward,
  faRepeat,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  EMAIL_NOT_SET,
  ICON_PLACE_SELF_CENTER,
  LOADING_ANIMATION,
  PRIMARY_BUTTON,
  PRIMARY_RADIO,
  SECONDARY_BUTTON,
  TEXT_FIELD,
} from "../assets/styles/input-types-styles";
import { maskEmail } from "../helpers/Helper";

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
 * @returns {JSX.Element}
 * @constructor
 */
export function UsernamePassword(
  errorEffect,
  errorMessage,
  handleAuthFormChange,
  handleAuthFormSubmit,
  oki,
  password,
  textChange,
  username,
) {
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handleAuthFormSubmit}
    >
      <input
        className={`${TEXT_FIELD} ${
          errorEffect && `border-red-500 placeholder-red-500 text-red-500`
        }`}
        name="username"
        onChange={handleAuthFormChange}
        placeholder="Username"
        type="username"
        value={username}
      />
      <input
        className={`pr-12 mt-5 ${TEXT_FIELD} ${
          errorEffect && `border-red-500 placeholder-red-500 text-red-500`
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
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
          type="submit"
        >
          {oki ? (
            LOADING_ANIMATION()
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faSignIn}
              size={"lg"}
            />
          )}
          {textChange}
        </button>

        <button className={`${SECONDARY_BUTTON}`} type={"button"}>
          <Link to={"/forgot-password"}>
            <h1 className="px-5 py-1">Forgot Password?</h1>
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
 * @returns {JSX.Element}
 * @constructor
 */
export function TFAbyEmail(
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
) {
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handle2FAFormSubmit}
    >
      {/*  Choice of identity */}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        {id1 ? (
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
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id1"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              <p className="truncate">Email {id1}</p>
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Primary")
        )}
        {id2 ? (
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
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id2"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              <p className="truncate">Email {id2}</p>
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Secondary")
        )}
        {id3 ? (
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
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id3"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              <p className="truncate">Email {id3}</p>
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
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
          type="submit"
        >
          {oki ? LOADING_ANIMATION() : null}
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
 * @returns {JSX.Element}
 * @constructor
 */
export function VerifyTFA(
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
) {
  return (
    <>
      <form className="relative mx-auto mt-6 mb-6 max-w-screen">
        <input
          className={`${TEXT_FIELD} ${
            errorEffect && `border-red-500 placeholder-red-500 text-red-500`
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
              className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
                buttonDisabled &&
                `opacity-50 cursor-not-allowed pointer-events-none`
              }`}
              name="resend"
              onClick={handle2FAFormSubmit}
              type="reset"
            >
              {oki ? (
                LOADING_ANIMATION()
              ) : (
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faRepeat}
                  size={"lg"}
                />
              )}
              {textChange2} {countDown !== 0 ? `(${countDown})` : null}
            </button>
          ) : (
            <button
              className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
              name="submit"
              onClick={handle2FAVerifyFormSubmit}
              type="submit"
            >
              {oki ? (
                LOADING_ANIMATION()
              ) : (
                <FontAwesomeIcon
                  className={`${ICON_PLACE_SELF_CENTER}`}
                  icon={faSignIn}
                  size={"lg"}
                />
              )}
              {textChange}
            </button>
          )}
        </div>
      </form>
      <button
        className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
          count === 1 ? "hidden" : ""
        }`}
        onClick={() => {
          setCount(count - 1);
          setAuthForm({
            ...authForm,
            textChange: "Verify email",
          });
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
 * @description Checking username associated with the email.
 * @param count
 * @param errorEffect
 * @param errorMessage
 * @param handleFormChange
 * @param handleUsernameSubmit
 * @param oki
 * @param textChange
 * @param username
 * @returns {JSX.Element}
 * @constructor
 */
export function Username(
  count,
  errorEffect,
  errorMessage,
  handleFormChange,
  handleUsernameSubmit,
  oki,
  textChange,
  username,
) {
  return (
    <form
      className="relative mx-auto max-w-screen"
      onSubmit={handleUsernameSubmit}
    >
      <input
        className={`${TEXT_FIELD} ${
          errorEffect && `border-red-500 placeholder-red-500 text-red-500`
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
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON} ${
            count === 2 ? "hidden" : ""
          }`}
          type="submit"
        >
          {oki ? (
            LOADING_ANIMATION()
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faCircleRight}
              size={"lg"}
            />
          )}
          {textChange}
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
 * @returns {JSX.Element}
 * @constructor
 */
export function AssociatedEmails(
  confirm_email,
  errorEffect,
  errorMessage,
  handleFormChange,
  handleVerifyEmailSubmit,
  id1,
  id2,
  id3,
  oki,
  textChange,
) {
  return (
    <form
      className="relative mx-auto mt-6 mb-6 max-w-screen"
      onSubmit={handleVerifyEmailSubmit}
    >
      {/*  Choice of identity */}
      <div className="flex flex-col justify-center mt-6 space-y-6">
        {id1 ? (
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
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              }`}
              htmlFor="id1"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              <p className="truncate">Email {maskEmail(id1)}</p>
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Primary")
        )}
        {id2 ? (
          <li className="list-none">
            <input
              checked={confirm_email === id2}
              className="sr-only peer "
              id="id2"
              name="confirm_email"
              onChange={handleFormChange}
              type="radio"
              value={id2}
            />
            <label
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id2"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              <p className="truncate">Email {maskEmail(id2)}</p>
            </label>
          </li>
        ) : (
          EMAIL_NOT_SET("Secondary")
        )}
        {id3 ? (
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
              className={`px-5 py-1 pl-4 flex flex-row justify-start border-2 rounded-lg ${
                errorEffect
                  ? `border-red-500 placeholder-red-500 text-red-500`
                  : PRIMARY_RADIO
              } `}
              htmlFor="id3"
            >
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faEnvelope}
                size={"lg"}
              />
              <p className="truncate">Email {maskEmail(id3)}</p>
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
          className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
          type="submit"
        >
          {oki ? (
            LOADING_ANIMATION()
          ) : (
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faForward}
              size={"lg"}
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
 * @returns {JSX.Element}
 * @constructor
 */
export function SendToEmail(
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
) {
  return (
    <>
      <form
        className="relative mx-auto max-w-screen"
        onSubmit={handleEmailSubmit}
      >
        <input
          className={`${TEXT_FIELD} ${
            errorEffect && `border-red-500 placeholder-red-500 text-red-500`
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
            className={`px-5 py-1 pl-4 flex flex-row justify-center ${PRIMARY_BUTTON}`}
            type="submit"
          >
            {oki ? (
              LOADING_ANIMATION()
            ) : (
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faCircleCheck}
                size={"lg"}
              />
            )}
            {textChange}
          </button>
        </div>
      </form>
      <button
        className={`px-5 py-1 pl-4 w-full ${SECONDARY_BUTTON} ${
          count === 1 ? "hidden" : ""
        }`}
        disabled={count > 3}
        onClick={() => {
          setCount(count - 1);
          setResetForm({ ...resetForm, textChange: "Next" });
          setErrorMessage("");
        }}
        type="button"
      >
        Previous
      </button>
    </>
  );
}
