import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";
import { BudgetAutomation } from "./screens/BudgetAutomation/BudgetAutomation";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Dashboard /> */}
      <BudgetAutomation />
    </BrowserRouter> 
  </StrictMode>,
);
