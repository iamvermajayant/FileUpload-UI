import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Auth/LoginPage";
import PasswordResetPage from "./components/Auth/PasswordResetPage";
import TwoFactorAuthPage from "./components/Auth/TwoFactorAuthPage";
import DashboardPage from "./components/Dashboard/Dashboard";
import SignupPage from "./components/Auth/SignupPage";
import EmailVerificationCard from "./components/Auth/EmailVerificationCard";
import EmailVerified from "./components/Auth/EmailVerified";

function App() {
  return (
    // Wrap your app inside a Router to provide routing functionality

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />
      <Route path="/two-factor-auth" element={<TwoFactorAuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
        path="/email-verification-pending"
        element={<EmailVerificationCard />}
      />
      <Route path="/email-verified" element={<EmailVerified />} />
    </Routes>
  );
}

export default App;
