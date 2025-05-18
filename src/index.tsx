import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BudgetAutomation } from "./screens/BudgetAutomation/BudgetAutomation";
import { DataAnalytics } from "./screens/DataAnalytics/DataAnalytics";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budgetAutomation" element={<BudgetAutomation />} />
        <Route path="/dataAnalytics" element={<DataAnalytics />} />
      </Routes>
      
      {/* <BudgetAutomation /> */}
    </BrowserRouter> 
  </StrictMode>,
);
