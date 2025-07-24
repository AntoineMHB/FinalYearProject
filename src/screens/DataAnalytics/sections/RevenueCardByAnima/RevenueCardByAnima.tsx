import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import axios from "axios";

export const RevenueCardByAnima = (): JSX.Element => {
        const [revenuesAmount, setRevenuesAmount] = useState(0);
        const [expensesAmount, setExpensesAmount] = useState(0);
  
            useEffect(() => {
              const fetchRevenuesAmount = async () => {
                try {
                  const response = await axios.get("http://localhost:8080/api/revenues/total-amount");
                  setRevenuesAmount(response.data);
                  console.log(response.data);
                } catch (error) {
                  console.error("Error fetching revenues amount:", error);
                }
              };
              fetchRevenuesAmount();
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

                const netCashflow = revenuesAmount - expensesAmount;
                
  // Data for the cards to enable mapping

  const topCards = [
    {
      id: 1,
      title: "Total Revenue",
      value: `$ ${revenuesAmount}`,
      valueColor: "text-[#04AD3C]",
    },
    {
      id: 2,
      title: "Total Expenses",
      value: `$ ${expensesAmount}`,
      valueColor: "text-[#EB0606]",
    },
    {
      id: 3,
      title: netCashflow >= 0 ? "Net Profit" : "Net Loss",
      value: `$ ${Math.abs(netCashflow)}`,
      valueColor: netCashflow >= 0 ? "text-green-600" : "text-red-500",
    },
    {
      id: 4,
      title: "Cashflow Summary",
      value: `${netCashflow >= 0 ? "Positive" : "Negative"} Cashflow`,
      valueColor: netCashflow >= 0 ? "text-[#FF8B06]" : "text-red-600",

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
                  className={`flex items-center justify-center mt-20 font-bold font-['Poppins',Helvetica] ${card.title === "Cashflow Summary" ? "text-[20px]" : "text-[35px]"} ${card.valueColor}`}
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
