import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BudgetAutomation } from "./screens/BudgetAutomation/BudgetAutomation";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budgetAutomation" element={<BudgetAutomation />} />
      </Routes>
      
      {/* <BudgetAutomation /> */}
    </BrowserRouter> 
  </StrictMode>,
);
