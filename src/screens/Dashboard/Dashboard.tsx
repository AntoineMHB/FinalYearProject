import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectTrigger, SelectValue } from "../../components/ui/select";
import { NbchartsLinechatsByAnima } from "./sections/NbchartsLinechatsByAnima";
import { RevenueCardByAnima } from "./sections/RevenueCardByAnima";
import { SlideMenuByAnima } from "./sections/SlideMenuByAnima";
import { TransactionsTableByAnima } from "./sections/TransactionsTableByAnima";

// Action buttons data
const actionButtons = [
  { id: 1, text: "Record Transaction", left: "3.5" },
  { id: 2, text: "Create a Budget", left: "7" },
  { id: 3, text: "Record Revenue", left: "5" },
  { id: 4, text: "Add Expense", left: "31" },
  { id: 5, text: "Submit Taxes", left: "31" },
];

export const Dashboard = (): JSX.Element => {
  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full">
      <div className="bg-[#faf9ff] overflow-hidden w-[1440px] relative">
        {/* Sidebar */}
        <div className="w-[280px] h-full fixed top-0 left-[18px] bg-[#5a57ff] rounded-[0px_48px_48px_0px] z-10">
          <div className="w-[279px] h-[819px] mt-[29px] bg-[#5a57ff] rounded-[0px_16px_16px_0px]">
            <div className="pt-20 pl-[93px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl">
              LIKUTA Track
            </div>

            {/* Sidebar icons */}
            <div className="relative">
              <img
                className="absolute w-[41px] h-[37px] top-[62px] left-[68px]"
                alt="Home page"
                src="/home-page.png"
              />

              <img
                className="absolute w-8 h-[42px] top-[148px] left-[70px]"
                alt="Money bag"
                src="/money-bag-2.png"
              />

              <img
                className="absolute w-[37px] h-[60px] top-[231px] left-[70px]"
                alt="Paycheque"
                src="/paycheque.png"
              />

              <img
                className="absolute w-[54px] h-[37px] top-[335px] left-[58px]"
                alt="Brief"
                src="/brief.png"
              />

              <img
                className="absolute w-[34px] h-[34px] top-[423px] left-[71px]"
                alt="Assured workload"
                src="/assured-workload.png"
              />

              <img
                className="absolute w-[35px] h-[52px] top-[577px] left-[67px]"
                alt="Settings"
                src="/settings.png"
              />

              <img
                className="absolute w-[45px] h-[39px] top-[651px] left-[71px]"
                alt="Logout"
                src="/logout.png"
              />
            </div>

            {/* Slide menu component */}
            <SlideMenuByAnima />

            {/* Compliance menu item */}
            <div className="w-[233px] h-[72px] absolute top-[526px] left-[71px]">
              <div className="flex w-[77px] items-center gap-3.5 relative top-[19px] left-[65px]">
                <div className="relative w-fit mt-[-1.00px] mr-[-47.00px] [font-family:'Poppins',Helvetica] font-normal text-[#c2c0ff] text-xl tracking-[0] leading-[normal]">
                  Compliance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-[298px] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="font-extrabold text-[#353535] text-4xl [font-family:'Poppins',Helvetica]">
                Dashboard
              </h1>
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#cccccc] text-base">
                Welcome&nbsp;&nbsp;back, Antoine
              </p>
            </div>

            {/* Notification and profile */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-6 h-6 relative">
                  <img
                    className="absolute w-[18px] h-[18px] top-px left-[3px]"
                    alt="Vector"
                    src="/vector.svg"
                  />
                  <img
                    className="absolute w-[5px] h-[3px] top-0 left-[4.5px]"
                    alt="Vector"
                    src="/vector-1.svg"
                  />
                  <img
                    className="absolute w-2 h-1 top-[18px] left-[8px]"
                    alt="Vector"
                    src="/vector-2.svg"
                  />
                  <div className="absolute w-2 h-2 top-px left-[14px] bg-[#ff5787] rounded border border-solid border-[#faf9ff]" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="/ellipse-1.png" alt="Profile" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div className="absolute w-3 h-3 top-1 right-0 bg-[#53e88c] rounded-md border-2 border-solid border-[#faf9ff]" />
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-semibold text-black text-xl">
                    Antoine&nbsp;&nbsp;Nzanzu
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-light text-[#666668] text-sm">
                    antoinenzanzu@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-8">
            {actionButtons.map((button) => (
              <Button
                key={button.id}
                variant="outline"
                className="h-[50px] bg-white rounded-[20px] border border-solid border-gray-300 shadow-[0px_4px_4px_#00000040]"
              >
                <span
                  className={`[font-family:'Poppins',Helvetica] font-medium text-black text-xl`}
                >
                  {button.text}
                </span>
              </Button>
            ))}
          </div>

          {/* Revenue cards section */}
          <RevenueCardByAnima />

          {/* Transactions and charts section */}
          <div className="mt-6 grid grid-cols-12 gap-6 pt-[40px]">
            <div className="col-span-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#353535] text-2xl">
                  Recent Transactions
                </h2>
              </div>
              <TransactionsTableByAnima />
            </div>

            <div className="col-span-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#353535] text-2xl">
                  Revenue &amp; Expense&nbsp;&nbsp;Trends
                </h2>

                <Select>
                  <SelectTrigger className="w-36 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
                    <SelectValue
                      placeholder="Last week"
                      className="[font-family:'Poppins',Helvetica] font-medium text-[#666668] text-xs"
                    />
                  </SelectTrigger>
                </Select>
              </div>

              <Card className="w-full h-[238px] bg-white rounded-3xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
                <CardContent className="p-0">
                  <NbchartsLinechatsByAnima />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
