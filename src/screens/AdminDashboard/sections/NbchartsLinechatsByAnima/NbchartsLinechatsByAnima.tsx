import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardTitle } from "../../../../components/ui/card";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Expense {
  id: number;
  expenseName: string;
  amount: number;
  createdAt: string;
}

interface Revenue {
  id: number;
  revenueName: string;
  amount: number;
  createdAt: string;
}

export const NbchartsLinechatsByAnima = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [expensesRes, revenuesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/expenses"),
          axios.get("http://localhost:8080/api/revenues"),
        ]);

        const expenses = expensesRes.data
          .filter((expense: Expense) => expense.createdAt)
          .map((expense: Expense) => ({
            date: expense.createdAt.split("T")[0],
            amount: expense.amount,
          }));

        const revenues = revenuesRes.data
          .filter((revenue: Revenue) => revenue.createdAt)
          .map((revenue: Revenue) => ({
            date: revenue.createdAt.split("T")[0],
            amount: revenue.amount,
          }));

        const groupByDate = (arr: any[]) => {
          const map = new Map<string, number>();
          arr.forEach(({ date, amount }) => {
            map.set(date, (map.get(date) || 0) + amount);
          });
          return Array.from(map.entries())
            .map(([x, y]) => ({ x, y }))
            .sort((a, b) => a.x.localeCompare(b.x));
        };

        const groupedExpenses = groupByDate(expenses);
        const groupedRevenues = groupByDate(revenues);

        const labels = Array.from(
          new Set([
            ...groupedExpenses.map((item) => item.x),
            ...groupedRevenues.map((item) => item.x),
          ])
        ).sort();

        const getAmounts = (data: { x: string; y: number }[]) => {
          const map = new Map(data.map((d) => [d.x, d.y]));
          return labels.map((label) => map.get(label) || 0);
        };

        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue",
              data: getAmounts(groupedRevenues),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Expense",
              data: getAmounts(groupedExpenses),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenues vs Expenses Over Time",
      },
    },
  };

  return (
    <div className="w-full pl-[15px]">
      
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>Loading chart...</p>
        )}
      
    </div>
  );
};
