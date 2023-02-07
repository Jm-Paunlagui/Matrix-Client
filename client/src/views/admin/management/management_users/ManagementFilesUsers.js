import React, {useEffect, useState} from "react";
import {Header, HeaderEmail} from "../../../../components/headers/Header";
import httpClient from "../../../../http/httpClient";
import {LoadingAnimation, LoadingPageSkeletonText,} from "../../../../components/loading/LoadingPage";
import {SearchBar} from "../../../../components/searchbar/SearchBar";
import {
  ICON_PLACE_SELF_CENTER,
  STATUS_GREEN,
  STATUS_RED,
  STATUS_WARNING,
} from "../../../../assets/styles/styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt, faBoxArchive, faCircleXmark, faLock, faRotate, faUnlock,} from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "../../../../components/modal/ModalConfirm";
import {toast} from "react-toastify";
import {Paginator} from "../../../../components/listbox/ListBox";
import {NoData} from "../../../../components/warnings/WarningMessages";
import {ItemsPerPage} from "../../../../components/items/Items";
import {getCookie, isAuth} from "../../../../helpers/Auth";

/**
 * @description Handles the admin tables
 */
export default function ManagementFilesUsers() {
  const token = getCookie("token");
  const [data, setData] = useState({
    loading_: true,
    details: [],
  });

  const { loading_, details } = data;

  /**
   * @description Fetches the data from the server
   */
  const get_file_details = () => {
    httpClient
      .get("/analysis/dashboard-data-user")
      .then((response) => {
        setData({
          ...data,
          loading_: false,
          details: response.data.details,
        });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized Access");
            window.location.href = "/unauthorized-access";
            break;
          case 440:
            toast.error("Session Expired");
            window.location.href = "/login-timeout";
            break;
          default:
            toast.error("Something went wrong");
            window.location.href = "/page-not-found";
        }
      });
  };
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

  const [userDatas, setUserDatas] = useState({
    loading: true,
    users: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page_number: 1,
    total_items: "",
    total_pages: "",
    per_page_limit: per_page[0].value,
  });

  const {
    loading,
    users,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
    per_page_limit,
  } = userDatas;

  const [filteredListOfUsers, setFilteredListOfUsers] = useState(users);

  const [loadingIDActivate, setLoadingIDActivate] = useState({});
  const [loadingIDDeactivate, setLoadingIDDeactivate] = useState({});
  const [loadingIDLock, setLoadingIDLock] = useState({});
  const [loadingIDUnlock, setLoadingIDUnlock] = useState({});
  const [loadingIDDelete, setLoadingIDDelete] = useState({});
  const [loadingIDRestore, setLoadingIDRestore] = useState({});
  const [disabledAllButtons, setDisabledAllButtons] = useState({});

  const [loadingAnimation, setLoadingAnimation] = useState({
    massDisable: false,
    massActivation: false,
    textChangeActivation: "Activate all",
    massDeactivation: false,
    textChangeDeactivation: "Deactivate all",
    massUnlocked: false,
    textChangeUnlocked: "Unlock all",
    massLocked: false,
    textChangeLocked: "Lock all",
    massRestore: false,
    textChangeRestore: "Restore all",
    massDelete: false,
    textChangeDelete: "Archive all",
  });

  const {
    massDisable,
    massActivation,
    textChangeActivation,
    massDeactivation,
    textChangeDeactivation,
    massUnlocked,
    textChangeUnlocked,
    massLocked,
    textChangeLocked,
    massRestore,
    textChangeRestore,
    massDelete,
    textChangeDelete,
  } = loadingAnimation;

  const disableAllButtons = (bool) => {
    for (let i = 0; i < users.length; i++) {
      disabledAllButtons[users[i].id] = bool;
    }
  };

  /**
   * @description Pagination handler for the users table
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleSelect = (name) => (value) => {
    setUserDatas({
      ...userDatas,
      [name]: value,
      page_number: 1,
    });
  };

  /**
   * @description Search bar handler for the users table
   * @param event
   */
  const handleSearchForUsers = (event) => {
    const searchValue = event.target.value;
    const filteredList = users.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.department_name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfUsers(filteredList);
  };

  /**
   * @description Fetches the users data from the backend
   * @param page
   * @param per_page_limit
   */
  const loadListOfUsers = (page, per_page_limit) => {
    if (isAuth().verified_email === "Verified"){
      httpClient
      .get(`/data/list-of-users-to-view/${page}/${per_page_limit}/${token}`)
      .then((response) => {
        setUserDatas({
          ...userDatas,
          loading: false,
          users: response.data.evaluatees_to_create,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
        setFilteredListOfUsers(response.data.evaluatees_to_create);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
    }
  };

  /**
   * @description Creates a single user
   * @param id
   */
  const handleCreateUser = (id) => {
    setLoadingIDActivate((ids) => ({ ...ids, [id]: true }));
    setDisabledAllButtons((ids) => ({ ...ids, [id]: true }));
    httpClient
      .post(`/user/on-click-create/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        setLoadingIDActivate((ids) => ({ ...ids, [id]: false }));
        setDisabledAllButtons((ids) => ({ ...ids, [id]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIDActivate({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Deactivates a single user
   * @param id
   * @returns {Promise<void>}
   */
  const handleDeactivateUser = async (id) => {
    setLoadingIDDeactivate((ids) => ({ ...ids, [id]: true }));
    setDisabledAllButtons((ids) => ({ ...ids, [id]: true }));
    await httpClient
      .post(`/user/on-click-deactivate/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        setLoadingIDDeactivate((ids) => ({ ...ids, [id]: false }));
        setDisabledAllButtons((ids) => ({ ...ids, [id]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIDDeactivate({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Locks a single user
   * @param id
   * @returns {Promise<void>}
   */
  const handleLockUser = async (id) => {
    setLoadingIDLock((ids) => ({ ...ids, [id]: true }));
    setDisabledAllButtons((ids) => ({ ...ids, [id]: true }));
    await httpClient
      .post(`/user/lock-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        setLoadingIDLock((ids) => ({ ...ids, [id]: false }));
        setDisabledAllButtons((ids) => ({ ...ids, [id]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIDLock({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Unlocks a single user
   * @param id
   * @returns {Promise<void>}
   */
  const handleUnlockUser = async (id) => {
    setLoadingIDUnlock((ids) => ({ ...ids, [id]: true }));
    setDisabledAllButtons((ids) => ({ ...ids, [id]: true }));
    await httpClient
      .post(`/user/unlock-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        setLoadingIDUnlock((ids) => ({ ...ids, [id]: false }));
        setDisabledAllButtons((ids) => ({ ...ids, [id]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIDUnlock({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Deletes a single user
   * @param id
   * @returns {Promise<void>}
   */
  const handleDeleteUser = async (id) => {
    setLoadingIDDelete((ids) => ({ ...ids, [id]: true }));
    setDisabledAllButtons((ids) => ({ ...ids, [id]: true }));
    await httpClient
      .delete(`/user/delete-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        setLoadingIDDelete((ids) => ({ ...ids, [id]: false }));
        setDisabledAllButtons((ids) => ({ ...ids, [id]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIDDelete({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Restores a single user
   * @param id
   * @returns {Promise<void>}
   */
  const handleRestoreUser = async (id) => {
    setLoadingIDRestore((ids) => ({ ...ids, [id]: true }));
    setDisabledAllButtons((ids) => ({ ...ids, [id]: true }));
    await httpClient
      .post(`/user/restore-account/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        setLoadingIDRestore((ids) => ({ ...ids, [id]: false }));
        setDisabledAllButtons((ids) => ({ ...ids, [id]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIDRestore({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Creates multiple users
   * @returns {Promise<void>}
   */
  const handleCreateAllUsers = async () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massActivation: true,
      textChangeActivation: "Activating...",
    });
    await httpClient
      .post(`/user/mass-create-all`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        get_file_details();
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massActivation: false,
          textChangeActivation: "Activate all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massActivation: false,
          textChangeActivation: "Activate all",
        });
      });
  };

  /**
   * @description Deactivates multiple users
   * @returns {Promise<void>}
   */
  const handleDeactivateAllUsers = async () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massDeactivation: true,
      textChangeDeactivation: "Deactivating...",
    });
    await httpClient
      .post(`/user/mass-deactivate-all`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        disableAllButtons(false);
        get_file_details();
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDeactivation: false,
          textChangeDeactivation: "Deactivate all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDeactivation: false,
          textChangeDeactivation: "Deactivate all",
        });
      });
  };

  /**
   * @description Locks multiple users
   * @returns {Promise<void>}
   */
  const handleLockAllUsers = async () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massLocked: true,
      textChangeLocked: "Locking...",
    });
    await httpClient
      .post(`/user/mass-lock-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        disableAllButtons(false);
        get_file_details();
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massLocked: false,
          textChangeLocked: "Lock all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massLocked: false,
          textChangeLocked: "Lock all",
        });
      });
  };

  /**
   * @description Unlocks multiple users
   * @returns {Promise<void>}
   */
  const handleUnlockAllUsers = async () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massUnlocked: true,
      textChangeUnlocked: "Unlocking...",
    });
    await httpClient
      .post(`/user/mass-unlock-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        disableAllButtons(false);
        get_file_details();
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massUnlocked: false,
          textChangeUnlocked: "Unlock all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massUnlocked: false,
          textChangeUnlocked: "Unlock all",
        });
      });
  };

  /**
   * @description Deletes multiple users
   * @returns {Promise<void>}
   */
  const handleDeleteAllUsers = async () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massDelete: true,
      textChangeDelete: "Archiving...",
    });
    await httpClient
      .put(`/user/mass-delete-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        disableAllButtons(false);
        get_file_details();
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDelete: false,
          textChangeDelete: "Archive all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDelete: false,
          textChangeDelete: "Archive all",
        });
      });
  };

  /**
   * @description Restores multiple users
   * @returns {Promise<void>}
   */
  const handleRestoreAllUsers = async () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massRestore: true,
      textChangeRestore: "Restoring...",
    });
    await httpClient
      .post(`/user/mass-restore-account`)
      .then((response) => {
        toast.success(response.data.message);
        loadListOfUsers(page_number, per_page_limit);
        disableAllButtons(false);
        get_file_details();
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massRestore: false,
          textChangeRestore: "Restore all",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massRestore: false,
          textChangeRestore: "Restore all",
        });
      });
  };

  useEffect(() => {
    get_file_details();
  }, []);

  /**
   * @description Syncs users from the database
   */
  useEffect(() => {
    loadListOfUsers(page_number, per_page_limit);
  }, [page_number, per_page_limit]);

  return (
    <div className="px-6 mx-auto mt-8 max-w-7xl mb-60">
      {
        isAuth().verified_email === "Verified" ? (
          <>
                  <Header
                    body={
                      "Create a new user for the system to view and analyze their sentiment scores."
                    }
                    title={"User Management"}
                  />
                  <div className="grid grid-cols-2 py-8 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                      <>
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                      </>
                    ) : (
                      details.map((detail) => (
                        <div
                          className="flex flex-col hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                          key={detail.id}
                        >
                          <div className="flex w-full bg-blue-50 rounded-lg shadow p-4">
                            <div
                              className={`flex items-center justify-center w-10 h-10 text-white rounded ${detail.color}`}
                            >
                              <i className={detail.icon} />
                            </div>
                            <div className="flex flex-col items-start justify-center ml-4">
                              <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                                {detail.value}
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                {detail.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <SearchBar
                    name="searchValue"
                    onChange={(event) => handleSearchForUsers(event)}
                    placeholder="Search"
                    type="text"
                  />
                  <div className="grid grid-cols-1 md:gap-6">
                    <div className="w-full p-4 mt-8 rounded-lg shadow bg-blue-50">
                      <div className="flex flex-wrap content-end justify-start w-full gap-2">
                        <div className="flex flex-row w-full">
                          <h1 className="text-base font-bold leading-none text-blue-500">
                            Multiple Actions at once
                          </h1>
                        </div>
                        <ModalConfirm
                          body={`Are you sure you want to Activate all users in the system?`}
                          description="This action cannot be undone. All users will able to access the system to view their sentiment scores. This action will also send an email to all users to notify them that their account has been activated."
                          disabled={massDisable}
                          is_manny
                          onConfirm={() => handleCreateAllUsers()}
                          title="Activate All Users"
                        >
                          {massActivation ? (
                            <>
                              <LoadingAnimation moreClasses="text-teal-600" />
                              {textChangeActivation}
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faBolt}
                              />
                              {textChangeActivation}
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to restore all users authorization to the system?`}
                          description="This action cannot be undone. The user you are trying to Reauthorized access will be able to access the system to view their sentiment scores."
                          disabled={massDisable}
                          is_manny
                          onConfirm={() => handleUnlockAllUsers()}
                          title="Restore Authorization"
                        >
                          {massUnlocked ? (
                            <>
                              <LoadingAnimation moreClasses="text-teal-600" />
                              {textChangeUnlocked}
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faUnlock}
                              />
                              {textChangeUnlocked}
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to restore all users account to the system?`}
                          description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."
                          disabled={massDisable}
                          is_manny
                          onConfirm={() => handleRestoreAllUsers()}
                          title="Restore Account"
                        >
                          {massRestore ? (
                            <>
                              <LoadingAnimation moreClasses="text-teal-600" />
                              {textChangeRestore}
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faRotate}
                              />
                              {textChangeRestore}
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to deactivate all users?`}
                          description="This action cannot be undone. The users you are trying to Deactivate will not be able to login to the system to view their sentiment scores."
                          disabled={massDisable}
                          is_danger
                          is_manny
                          onConfirm={() => handleDeactivateAllUsers()}
                          title="Deactivate all users"
                        >
                          {massDeactivation ? (
                            <>
                              <LoadingAnimation moreClasses="text-red-600" />
                              {textChangeDeactivation}
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faCircleXmark}
                              />
                              {textChangeDeactivation}
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to remove all users authorization to the system?`}
                          description="This action cannot be undone. The user you are trying to restrict access will be unable to access the system to view their sentiment scores."
                          disabled={massDisable}
                          is_danger
                          is_manny
                          onConfirm={() => handleLockAllUsers()}
                          title="Remove Authorization"
                        >
                          {massLocked ? (
                            <>
                              <LoadingAnimation moreClasses="text-red-600" />
                              {textChangeLocked}
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faLock}
                              />
                              {textChangeLocked}
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to archive all users account to the system?`}
                          description="This action cannot be undone. This will archive all the users account from the system."
                          disabled={massDisable}
                          is_danger
                          is_manny
                          onConfirm={() => handleDeleteAllUsers()}
                          title="Archive User Confirmation"
                        >
                          {massDelete ? (
                            <>
                              <LoadingAnimation moreClasses="text-red-600" />
                              {textChangeDelete}
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faBoxArchive}
                              />
                              {textChangeDelete}
                            </>
                          )}
                        </ModalConfirm>
                      </div>
                    </div>
                  </div>
                  <ItemsPerPage
                    Datas={userDatas}
                    current_page={current_page}
                    has_next={has_next}
                    has_prev={has_prev}
                    items={users}
                    moreClasses={"mb-8"}
                    page_number={page_number}
                    setDatas={setUserDatas}
                    total_items={total_items}
                    total_pages={total_pages}
                  >
                    <Paginator
                      handleSelect={handleSelect}
                      per_page={per_page}
                      per_page_limit={per_page_limit}
                    />
                  </ItemsPerPage>
                  <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
                    {loading_ ? (
                      <>
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                      </>
                    ) : filteredListOfUsers.length > 0 ? (
                      filteredListOfUsers.map((user) => (
                        <div
                          className="flex flex-col hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                          key={user.id}
                        >
                          <div className="flex-1 w-full bg-blue-50 rounded-lg shadow">
                            <div className="w-full col-span-1">
                              <div className="flex flex-row w-full p-4">
                                <h1 className="font-bold leading-none text-blue-500 text-md">
                                  {user.full_name}
                                </h1>
                              </div>
                            </div>
                            <hr className="w-full border-gray-300" />
                            <div className="col-span-4 p-4 text-start">
                              <div className="flex flex-row w-full py-2">
                                <h1 className="text-base font-bold leading-none text-blue-500">
                                  Status
                                </h1>
                              </div>
                              <div className="flex flex-wrap content-end justify-start w-full gap-2">
                                <div
                                  className={`p-2 flex flex-row justify-center ${
                                    user.is_active ? STATUS_GREEN : STATUS_WARNING
                                  }`}
                                >
                                  <h1 className="text-sm leading-none uppercase">
                                    {user.is_active ? "Activated" : "Deactivated"}
                                  </h1>
                                </div>
                                <div
                                  className={`p-2 flex flex-row justify-center ${
                                    user.is_locked ? STATUS_RED : STATUS_GREEN
                                  }`}
                                >
                                  <h1 className="text-sm leading-none uppercase">
                                    {user.is_locked ? "Locked" : "Unlocked"}
                                  </h1>
                                </div>
                                <div
                                  className={`p-2 flex flex-row justify-center ${
                                    user.is_deleted ? STATUS_RED : STATUS_GREEN
                                  }`}
                                >
                                  <h1 className="text-sm leading-none uppercase">
                                    {user.is_deleted ? "Archived" : "Unarchived"}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex flex-row w-full py-2">
                                <h1 className="text-base font-bold leading-none text-blue-500">
                                  Details
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Email:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-600">
                                  {user.email}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Username:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-600">
                                  {user.username}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Role:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {user.role}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Department:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {user.department_name}
                                </h1>
                              </div>
                            </div>
                            <div className="w-full col-span-1">
                              <div className="flex flex-row w-full px-4">
                                <h1 className="text-base font-bold leading-none text-blue-500">
                                  General
                                </h1>
                              </div>
                              <div className="flex flex-wrap content-end justify-start w-full gap-2 p-4">
                                <ModalConfirm
                                  body={`Are you sure you want to Activate the user account of ${user.full_name}?`}
                                  description="This action cannot be undone. The user you are trying to Activate will be able to access the system to view their sentiment scores."
                                  disabled={disabledAllButtons[user.id]}
                                  id={user.id}
                                  is_many={false}
                                  onConfirm={handleCreateUser}
                                  title="Activate User Account"
                                >
                                  {loadingIDActivate[user.id] ? (
                                    <>
                                      <LoadingAnimation moreClasses="text-green-600" />
                                      Activating...
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className={`${ICON_PLACE_SELF_CENTER}`}
                                        icon={faBolt}
                                      />
                                      Activate
                                    </>
                                  )}
                                </ModalConfirm>
                                <ModalConfirm
                                  body={`Are you sure you want to unlock the user account of ${user.full_name}?`}
                                  description="This action cannot be undone. The user you are trying to unlock will be able to access the system to view their sentiment scores."
                                  disabled={disabledAllButtons[user.id]}
                                  id={user.id}
                                  is_many={false}
                                  onConfirm={handleUnlockUser}
                                  title="Unlock User Account"
                                >
                                  {loadingIDUnlock[user.id] ? (
                                    <>
                                      <LoadingAnimation moreClasses="text-green-600" />
                                      Unlocking...
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className={`${ICON_PLACE_SELF_CENTER}`}
                                        icon={faUnlock}
                                      />
                                      Unlock
                                    </>
                                  )}
                                </ModalConfirm>
                                <ModalConfirm
                                  body={`Are you sure you want to restore the account of ${user.full_name} to the system?`}
                                  description="This action cannot be undone. The user you are trying to restore will be able to access the system to view their sentiment scores."
                                  disabled={disabledAllButtons[user.id]}
                                  id={user.id}
                                  is_many={false}
                                  onConfirm={handleRestoreUser}
                                  title="Restore User Account"
                                >
                                  {loadingIDRestore[user.id] ? (
                                    <>
                                      <LoadingAnimation moreClasses="text-green-600" />
                                      Restoring...
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className={`${ICON_PLACE_SELF_CENTER}`}
                                        icon={faRotate}
                                      />
                                      Restore
                                    </>
                                  )}
                                </ModalConfirm>
                                <ModalConfirm
                                  body={`Are you sure you want to deactivate the user account of ${user.full_name}?`}
                                  description="This action cannot be undone. The user you are trying to deactivate will be unable to access the system to view their sentiment scores."
                                  disabled={disabledAllButtons[user.id]}
                                  id={user.id}
                                  is_danger
                                  is_many={false}
                                  onConfirm={handleDeactivateUser}
                                  title="Deactivate User Account"
                                >
                                  {loadingIDDeactivate[user.id] ? (
                                    <>
                                      <LoadingAnimation moreClasses="text-red-600" />
                                      Deactivating...
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className={`${ICON_PLACE_SELF_CENTER}`}
                                        icon={faCircleXmark}
                                      />
                                      Deactivate
                                    </>
                                  )}
                                </ModalConfirm>
                                <ModalConfirm
                                  body={`Are you sure you want to lock the user account of ${user.full_name}?`}
                                  description="This action cannot be undone. The user you are trying to lock will be unable to access the system to view their sentiment scores."
                                  disabled={disabledAllButtons[user.id]}
                                  id={user.id}
                                  is_danger
                                  is_many={false}
                                  onConfirm={handleLockUser}
                                  title="Lock User Account"
                                >
                                  {loadingIDLock[user.id] ? (
                                    <>
                                      <LoadingAnimation moreClasses="text-red-600" />
                                      Locking...
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className={`${ICON_PLACE_SELF_CENTER}`}
                                        icon={faLock}
                                      />
                                      Lock
                                    </>
                                  )}
                                </ModalConfirm>
                                <ModalConfirm
                                  body={`Are you sure you want to delete ${user.full_name} from the system?`}
                                  description="This action cannot be undone. This will permanently delete the users account from the system."
                                  disabled={disabledAllButtons[user.id]}
                                  id={user.id}
                                  is_danger
                                  is_many={false}
                                  onConfirm={handleDeleteUser}
                                  title="Delete User Account"
                                >
                                  {loadingIDDelete[user.id] ? (
                                    <>
                                      <LoadingAnimation moreClasses="text-red-600" />
                                      Archiving...
                                    </>
                                  ) : (
                                    <>
                                      <FontAwesomeIcon
                                        className={`${ICON_PLACE_SELF_CENTER}`}
                                        icon={faBoxArchive}
                                      />
                                      Archive
                                    </>
                                  )}
                                </ModalConfirm>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={"col-span-full"}>
                        <NoData message="Data Unavailable" />
                      </div>
                    )}
                  </div>
                  <ItemsPerPage
                    Datas={userDatas}
                    current_page={current_page}
                    has_next={has_next}
                    has_prev={has_prev}
                    items={users}
                    page_number={page_number}
                    setDatas={setUserDatas}
                    total_items={total_items}
                    total_pages={total_pages}
                  >
                    <Paginator
                      handleSelect={handleSelect}
                      per_page={per_page}
                      per_page_limit={per_page_limit}
                    />
                  </ItemsPerPage>
          </>
        ) : (<HeaderEmail title={"admin"} />)
      }
    </div>
  );
}
