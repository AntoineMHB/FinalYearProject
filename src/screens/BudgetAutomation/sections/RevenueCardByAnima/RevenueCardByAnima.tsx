import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";

export const RevenueCardByAnima = (): JSX.Element => {
  // Data for budget cards
  const budgetData = [
    {
      title: "Total Budget Amount",
      image: "/rectangle-20.svg",
    },
    {
      title: "Spent Budget",
      image: "/rectangle-21.svg",
    },
    {
      title: "Remaining Budget",
      image: "/rectangle-22.svg",
    },
  ];

  // Data for category breakdown
  const categoryData = [
    { name: "IT", percentage: 40 },
    { name: "Marketing", percentage: 50 },
  ];

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-4 gap-2">
        {/* First three budget cards */}
        {budgetData.map((item, index) => (
          <Card key={index} className="relative overflow-hidden border-0">
            <img
              className="w-full h-[239px] object-cover"
              alt={`${item.title} background`}
              src={item.image}
            />
            <CardContent className="absolute top-6 left-6">
              <h3 className="font-medium text-base text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a]">
                {item.title}
              </h3>
            </CardContent>
          </Card>
        ))}

        {/* Budget Projection card */}
        <Card className="relative overflow-hidden border-0">
          <img
            className="w-full h-[239px] object-cover"
            alt="Budget Projection background"
            src="/rectangle-23.svg"
          />
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
