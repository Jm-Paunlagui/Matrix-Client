import { importSPKI, jwtVerify } from "jose";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCookie,
  removeCookie,
  setCookie,
  updateUser,
} from "../../helpers/Auth";
import { MATRIX_RSA_PUBLIC_KEY } from "../../helpers/Helper";
import httpClient from "../../http/httpClient";
import {
  PersonalInformation,
  SecurityInformation,
  SignInInformation,
} from "../../forms/CredentialForms";
import { Header } from "../../components/headers/Header";
import { LoadingAnimation } from "../../components/loading/LoadingPage";

/**
 * @description Handles the admin profile
 */
export default function AdminProfile() {
  /**
   * @description State variables for the admin profile form.
   */
  const [profile, setProfile] = useState({
    email: "",
    full_name: "",
    okforPersonalInfo: false,
    errorEffectforPersonalInfo: false,
    errorMessageforPersonalInfo: "",
    showButtonforPersonalInfo: true,
    textChangeforPersonalInfo: "Update",
    secondary_email: "",
    recovery_email: "",
    okforSecurityInfo: false,
    errorEffectforSecurityInfo: false,
    errorMessageforSecurityInfo: "",
    showButtonforSecurityInfo: true,
    textChangeforSecurityInfo: "Update",
    username: "",
    okforUsername: false,
    errorEffectforUsername: false,
    errorMessageforUsername: "",
    showButtonforUsername: true,
    textChangeforUsername: "Update",
    old_password: "",
    new_password: "",
    confirm_password: "",
    okforPassword: false,
    errorEffectforPassword: false,
    errorMessageforPassword: "",
    showButtonforPassword: true,
    textChangeforPassword: "Update",
    template: true,
    role: "",
  });
  /**
   * @description Deconstructs the state variables for the admin profile form.
   */
  const {
    email,
    full_name,
    okforPersonalInfo,
    errorEffectforPersonalInfo,
    errorMessageforPersonalInfo,
    showButtonforPersonalInfo,
    textChangeforPersonalInfo,
    secondary_email,
    recovery_email,
    okforSecurityInfo,
    errorEffectforSecurityInfo,
    errorMessageforSecurityInfo,
    showButtonforSecurityInfo,
    textChangeforSecurityInfo,
    username,
    okforUsername,
    errorEffectforUsername,
    errorMessageforUsername,
    showButtonforUsername,
    textChangeforUsername,
    old_password,
    new_password,
    confirm_password,
    okforPassword,
    errorEffectforPassword,
    errorMessageforPassword,
    showButtonforPassword,
    textChangeforPassword,
    template,
    role,
  } = profile;

  /**
   * @description Handles the Profile form change
   */
  const loadProfile = () => {
    const token = getCookie("token");
    httpClient
      .get("/user/get_user", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setProfile({
          ...profile,
          email: response.data.user.email,
          full_name: response.data.user.full_name,
          secondary_email: response.data.user.secondary_email,
          recovery_email: response.data.user.recovery_email,
          username: response.data.user.username,
          role: response.data.user.role,
        });
      })
      .catch((error) => {
        window.location.href = "/unauthorized-access";
        toast(`Error: ${error.message}`, { type: "error" });
      });
  };

  /**
   * @description UseEffect hook to load the profile form on page load.
   */
  useEffect(() => {
    loadProfile();
  }, []);

  /**
   * @description Handles the Personal Information form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForPersonalInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPersonalInfo: false,
      errorMessageforPersonalInfo: "",
      showButtonforPersonalInfo: false,
    });
  };

  /**
   * @description Handles the Security Information form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForSecurityInfo = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforSecurityInfo: false,
      errorMessageforSecurityInfo: "",
      showButtonforSecurityInfo: false,
    });
  };

  /**
   * @description Handles the Username form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForUsername = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforUsername: false,
      errorMessageforUsername: "",
      showButtonforUsername: false,
    });
  };

  /**
   * @description Handles the Password form change
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleChangeForPassword = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value,
      errorEffectforPassword: false,
      errorMessageforPassword: "",
      template: false,
    });
  };

  /**
   * @description Handles the token verification with the public key for security purposes.
   * @param token
   * @returns {Promise<void>}
   */
  const verifyJWT = async (token) => {
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

  /**
   * @description Handles the Personal Information form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdatePersonalInfo = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforPersonalInfo: true,
      textChangeforPersonalInfo: "Updating...",
    });
    await httpClient
      .put("/user/update-personal-info", {
        email,
        full_name,
      })
      .then(async (response) => {
        await verifyJWT(response.data.token)
          .then(() => {
            setProfile({
              ...profile,
              okforPersonalInfo: false,
              showButtonforPersonalInfo: true,
              textChangeforPersonalInfo: "Update",
            });
          })
          .catch((error) => {
            setProfile({
              ...profile,
              errorEffectforPersonalInfo: true,
              errorMessageforPersonalInfo: error.message,
              okforPersonalInfo: false,
              textChangeforPersonalInfo: "Update",
            });
          });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforPersonalInfo: true,
          errorMessageforPersonalInfo: error.response.data.message,
          okforPersonalInfo: false,
          textChangeforPersonalInfo: "Update",
        });
      });
  };

  /**
   * @description Handles the Security Information form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdateSecurityInfo = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforSecurityInfo: true,
      textChangeforSecurityInfo: "Updating...",
    });
    await httpClient
      .put("/user/update-security-info", {
        secondary_email,
        recovery_email,
      })
      .then(async (response) => {
        await verifyJWT(response.data.token)
          .then(() => {
            setProfile({
              ...profile,
              okforSecurityInfo: false,
              showButtonforSecurityInfo: true,
              textChangeforSecurityInfo: "Update",
            });
          })
          .catch((error) => {
            setProfile({
              ...profile,
              errorEffectforSecurityInfo: true,
              errorMessageforSecurityInfo: error.message,
              okforSecurityInfo: false,
              textChangeforSecurityInfo: "Update",
            });
          });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforSecurityInfo: true,
          errorMessageforSecurityInfo: error.response.data.message,
          okforSecurityInfo: false,
          textChangeforSecurityInfo: "Update",
        });
      });
  };

  /**
   * @description Handles the Username form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdateUsername = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforUsername: true,
      textChangeforUsername: "Updating...",
    });
    await httpClient
      .put("/user/update-username", {
        username,
      })
      .then(async (response) => {
        await verifyJWT(response.data.token)
          .then(() => {
            setProfile({
              ...profile,
              okforUsername: false,
              showButtonforUsername: true,
              textChangeforUsername: "Update",
            });
          })
          .catch((error) => {
            setProfile({
              ...profile,
              errorEffectforUsername: true,
              errorMessageforUsername: error.message,
              okforUsername: false,
              textChangeforUsername: "Update",
            });
          });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforUsername: true,
          errorMessageforUsername: error.response.data.message,
          okforUsername: false,
          textChangeforUsername: "Update",
        });
      });
  };

  /**
   * @description Handles the Password form submission
   * @param event
   * @returns {Promise<void>}
   */
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setProfile({
      ...profile,
      okforPassword: true,
      textChangeforPassword: "Updating...",
    });
    await httpClient
      .put("/user/update-password", {
        old_password,
        new_password,
        confirm_password,
      })
      .then((response) => {
        setProfile({
          ...profile,
          old_password: "",
          new_password: "",
          confirm_password: "",
          okforPassword: false,
          textChangeforPassword: "Update",
        });
        toast(response.data.message, { type: "success" });
      })
      .catch((error) => {
        setProfile({
          ...profile,
          errorEffectforPassword: true,
          errorMessageforPassword: error.response.data.message,
          okforPassword: false,
          textChangeforPassword: "Update",
        });
      });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <Header
        body={
          "Update your personal information, security information, username, and password."
        }
        title={username ? username : <LoadingAnimation />}
      />
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="col-span-1 p-8 rounded-lg bg-blue-50 shadow">
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Account Management
          </h1>
          <p className="mb-4 text-sm text-gray-500 font-medium">
            This account is an {role} account. This account has the highest
            privileges in the system. This account can create, edit, and delete
            other accounts.
          </p>
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Password Requirements
          </h1>
          <p className="mb-4 text-sm text-gray-500 font-medium">
            Your password must be{" "}
            <b className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-teal-500 to-indigo-500">
              at least 8 characters long and contain at least one uppercase
              letter, one lowercase letter, one number, and one special
              character.
            </b>{" "}
            We recommend using a password manager to generate a strong password.
          </p>
          <h1 className="mb-4 text-xl font-bold text-blue-500">
            Two-Factor Authentication (2FA) Security
          </h1>
          <p className="mb-4 text-sm text-gray-500 font-medium">
            By default, we enable two-factor authentication (2FA) for all users
            to ensure that your account is secure and protected.
          </p>
        </div>
        <div className="col-span-2">
          {
            <PersonalInformation
              email={email}
              errorEffectforPersonalInfo={errorEffectforPersonalInfo}
              errorMessageforPersonalInfo={errorMessageforPersonalInfo}
              full_name={full_name}
              handleChangeForPersonalInfo={handleChangeForPersonalInfo}
              handleUpdatePersonalInfo={handleUpdatePersonalInfo}
              is_editable
              okforPersonalInfo={okforPersonalInfo}
              profile={profile}
              setProfile={setProfile}
              showButtonforPersonalInfo={showButtonforPersonalInfo}
              textChangeforPersonalInfo={textChangeforPersonalInfo}
            />
          }
          {
            <SecurityInformation
              errorEffectforSecurityInfo={errorEffectforSecurityInfo}
              errorMessageforSecurityInfo={errorMessageforSecurityInfo}
              handleChangeForSecurityInfo={handleChangeForSecurityInfo}
              handleUpdateSecurityInfo={handleUpdateSecurityInfo}
              okforSecurityInfo={okforSecurityInfo}
              profile={profile}
              recovery_email={recovery_email}
              secondary_email={secondary_email}
              setProfile={setProfile}
              showButtonforSecurityInfo={showButtonforSecurityInfo}
              textChangeforSecurityInfo={textChangeforSecurityInfo}
            />
          }
          {
            <SignInInformation
              confirm_password={confirm_password}
              errorEffectforPassword={errorEffectforPassword}
              errorEffectforUsername={errorEffectforUsername}
              errorMessageforPassword={errorMessageforPassword}
              errorMessageforUsername={errorMessageforUsername}
              handleChangeForPassword={handleChangeForPassword}
              handleChangeForUsername={handleChangeForUsername}
              handleUpdatePassword={handleUpdatePassword}
              handleUpdateUsername={handleUpdateUsername}
              new_password={new_password}
              okforPassword={okforPassword}
              okforUsername={okforUsername}
              old_password={old_password}
              profile={profile}
              setProfile={setProfile}
              showButtonforPassword={showButtonforPassword}
              showButtonforUsername={showButtonforUsername}
              template={template}
              textChangeforPassword={textChangeforPassword}
              textChangeforUsername={textChangeforUsername}
              username={username}
            />
          }
        </div>
      </div>
    </div>
  );
}
