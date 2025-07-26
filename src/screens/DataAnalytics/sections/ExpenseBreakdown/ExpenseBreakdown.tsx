import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Card, CardContent } from "../../../../components/ui/card";

type Expense = {
  amount: number;
  createdAt: string;
};

export default function ExpenseBreakdown() {
    const [expenseData, setExpenseData] = useState<{ date: string; amount: number }[]>([]);
    
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/expenses");
                const data: Expense[] = res.data;

                const grouped = data.reduce((acc: Record<string, number>, expense) => {
                    const dateKey = format(new Date(expense.createdAt), "yyyy-MM-dd");
                    acc[dateKey] = (acc[dateKey] || 0) + expense.amount;
                    return acc;
                }, {});

                const sorted = Object.entries(grouped)
                  .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                  .map(([date, amount]) => ({ date, amount }));

                setExpenseData(sorted);
            } catch (err) {
                console.error("Error fetching expenses:", err);
            }
        };
         fetchExpenses();
    }, []);

    const maxAmount = Math.max(...expenseData.map((e) => e.amount), 1);

    const chartBars = expenseData.map((e) => {
        const heightPercent = (e.amount / maxAmount) * 100;
        return {
            date: e.date,
            height: `${heightPercent}%`,
            top: `${100 - heightPercent}%`,
        };
    });

    return (
    <Card className="w-full max-w-[600px] h-[230px] border border-[#5a57ff1a] rounded-3xl shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-['Poppins',Helvetica] font-medium text-[#b0b0b4] text-base">
          Expense Breakdown (by Day)
        </h3>
        <div className="flex items-end h-[140px] mt-4 overflow-x-auto gap-2">
          {chartBars.map((bar, index) => (
            <div key={index} className="relative w-10 h-full text-center">
              <div className="absolute w-[31px] h-full top-0 left-px bg-[#faf9ff] rounded-[34px] border border-solid border-[#5a57ff1a]" />

              {/* Custom Tooltip */}
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                ${expenseData[index].amount.toFixed(2)}
              </div>

              <div
                className="absolute w-8 rounded-[34px]"
                style={{ 
                    height: bar.height, 
                    top: bar.top,
                    backgroundColor: "#EB0606"
                 }}
                 title={`$${expenseData[index].amount.toFixed(2)}`}
              />
              <div className="absolute -bottom-5 w-full text-[10px] text-gray-500 truncate">
                {bar.date.slice(5)} {/* shows MM-DD */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    )
}