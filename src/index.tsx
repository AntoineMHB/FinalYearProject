import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Dashboard } from "./screens/Dashboard/Dashboard";
import { BudgetAutomation } from "./screens/BudgetAutomation/BudgetAutomation";
import { DataAnalytics } from "./screens/DataAnalytics/DataAnalytics";
import { Compliance } from "./screens/Compliance/sections/Compliance";
import { Settings } from "./screens/Settings/Settings";
import { Lougout } from "./screens/Logout/Lougout";
import { Login } from "./screens/Login/Login";
import { Signup } from "./screens/Signup/Signup";
import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdminDashboard } from "./screens/AdminDashboard/AdminDashboard";
import { FinancialReport } from "./screens/AdminDashboard/sections/FinancialReport/FinancialReport";
import TaxCalculator from "./screens/TaxCalculator/TaxCalculator";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentPage from "./pages/PaymentPage";





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signupPage" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/downloadReport" element={<FinancialReport />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        

        {/* Protected Routes */}
        <Route path="/adminDashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminDashboard /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoute>} />
        <Route path="/budgetAutomation" element={<PrivateRoute isLoggedIn={isLoggedIn}><BudgetAutomation /></PrivateRoute>} />
        <Route path="/dataAnalytics" element={<PrivateRoute isLoggedIn={isLoggedIn}><DataAnalytics /></PrivateRoute>} />
        <Route path="/taxCalculations" element={<PrivateRoute isLoggedIn={isLoggedIn}><TaxCalculator /></PrivateRoute>} />
        <Route path="/compliance" element={<PrivateRoute isLoggedIn={isLoggedIn}><Compliance /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute isLoggedIn={isLoggedIn}><Settings /></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute isLoggedIn={isLoggedIn}><Lougout /></PrivateRoute>} />
        <Route path="/paymentPage" element={<PrivateRoute isLoggedIn={isLoggedIn}><PaymentPage /></PrivateRoute>} />
        {/* <Route path="/downloadReport" element={<PrivateRoute isLoggedIn={isLoggedIn}><FinancialReport /></PrivateRoute>} /> */}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
