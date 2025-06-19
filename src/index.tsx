import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BudgetAutomation } from "./screens/BudgetAutomation/BudgetAutomation";
import { DataAnalytics } from "./screens/DataAnalytics/DataAnalytics";
import { Compliance } from "./screens/Compliance/sections/Compliance";
import { Settings } from "./screens/Settings/Settings";
import { Lougout } from "./screens/Logout/Lougout";
import { Login } from "./screens/Login/Login";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/budgetAutomation" element={<BudgetAutomation />} />
        <Route path="/dataAnalytics" element={<DataAnalytics />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Logout" element={<Lougout />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      
      {/* <BudgetAutomation /> */}
    </BrowserRouter> 
  </StrictMode>,
);
