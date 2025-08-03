import { BellIcon, DownloadIcon, FilterIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SlideMenuByAnima } from "./SlideMenuByAnima";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { TransactionsTableByAnima } from "./TransactionsTableByAnima";
import { Button } from "../../../components/ui/button";
import { SettingsLougOutSlideMenu } from "../../Dashboard/sections/SettingsLougOutSlideMenu";
import { AuditTrailTable } from "../AuditTrailTable/AuditTrailTable";
import PaymentList from "../PaymentList/PaymentList";

type User = {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
}


export const Compliance = (): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#faf9ff] w-full max-w-[1440px] relative">
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
        <div className="ml-[280px] p-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-extrabold text-[#353535] text-4xl [font-family:'Poppins',Helvetica]">
              Compliance Insights
            </h1>

            <div className="flex items-center gap-4">
              <div className="relative">
                <BellIcon className="w-6 h-6" />
                <div className="absolute w-2 h-2 top-0 right-0 bg-[#ff5787] rounded-full border border-solid border-[#faf9ff]" />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-[50px] h-[50px]">
                    {/* <AvatarImage
                      src="https://c.animaapp.com/mat0sth7aPU5zJ/img/ellipse-1.png"
                      alt="User avatar"
                    /> */}
                    <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute w-3 h-3 top-1 right-0 bg-[#53e88c] rounded-md border-2 border-solid border-[#faf9ff]" />
                </div>

                <div>
                  <div className="font-semibold text-black text-xl [font-family:'Poppins',Helvetica]">
                   {user?.firstname}&nbsp;&nbsp;{user?.lastname}
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-light text-[#666668] text-sm">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                className="h-[65px] pl-[109px] bg-white rounded-[20px] border border-solid border-[#818181] shadow-[0px_4px_4px_#00000040] font-medium text-[#b0b0b4] text-xl [font-family:'Poppins',Helvetica]"
                placeholder="Search updates and logs..."
              />
              <SearchIcon className="absolute left-16 top-1/2 transform -translate-y-1/2 text-[#b0b0b4]" />
            </div>

            <div className="relative w-[255px]">
              <Input
                className="h-[65px] pl-[81px] bg-white rounded-[20px] border border-solid border-[#818181] shadow-[0px_4px_4px_#00000040] font-bold text-black text-base [font-family:'Poppins',Helvetica]"
                defaultValue="mm/dd/yy"
              />
              <span className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <img
                  className="w-5 h-5"
                  alt="Calendar icon"
                  src="https://c.animaapp.com/mat0sth7aPU5zJ/img/money-bag-2.png"
                />
              </span>
            </div>

            <div className="relative w-[191px]">
              <Input
                className="h-[65px] pl-[91px] bg-white rounded-[20px] border border-solid border-[#818181] shadow-[0px_4px_4px_#00000040] font-bold text-black text-xl [font-family:'Poppins',Helvetica]"
                defaultValue="Filters"
              />
              <FilterIcon className="absolute left-8 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Updates and Alerts Section */}
          <div className="flex space-x-72 mb-8">
            <div className="flex items-center justify-between space-x-5 mb-4">
              <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#353535] text-2xl">
                Updates and Alerts
              </h2>
              <Badge className="bg-[#ea050521] hover:bg-red-300 text-[#ea0505] rounded-[20px] px-5 py-1.5 font-bold">
                3 active
              </Badge>
            </div>

            {/* View Updates Button */}
            <div className="flex justify-end mb-4">
              <Card className="w-[280px] h-[54px] bg-[#e6f0ff] rounded-[15px] flex items-center justify-center">
                <div className="[font-family:'Poppins',Helvetica] font-bold text-[#5a57ff] text-base">
                  View Updates and Alerts
                </div>
              </Card>
            </div>
          </div>

          {/* Audit Trail Logs Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#353535] text-2xl">
                Audit Trail Logs
              </h2>
              <div className="flex items-center">
                <div className="[font-family:'Poppins',Helvetica] font-bold text-[#5a57ff] text-base mr-2">
                  View Logs
                </div>
                <img
                  className="w-5 h-5"
                  alt="Money bag"
                  src="https://c.animaapp.com/mat0sth7aPU5zJ/img/money-bag-2.png"
                />
              </div>
            </div>

            <AuditTrailTable />

            <PaymentList />
          </div>
        </div>
      </div>
    </div>
  );
};
