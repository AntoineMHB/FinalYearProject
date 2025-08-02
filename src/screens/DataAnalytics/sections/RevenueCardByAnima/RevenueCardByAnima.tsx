import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import axios from "axios";

export const RevenueCardByAnima = (): JSX.Element => {
  const [revenuesAmount, setRevenuesAmount] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userJson = localStorage.getItem("user");
        const departmentJson = localStorage.getItem("department");

        if (!userJson || !departmentJson) {
          console.warn("Missing user or department info");
          return;
        }

        const user = JSON.parse(userJson);
        const department = JSON.parse(departmentJson);
        const userEmail = user.email;

        const isManager = userEmail?.endsWith("@gmail.com"); // assuming same logic
        let matchedDepartment = "";

        if (userEmail?.startsWith("IT")) matchedDepartment = "IT";
        else if (userEmail?.startsWith("HR")) matchedDepartment = "HR";
        else if (userEmail?.startsWith("COM")) matchedDepartment = "COM";
        else if (userEmail?.startsWith("Research")) matchedDepartment = "Research";

        // Fetch Revenues
        if (isManager) {
          const res = await axios.get( `http://localhost:8080/api/revenues/total-revenue-by-dpt/${department.id}`);
          setRevenuesAmount(res.data);
        } else {
          const res = await axios.get(`http://localhost:8080/api/revenues/total-amount`);
          setRevenuesAmount(res.data);
        }

        // Fetch Expenses
        if (isManager) {
          const res = await axios.get(`http://localhost:8080/api/expenses/total-expense-by-dpt/${department.id}`);
          setExpensesAmount(res.data);
        } else {
          const res = await axios.get(`http://localhost:8080/api/expenses/total-expense`);
          setExpensesAmount(res.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const netCashflow = revenuesAmount - expensesAmount;

  const topCards = [
    {
      id: 1,
      title: "Total Revenue",
      value: `$ ${revenuesAmount.toLocaleString(undefined, { minimumFractionDigits: 1 })}`,
      valueColor: "text-[#04AD3C]",
    },
    {
      id: 2,
      title: "Total Expenses",
      value: `$ ${expensesAmount.toLocaleString(undefined, { minimumFractionDigits: 1 })}`,
      valueColor: "text-[#EB0606]",
    },
    {
      id: 3,
      title: netCashflow >= 0 ? "Net Profit" : "Net Loss",
      value: `$ ${Math.abs(netCashflow).toLocaleString(undefined, { minimumFractionDigits: 1 })}`,
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
                  className={`flex items-center justify-center mt-20 font-bold font-['Poppins',Helvetica] ${
                    card.title === "Cashflow Summary" ? "text-[20px]" : "text-[35px]"
                  } ${card.valueColor}`}
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
