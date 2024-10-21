import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Logo from "@/assets/logo1.png";
import ProtectedRoute from "@/ProtectedRoute";
import Page403 from "@/components/Page403";
import { ContextProvider } from "@/common/config/configs/Context";
import { RotateLoader } from "react-spinners";
import UserProfil from "@/components/UserProfil";

const ForgotPassword = lazy(() => import("@/modules/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("@/modules/ForgotPassword/ResetPassword"));
const EmailSend = lazy(() => import("@/modules/ForgotPassword/EmailSend"));
const Inscription = lazy(() => import("@/modules/Inscription/Inscription"));
const Login = lazy(() => import("@/modules/Login/Login"));
const Dashboard = lazy(() => import("@/modules/dashboard/Dashboard"));

export function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">
          <RotateLoader color="#F2505D" />
        </div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Login Title="Se connecter">
                <img src={Logo} alt="Logo" />
              </Login>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/emailSend" element={<EmailSend />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profil" element={<UserProfil />} />
          <Route
            path="/dashboard"
            element={
              <ContextProvider>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </ContextProvider>
            }
          />

          <Route path="/403" element={<Page403 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
