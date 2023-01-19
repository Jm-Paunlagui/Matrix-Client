import React, { useEffect, useState } from "react";
import logo from "../../assets/img/android-chrome-192x192.png";
import { ACCENT_BUTTON } from "../../assets/styles/styled-components";
import { Link, useParams } from "react-router-dom";

import { LoadingAnimation } from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";
import { toast } from "react-toastify";
import { verifyJWT } from "../../helpers/Auth";

export default function AuthVerifyEmail() {
  /**
   * @description Gets the token from the url
   */
  const { token } = useParams();

  const [oki, setOki] = useState(true);
  const [errorEffect, setErrorEffect] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  function decodeToken() {
    httpClient
      .get(`/user/verify-email/${token}`)
      .then(async (res) => {
        setOki(false);
        toast.success(res.data.message);
        await verifyJWT(res.data.token)
          .then(() => {
            toast.info("Please reload the page");
          })
          .catch((err) => {
            toast.error(err.message);
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
                    | Verify Email
                  </h1>
                </div>
                {/*  Sign in button*/}
                <button className={`${ACCENT_BUTTON}`} type={"button"}>
                  <Link to={"/auth"}>
                    <h1 className="px-5 py-1">Sign in</h1>
                  </Link>
                </button>
              </div>
              <div className="flex-auto mb-24 space-y-6 bg-blue-50 p-8 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  {errorMessage ? (
                    <div className="mt-2 text-lg font-semibold text-red-500">
                      {errorMessage}
                    </div>
                  ) : oki ? (
                    <div
                      className={`px-5 py-1 pl-4 flex flex-row justify-center text-teal-600 font-semibold tracking-wide text-lg`}
                    >
                      <LoadingAnimation moreClasses="text-teal-600" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-2xl font-bold text-gray-800">
                        Email verified!
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
