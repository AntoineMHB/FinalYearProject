import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { SlideMenuByAnima } from "../Dashboard/sections/SlideMenuByAnima";
import { SettingsLougOutSlideMenu } from "../Dashboard/sections/SettingsLougOutSlideMenu";

export const Settings = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    {
      name: "Dashboard",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/home-page.png",
      active: false,
    },
    {
      name: "Budget Automation",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/money-bag-2.png",
      active: false,
    },
    {
      name: "Tax Calculations",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/paycheque.png",
      active: false,
    },
    {
      name: "Data Analytics",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/brief.png",
      active: false,
    },
    {
      name: "Compliance",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/assured-workload.png",
      active: false,
    },
    {
      name: "Settings",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/settings.png",
      active: true,
    },
    {
      name: "Log out",
      icon: "https://c.animaapp.com/mat2c4xvr2stZR/img/logout.png",
      active: false,
    },
  ];

  // Settings categories
  const settingsCategories = [
    { name: "General", active: true },
    { name: "Language", active: false },
    { name: "Roles and Permissions", active: false },
  ];

  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full">
      <div className="bg-[#faf9ff] overflow-hidden w-[1440px] h-[900px]">
        <div className="relative h-[911px] top-[-11px] -left-4">
          {/* Main container */}
          <div className="absolute w-[1440px] h-[911px] top-0 left-0">
            {/* Header */}
            <div className="absolute w-[1440px] h-[111px] top-0 left-0 bg-[#faf9ff]" />

            {/* Sidebar background */}
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
          </div>

          {/* Settings content */}
          <div className="flex absolute top-[54px] left-[360px]">
            {/* Settings categories panel */}
            <Card className="w-[248px] h-[465px] bg-[#faf9ff] border border-solid border-white shadow-[0px_4px_4px_#00000040] rounded-none">
              <CardContent className="p-0">
                <h2 className="text-4xl font-semibold text-[#353535] font-['Poppins',Helvetica] mt-5 ml-[81px]">
                  Settings
                </h2>

                <div className="mt-[88px]">
                  {settingsCategories.map((category, index) => (
                    <div
                      key={index}
                      className={`mx-7 py-3 px-6 mb-4 rounded-[15px] ${
                        category.active ? "bg-[#e7f0ff]" : ""
                      }`}
                    >
                      <span
                        className={`font-['Poppins',Helvetica] font-normal text-xl ${
                          category.active ? "text-[#5a57ff]" : "text-black"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* General settings panel */}
            <Card className="w-[688px] h-[465px] ml-0 bg-white shadow-[0px_4px_4px_#00000040] rounded-none">
              <CardContent className="p-0">
                <h2 className="text-4xl font-medium text-[#353535] font-['Poppins',Helvetica] mt-[75px] ml-[51px]">
                  General Settings
                </h2>

                <div className="mt-[52px] mx-[57px]">
                  <div className="mb-6">
                    <label className="block font-['Inter',Helvetica] font-semibold text-black text-lg mb-2">
                      Name
                    </label>
                    <Input
                      placeholder="Your name"
                      className="border-none shadow-none px-0 font-['Inter',Helvetica] font-semibold text-[#bababd] text-lg"
                    />
                    <Separator className="mt-1" />
                  </div>

                  <div className="mt-8">
                    <label className="block font-['Inter',Helvetica] font-semibold text-black text-lg mb-2">
                      Email
                    </label>
                    <Input
                      placeholder="your@email.com"
                      className="border-none shadow-none px-0 font-['Inter',Helvetica] font-semibold text-[#bababd] text-lg"
                    />
                    <Separator className="mt-1" />
                  </div>
                </div>

                <div className="flex justify-end mt-[137px] mr-[57px]">
                  <Button className="bg-[#5a57ff] rounded-[20px] h-11 w-[215px] text-xl font-semibold font-['Poppins',Helvetica]">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;