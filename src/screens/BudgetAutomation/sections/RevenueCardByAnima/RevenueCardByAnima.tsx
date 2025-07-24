import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import { Badge } from "../../../../components/ui/badge";
import axios from "axios";

export const RevenueCardByAnima = (): JSX.Element => {
      const [budgetsAmount, setBudgetsAmount] = useState(0);
      const [expensesAmount, setExpensesAmount] = useState(0);

          useEffect(() => {
            const fetchBudgetsAmount = async () => {
              try {
                const response = await axios.get("http://localhost:8080/api/budgets/total-budget");
                setBudgetsAmount(response.data);
                console.log(response.data);
              } catch (error) {
                console.error("Error fetching budgets amount:", error);
              }
            };
            fetchBudgetsAmount();
          }, []);

              useEffect(() => {
                      const fetchExpensesAmount = async () => {
                        try {
                          const response = await axios.get("http://localhost:8080/api/expenses/total-expense");
                          setExpensesAmount(response.data);
                          console.log(response.data);
                        } catch (error) {
                          console.error("Error fetching expenses amount:", error);
                        }
                      };
                      fetchExpensesAmount();
              }, []);

                const remainingBudget = budgetsAmount - expensesAmount;
          
  // Data for first three cards
  const cardData = [
    {
      title: "Total Budget Amount",
      value: `$ ${budgetsAmount}`,
      valueColor: "text-[#04AD3C]",

    },
    {
      title: "Spent Budget",
      value: `$ ${expensesAmount}`,
      valueColor: "text-[#EB0606]",

    },
    {
      title: "Remaining Budget",
      value: `$ ${remainingBudget}`,
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
      <div className="grid  gap-1 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1">
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
                  className={`mt-20 font-bold text-[35px] font-['Poppins',Helvetica] ${card.valueColor}`}
                >
                  {card.value}
                </div>
            </CardContent>
          </Card>
        ))}

        {/* Budget Projection card */}
        <Card className="relative overflow-hidden border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040] w-[260px]">
          <CardTitle className="absolute top-6 left-6 w-full pr-6">
            <h3 className="font-medium text-base text-[#b0b0b4] font-['Poppins',Helvetica] [-webkit-text-stroke:1px_#d1fae51a] mb-[79px]">
              Budget Projection
            </h3>

          </CardTitle>
          <CardContent className="absolute top-14 left-[-5px] w-full pr-6">
            
            <div className="flex items-center justify-between space-x-1">
              <div className="pt-[-20px] font-bold text-black text-[35px] [font-family:'Poppins',Helvetica]">
                $700,000
               </div>

              <Badge className="bg-emerald-100 text-green-600 rounded-[20px] px-4 py-1">
                25.0%
              </Badge>

            </div>


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
