import cookie from "js-cookie";
import { importSPKI, jwtVerify } from "jose";
import { MATRIX_RSA_PUBLIC_KEY } from "./Helper";
import { toast } from "react-toastify";

/**
 * @description Sets the cookie for the application
 * @param key
 * @param value
 */
export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      domain: window.location.hostname,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
  }
};

/**
 * @description Removes the cookie for the application
 * @param key
 */
export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      domain: window.location.hostname,
      path: '/',
      sameSite: 'lax',
      expires: 1,
    });
  }
};

/**
 * @description Gets the cookie for the application
 * @param key
 * @returns {boolean|*}
 */
export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
  return false;
};

/**
 * @description Sets the local storage for the application
 * @param key
 * @param value
 */
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * @description Removes the item from local storage
 * @param key
 */
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

/**
 * @description Authenticate user by passing data to cookie and localstorage during signin
 * @param response
 * @param next
 */
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  // setLocalStorage('user', result.payload);
  next();
};

/**
 * @description Checks if the user is authenticated
 * @returns {boolean|any}
 */
export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      }
      return false;
    }
    return false;
  }
  return false;
};

/**
 * @description Signing out the user
 */
export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

/**
 * @description Handles updating the user data in the local storage
 * @param response
 * @param next
 */
export const updateUser = (response, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(response));
  }
  next();
};

/**
 * @description Handles the token verification with the public key for security purposes.
 * @param token
 * @returns {Promise<void>}
 */
export const verifyJWT = async (token) => {
  jwtVerify(token, await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"))
    .then((result) => {
      removeCookie("token");
      setCookie("token", token);
      updateUser(result.payload, () => {
        toast("Profile updated successfully", { type: "success" });
      });
    })
    .catch((error) => {
      toast(`Error: ${error}`, { type: "error" });
      window.location.href = "/invalid-token";
    });
};
