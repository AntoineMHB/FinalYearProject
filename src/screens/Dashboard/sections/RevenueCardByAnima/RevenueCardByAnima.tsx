import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const RevenueCardByAnima = (): JSX.Element => {
  // Data for the cards to enable mapping
  const cardData = [
    {
      title: "Total Budgets",
      value: "12",
      valueColor: "text-[#0e9cff]",
      actionText: "View Budgets",
      actionColor: "text-[#ea0505]",
      bgImage: null,
    },
    {
      title: "Revenue Overview",
      value: "$1800",
      valueColor: "text-[#03ad3c]",
      actionText: "View Details",
      actionColor: "text-[#ea0505]",
      bgImage: null,
    },
    {
      title: "Pending Tax Submissions",
      value: "3",
      valueColor: "text-[#ff7723]",
      actionText: "Submit now",
      actionColor: "text-[#ea0505]",
      bgImage: "null",
    },
    {
      title: "Compliance Alerts",
      value: "2",
      valueColor: "text-[#ea0505]",
      actionText: "Review issues",
      actionColor: "text-white",
      bgImage: "null",
    },
    {
      title: "Budget Utilization",
      value: "75%",
      valueColor: "text-black",
      actionText: "Analyse spending",
      actionColor: "text-[#ea0505]",
      bgImage: "null",
    },
  ];

  return (
    <section className="w-full pt-[20px]">
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="relative h-[152px] rounded-3xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040] overflow-hidden"
            >
              {card.bgImage && (
                <div
                  className="absolute inset-0 w-full h-full object-cover"
                  // alt="Background"
                  // src={card.bgImage}
                />
              )}
              <CardContent className="relative z-10 flex flex-col h-full p-5">
                <div className="font-medium text-[#b0b0b4] text-base font-['Poppins',Helvetica]">
                  {card.title}
                </div>
                <div
                  className={`mt-6 font-bold text-2xl font-['Poppins',Helvetica] ${card.valueColor}`}
                >
                  {card.value}
                </div>
                <div
                  className={`mt-auto font-semibold text-[11px] font-['Poppins',Helvetica] ${card.actionColor}`}
                >
                  {card.actionText}
                </div>
              </CardContent>
            </Card>

          ))}
        </div>
      </div>
    </section>
  );
};
