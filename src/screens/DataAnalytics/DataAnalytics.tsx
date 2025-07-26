import { Bell, BellIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RevenueCardByAnima } from "./sections/RevenueCardByAnima";
import { SlideMenuByAnima } from "./sections/SlideMenuByAnima";
import { SettingsLougOutSlideMenu } from "../Dashboard/sections/SettingsLougOutSlideMenu";
import axios from "axios";
import ProfitAndLossStatement from "./sections/ProfitAndLossStatement/ProfitAndLossStatement";
import ExpenseBreakdown from "./sections/ExpenseBreakdown/ExpenseBreakdown";
import { NbchartsLinechatsByAnima } from "../AdminDashboard/sections/NbchartsLinechatsByAnima";

type User = {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
  user: {
    id: number;
  };
}

export const DataAnalytics = (): JSX.Element => {
      const [user, setUser] = useState<User | null>(null);
      const [departments, setDepartments] = useState<Department[]>([]);
    
      useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }, []);

          useEffect(() => {
            const token = localStorage.getItem("token");
            
            if (token) {
              axios.get("http://localhost:8080/api/departments", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setDepartments(response.data);
              })
              .catch((error) => {
                console.error("Error fetching departments:", error);
              });
            } else {
              console.error("No token found in localStorage");
            }
          }, []);
  // Data for the financial metrics
  const financialMetrics = [
    {
      value: "$500,000",
      color: "text-[#03ad3c]",
      icon: "https://c.animaapp.com/masu33i4lo9YhV/img/upward-trend.svg",
      alt: "Upward trend",
    },
    {
      value: "$320,000",
      color: "text-[#ea0505]",
      icon: "https://c.animaapp.com/masu33i4lo9YhV/img/downward-trend.svg",
      alt: "Downward trend",
    },
    { value: "$1800", color: "text-[#ff8a06]", icon: null, alt: null },
    { value: "$1800", color: "text-[#1606ff]", icon: null, alt: null },
  ];

  // Data for the chart bars
  const chartBars = [
    { height: "81px", top: "38px" },
    { height: "102px", top: "17px" },
    { height: "45px", top: "75px" },
    { height: "71px", top: "49px" },
    { height: "89px", top: "31px" },
    { height: "47px", top: "72px" },
    { height: "71px", top: "49px" },
    { height: "105px", top: "15px" },
  ];

  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#faf9ff] overflow-hidden w-full max-w-[1440px] relative">
        {/* Header */}
        <header className="w-full h-[111px] bg-[#faf9ff] flex items-center justify-between px-6 relative z-10">
          <div className="absolute top-[47px] left-[360px]">
            <h1 className="font-['Poppins',Helvetica] font-extrabold text-[#353535] text-4xl">
              Financial Insights
            </h1>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Select defaultValue="last-week">
              <SelectTrigger className="w-36 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
                <SelectValue placeholder="Last week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-week">Last week</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Bell className="w-6 h-6 text-gray-600" />
                <Badge className="absolute w-2 h-2 top-px right-px bg-[#ff5787] rounded border border-solid border-[#faf9ff]" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-[50px] h-[50px]">
                  <AvatarImage
                    src="https://c.animaapp.com/masu33i4lo9YhV/img/ellipse-1.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                </Avatar>
                <Badge className="absolute w-3 h-3 top-1 right-0 bg-[#53e88c] rounded-md border-2 border-solid border-[#faf9ff]" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Poppins',Helvetica] font-semibold text-black text-xl">
                  {user?.firstname}&nbsp;&nbsp;{user?.lastname}
                </span>
                <span className="font-['Poppins',Helvetica] font-light text-[#666668] text-sm">
                  {user?.email}
                </span>
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

        {/* Main Content */}
        <main className="ml-[280px] p-6">
          <div className="mt-[2px]">
            {/* Revenue Cards Section */}
            <div>
            <Select>
                <SelectTrigger className="w-36 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-md">
                    <SelectValue placeholder="Department" />
                      </SelectTrigger>
                    <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
              </Select>
          
          </div>
            <RevenueCardByAnima />



            
             <div className="grid grid-cols-2 gap-4">
              {/* Charts Section */}
              <div className="flex flex-wrap gap-6 mt-2">
               {/* Revenue & Expense Trends */}
                <Card className="w-[600px] h-[289px] border border-solid border-[#5a57ff1a] rounded-3xl bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-['Poppins',Helvetica] font-medium text-[#b0b0b4] text-base">
                      Revenue &amp; Expense Trends
                    </h3>
                 <NbchartsLinechatsByAnima />
                  </CardContent>
                </Card>

                          {/* Action Buttons */}
                <div className="flex-wrap gap-4 mt-[-12px] mb-[10px]">
                  <Button className="w-[504px] h-[54px] bg-white text-[#5a57ff] hover:bg-gray-100 rounded-[20px] shadow-lg">
                    <span className="font-['Poppins',Helvetica] font-bold text-xl">
                      Generate Reports
                    </span>
                  </Button>
                  <Button className="mt-4 w-[504px] h-[54px] bg-[#5a57ff] text-white hover:bg-[#4a47ef] rounded-[20px] shadow-lg">
                    <span className="font-['Poppins',Helvetica] font-bold text-xl">
                      Download Reports
                    </span>
                  </Button>
                </div>
                

              </div>

              <div className="flex flex-wrap gap-1 mt-2">
              
              {/* Expense Breakdown */}
              <ExpenseBreakdown />


                          {/* Profit and Loss Statement */}
              <Card className="w-[507px] h-[206px] border border-solid border-[#5a57ff1a] rounded-3xl shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-['Poppins',Helvetica] font-medium text-[#b0b0b4] text-base">
                    Profit and Loss Statement
                  </h3>
                <ProfitAndLossStatement />
                </CardContent>
              </Card>

             </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
