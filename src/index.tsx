import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BudgetAutomation } from "./screens/BudgetAutomation/BudgetAutomation";
import { DataAnalytics } from "./screens/DataAnalytics/DataAnalytics";
import { Compliance } from "./screens/Compliance/sections/Compliance";
import { Settings } from "./screens/Settings/Settings";
import { Lougout } from "./screens/Logout/Lougout";
import { Login } from "./screens/Login/Login";
import { Signup } from "./screens/Signup/Signup";

import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
    console.log("User is logged in:", loggedIn);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/signupPage" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />  
          </>

        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budgetAutomation" element={<BudgetAutomation />} />
            <Route path="/dataAnalytics" element={<DataAnalytics />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/Logout" element={<Lougout />} />
          </>
        )}
      </Routes>
    </BrowserRouter> 
  );
}
createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
