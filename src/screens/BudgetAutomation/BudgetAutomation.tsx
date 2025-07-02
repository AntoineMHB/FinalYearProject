import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RevenueCardByAnima } from "./sections/RevenueCardByAnima/RevenueCardByAnima";

import { TransactionsTableByAnima } from "./sections/TransactionsTableByAnima";
import { SlideMenuByAnima } from "../Dashboard/sections/SlideMenuByAnima";
import { SettingsLougOutSlideMenu } from "../Dashboard/sections/SettingsLougOutSlideMenu";
import { Bell } from "lucide-react";

type User = {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
}

export const BudgetAutomation = (): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  // Data for the budget metrics
  const budgetMetrics = [
    { value: "$500,000", color: "text-[#03ad3c]" },
    { value: "$320,000", color: "text-[#ea0505]" },
    { value: "$1800", color: "text-[#ff8a06]" },
  ];

  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#faf9ff] w-full max-w-[1440px] relative">
        {/* Header section */}
        <header className="w-full h-[111px] bg-[#faf9ff]">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-4xl font-extrabold text-[#353535] ml-[343px] mt-8">
              Budget Insights
            </h1>

            {/* User profile section */}
            <div className="flex items-center gap-4 mt-8">
              {/* Notification icon */}
              <div className="relative w-6 h-6">
                <div className="relative w-[19px] h-[22px] top-px left-[3px]">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute w-2 h-2 top-px left-[11px] bg-[#ff5787] rounded border border-solid border-[#faf9ff]" />
                </div>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-3">
                <Avatar className="w-[50px] h-[50px] relative">
                  <AvatarImage src="/ellipse-1.png" alt="User profile" />
                  <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                  <div className="absolute w-3 h-3 top-1 right-0 bg-[#53e88c] rounded-md border-2 border-solid border-[#faf9ff]" />
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-black">
                    {user?.firstname}&nbsp;&nbsp;{user?.lastname}
                  </span>
                  <span className="font-light text-sm text-[#666668]">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        
        {/* Sidebar */}
        <div className="w-[250px] h-full fixed top-0  bg-[#5a57ff] rounded-[0px_30px_30px_0px] z-10 overflow-auto scrollbar-hide">
          
            <div className="pt-10 pl-[53px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl">
              LIKUTA Track
            </div>
            
            <div className="pt-[30px]">
             <SlideMenuByAnima />
            </div>

            <div className="pt-[30px]">
              <SettingsLougOutSlideMenu />
            </div>
          
        </div>

        {/* Main content */}
        <main className="ml-[250px] p-6">
          {/* Revenue cards section */}
          <RevenueCardByAnima />

         <div className="mt-1 flex space-x-72">
                      {/* Filter section */}
           <div className="pl-[70px] mt-8 flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-36 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-md">
                <SelectValue placeholder="Last month" />
              </SelectTrigger>
              <SelectContent>
                <div className="w-20 [font-family:'Poppins',Helvetica] font-medium text-[#666668] text-xs">
                  Last month
                </div>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-36 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-md">
                <SelectValue placeholder="IT" />
              </SelectTrigger>
              <SelectContent>
                <div className="w-[60px] [font-family:'Poppins',Helvetica] font-medium text-[#666668] text-xs">
                  IT
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Create new budget button */}
           <Button className="mt-8 bg-white hover:bg-slate-200 text-black border border-gray-300 rounded-[20px] shadow-md px-6 py-3 font-medium text-xl">
            Create New Budget
           </Button>

          </div>





          {/* Departmental budget section */}
          <h2 className="mt-8 font-semibold text-[#353535] text-2xl [font-family:'Inter',Helvetica]">
            Departmental Budget
          </h2>

          {/* Transactions table */}
          <TransactionsTableByAnima />
        </main>
      </div>
    </div>
  );
};
