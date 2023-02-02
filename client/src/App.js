import React, { useLayoutEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardAnalysis from "./views/admin/dashboard/DashboardAnalysis.js";
import AdminPrediction from "./views/admin/AdminPrediction.js";
import AdminProfile from "./views/admin/AdminProfile.js";
import AdminSettings from "./views/admin/AdminSettings.js";
import IndexAdmin from "./views/admin/IndexAdmin";
import IndexInsights from "./views/insights/IndexInsights";
import InsightsDepartment from "./views/insights/InsightsDepartment";
import InsightsEmployees from "./views/insights/InsightsEmployees";
import InsightsPerSemesterDepartment from "./views/insights/InsightsPerSemesterDepartment";
import InsightsPerSemesterEmployees from "./views/insights/InsightsPerSemesterEmployees";
import AuthForgotPasswordRequest from "./views/auth/cant_sign_in/AuthForgotPasswordRequest.js";
import AuthForgotUsernameRequest from "./views/auth/cant_sign_in/AuthForgotUsernameRequest";
import AuthLogin from "./views/auth/AuthLogin.js";
import AuthLogout from "./views/auth/AuthLogout";
import AuthRemoveEmailFromAccount from "./views/auth/AuthRemoveEmailFromAccount";
import AuthResetPassword from "./views/auth/AuthResetPassword";
import IndexAuth from "./views/auth/IndexAuth.js";
import PrivacyPolicy from "./views/legal/PrivacyPolicy.js";
import TermsAndConditions from "./views/legal/TermsAndConditions.js";
import IndexPublic from "./views/public/IndexPublic.js";
import PublicAbout from "./views/public/PublicAbout.js";
import PublicHome from "./views/public/PublicHome.js";
import {
  PageNotFound,
  InvalidToken,
  Unauthorized,
  LoginTimeOut,
} from "./views/response/ClientErrorResponses.js";
import IndexUser from "./views/user/IndexUser";

import UserProfile from "./views/user/UserProfile";
import EvalCourseSentimentTable from "./views/user/eval/EvalCourseSentimentTable";
import EvalFiles from "./views/user/eval/EvalFiles";
import IndexEval from "./views/user/eval/IndexEval";
import IndexManagementFiles from "./views/admin/management/IndexManagementFiles";
import ManagementFilesCSV from "./views/admin/management/management_files/ManagementFilesCSV";
import ManagementFilesUsers from "./views/admin/management/management_users/ManagementFilesUsers";
import ManagementFilesData from "./views/admin/management/management_files/ManagementFilesData";
import ManagementFilesListofDataResponse from "./views/admin/management/management_files/ManagementFilesListofDataResponse";
import ManagementFilesReadDataResponse from "./views/admin/management/management_files/ManagementFilesReadDataResponse";
import IndexFiles from "./views/admin/management/management_files/IndexFiles";
import IndexUsers from "./views/admin/management/management_users/IndexUsers";
import AuthAdminUnlock from "./views/auth/AuthAdminUnlock";
import IndexDashBoard from "./views/admin/dashboard/IndexDashBoard";
import IndexUserDashboard from "./views/user/dashboard/IndexUserDashboard";
import UserDashboard from "./views/user/dashboard/UserDashboard";
import EvalReadCourseSentiment from "./views/user/eval/EvalReadCourseSentiment";
import ManagementFileBin from "./views/admin/management/management_files/ManagementFileBin";
import IndexLegal from "./views/legal/IndexLegal";
import IndexCantSignIn from "./views/auth/cant_sign_in/IndexCantSignIn";
import AuthVerifyEmail from "./views/auth/AuthVerifyEmail";

/**
 * @description Main component for the application
 */

export default function App() {
  /**
   * @type {Function}
   * @description Function to scroll to top of the listbox when route changes in the application.
   */
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <div className="bg-blue-200 min-h-screen">
      <ToastContainer
        autoClose={5000}
        className="z-50"
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="bottom-right"
        rtl={false}
        theme="colored"
      />
      <Router>
        <Wrapper>
          <Routes>
            {/**
             * @description Handles public routes for the application, and the IndexPublic component has the outlet for the
             * public routes.
             */}
            <Route element={<IndexPublic />}>
              <Route element={<PublicAbout />} exact="true" path="aboutus" />
              <Route element={<PublicHome />} exact="true" path="/" />
              <Route
                element={<InsightsDepartment />}
                exact="true"
                path="department-sentiment-overall"
              />
              <Route
                element={<InsightsPerSemesterDepartment />}
                exact="true"
                path="department-sentiment"
              />
            </Route>
            {/**
             * End of public routes
             */}

            <Route element={<IndexLegal />} exact={"true"} path="legal">
              <Route
                element={<PrivacyPolicy />}
                exact="true"
                path="privacy-policy"
              />
              <Route
                element={<TermsAndConditions />}
                exact="true"
                path="terms-and-conditions"
              />
            </Route>

            {/**
             * @description Handles auth routes for the application, and the IndexAuth component has the outlet for the
             * auth routes.
             */}
            <Route element={<IndexAuth />}>
              <Route
                element={<IndexCantSignIn />}
                exact="true"
                path="cant-sign-in"
              />
              <Route
                element={<AuthForgotPasswordRequest />}
                exact="true"
                path="forgot-password"
              />
              <Route
                element={<AuthForgotUsernameRequest />}
                exact="true"
                path="forgot-username"
              />
              <Route element={<AuthLogin />} exact="true" path="auth" />

              <Route
                element={<AuthResetPassword />}
                exact="true"
                path="reset-password/:token"
              />
              <Route
                element={<AuthAdminUnlock />}
                exact="true"
                path="admin-unlock/:token"
              />
            </Route>
            <Route
              element={<AuthRemoveEmailFromAccount />}
              exact="true"
              path="remove-email-from-account/:token"
            />
            <Route
              element={<AuthVerifyEmail />}
              exact="true"
              path="verify-email/:token"
            />
            {/**
             * End of auth routes
             */}
            {/**
             * @description Handles admin routes for the application, and the IndexAdmin component has the outlet for the
             * admin routes.
             */}
            <Route element={<IndexAdmin />} exact="true" path="admin">
              <Route element={<IndexInsights />} exact="true" path="insights">
                <Route
                  element={<InsightsDepartment />}
                  exact="true"
                  path="departments"
                />
                <Route
                  element={<InsightsEmployees />}
                  exact="true"
                  path="employees"
                />
                <Route
                  element={<InsightsPerSemesterDepartment />}
                  exact="true"
                  path="per-semester-department"
                />
                <Route
                  element={<InsightsPerSemesterEmployees />}
                  exact="true"
                  path="per-semester-employee"
                />
              </Route>
              <Route
                element={<AdminPrediction />}
                exact="true"
                path="sentiment-analyzer"
              />
              <Route
                element={<AdminProfile />}
                exact="true"
                path="profile/:username"
              />
              <Route element={<AdminSettings />} exact="true" path="settings" />
              <Route element={<IndexDashBoard />} exact="true" path="dashboard">
                <Route
                  element={<DashboardAnalysis />}
                  exact="true"
                  path="sentiment-analysis"
                />
              </Route>
              <Route
                element={<IndexManagementFiles />}
                exact="true"
                path="management"
              >
                <Route element={<IndexFiles />} exact="true" path="files">
                  <Route
                    element={<ManagementFilesCSV />}
                    exact="true"
                    path="data"
                  />
                  <Route
                    element={<ManagementFilesData />}
                    exact="true"
                    path="data/:fileId"
                  />
                  <Route
                    element={<ManagementFilesListofDataResponse />}
                    exact="true"
                    path="data/:fileId/:read_responses"
                  />
                  <Route
                    element={<ManagementFilesReadDataResponse />}
                    exact="true"
                    path="data/:fileId/:read_responses/:file_name"
                  />
                  <Route
                    element={<ManagementFileBin />}
                    exact="true"
                    path="deleted-files"
                  />
                </Route>

                <Route element={<IndexUsers />} exact="true" path="users">
                  <Route
                    element={<ManagementFilesUsers />}
                    exact="true"
                    path="professors"
                  />
                </Route>
              </Route>
              <Route element={<AuthLogout />} exact="true" path="logout" />
            </Route>
            {/**
             * End of admin routes
             * */}

            {/**
             * @description Handles user routes for the application, and the IndexUser component has the outlet for the
             * user routes.
             */}
            <Route element={<IndexUser />} exact="true" path="user">
              <Route
                element={<IndexEval />}
                exact="true"
                path="evaluation-results"
              >
                <Route element={<EvalFiles />} exact="true" path="files" />
                <Route
                  element={<EvalCourseSentimentTable />}
                  path="files/:fileId/:folderName"
                />
                <Route
                  element={<EvalReadCourseSentiment />}
                  path="files/:fileId/:folderName/:fileName"
                />
              </Route>
              <Route
                element={<IndexUserDashboard />}
                exact="true"
                path="dashboard"
              >
                <Route
                  element={<UserDashboard />}
                  exact="true"
                  path="sentiment-analysis"
                />
              </Route>
              <Route
                element={<UserProfile />}
                exact="true"
                path="profile/:username"
              />
              <Route element={<IndexInsights />} exact="true" path="insights">
                <Route
                  element={<InsightsDepartment />}
                  exact="true"
                  path="departments"
                />
                <Route
                  element={<InsightsPerSemesterDepartment />}
                  exact="true"
                  path="per-semester-department"
                />
              </Route>
              <Route element={<AuthLogout />} exact="true" path="logout" />
            </Route>

            <Route element={<Unauthorized />} path="unauthorized-access" />
            {/**
             * @description Handles listbox not found route for the application
             */}
            <Route element={<PageNotFound />} path="*" />
            <Route element={<LoginTimeOut />} path="login-timeout" />
            {/**
             * End of listbox not found route
             */}
            <Route element={<InvalidToken />} path="invalid-token" />
          </Routes>
        </Wrapper>
      </Router>
    </div>
  );
}
