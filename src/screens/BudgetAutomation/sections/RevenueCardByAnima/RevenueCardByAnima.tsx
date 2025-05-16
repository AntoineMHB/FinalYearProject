import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";

export const RevenueCardByAnima = (): JSX.Element => {
  // Data for first three cards
  const cardData = [
    {
      title: "Total Budget Amount",
      value: "$500,000",
      valueColor: "text-[#04AD3C]",

    },
    {
      title: "Spent Budget",
      value: "$320,00",
      valueColor: "text-[#EB0606]",

    },
    {
      title: "Remaining Budget",
      value: "$1800",
      valueColor: "text-[#FF8B06]",

    },
  ]

  // Data for category breakdown
  const categoryData = [
    { name: "IT", percentage: 40 },
    { name: "Marketing", percentage: 50 },
  ];

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-4 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {/* First three budget cards */}
        {cardData.map((card, index) => (
          <Card key={index} className="relative overflow-hidden border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
            <div
              className="w-full h-[239px] object-cover"
              // alt={`${item.title} background`}
              // src={item.image}
            />
            <CardContent className="absolute top-6 left-6">
              <h3 className="font-medium text-base text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a]">
                {card.title}
              </h3>

              <div
                  className={`mt-6 font-bold text-2xl font-['Poppins',Helvetica] ${card.valueColor}`}
                >
                  {card.value}
                </div>
            </CardContent>
          </Card>
        ))}

        {/* Budget Projection card */}
        <Card className="relative overflow-hidden border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
          
          <CardContent className="absolute top-6 left-6 w-full pr-6">
            <h3 className="font-medium text-base text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a] mb-[79px]">
              Budget Projection
            </h3>

            <div className="space-y-4">
              <h4 className="font-medium text-sm text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a]">
                Category Breakdown
              </h4>

              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a]">
                    {category.name}
                  </span>
                  <Progress
                    value={category.percentage}
                    className="w-[60%] h-1 bg-gray-700"
                  />
                  <span className="font-medium text-sm text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a]">
                    {category.percentage}%
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 left-0">
              <Button
                variant="link"
                className="font-semibold text-[11px] text-white font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a]"
              >
                Review issues
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
