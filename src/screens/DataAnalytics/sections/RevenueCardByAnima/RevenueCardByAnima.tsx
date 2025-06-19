import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const RevenueCardByAnima = (): JSX.Element => {
  // Data for the cards to enable mapping
  const topCards = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$500,000",
      valueColor: "text-[#04AD3C]",
    },
    {
      id: 2,
      title: "Total Expenses",
      value: "$320,00",
      valueColor: "text-[#EB0606]",
    },
    {
      id: 3,
      title: "Net Profit/Loss",
      value: "$1800",
      valueColor: "text-[#FF8B06]",
    },
    {
      id: 4,
      title: "Cashflow Summary",
      value: "$1800",
      valueColor: "text-[#1706FF]",

    },
  ];


  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <div className="grid grid-cols-4 gap-3">
          {topCards.map((card) => (
            <Card
              key={card.id}
              className="relative h-[239px] border-0 overflow-hidden shadow-lg rounded-[20px]"
            >
 
              <CardContent className="relative z-10 p-7">
                <div className="font-medium text-base text-[#b0b0b4] font-['Poppins',Helvetica]">
                  {card.title}
                </div>

                <div
                  className={`flex items-center justify-center mt-20 font-bold text-[35px] font-['Poppins',Helvetica] ${card.valueColor}`}
                >
                  {card.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
