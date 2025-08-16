import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type Expense = { amount: number };
type Revenue = { amount: number };

export default function ProfitAndLossStatement() {
  const [chartData, setChartData] = useState<any>(null);
  const [totals, setTotals] = useState<{
    revenues: number;
    expenses: number;
    net: number;
  } | null>(null);

  useEffect(() => {
    const fetchTotals = async () => {
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

        const isManager = userEmail?.endsWith("@gmail.com"); // example check

        let totalExpenses = 0;
        let totalRevenues = 0;

        if (isManager) {
          const [expensesRes, revenuesRes] = await Promise.all([
            axios.get(
              `http://localhost:8080/api/expenses/total-expense-by-dpt/${department.id}`
            ),
            axios.get(
              `http://localhost:8080/api/revenues/total-revenue-by-dpt/${department.id}`
            ),
          ]);

          totalExpenses =
            typeof expensesRes.data === "number" ? expensesRes.data : 0;
          totalRevenues =
            typeof revenuesRes.data === "number" ? revenuesRes.data : 0;
        } else {
          const [expensesRes, revenuesRes] = await Promise.all([
            axios.get("http://localhost:8080/api/expenses/total-expense"),
            axios.get("http://localhost:8080/api/revenues/total-revenue"),
          ]);

          const expensesData: Expense[] = expensesRes.data;
          const revenuesData: Revenue[] = revenuesRes.data;

          console.log("ExpensesRes:", expensesRes.data);
          console.log("RevenuesRes:", revenuesRes.data);

          totalExpenses = expensesData.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
          );
          totalRevenues = revenuesData.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
          );
        }

        const net = totalRevenues - totalExpenses;

        const labels = ["Revenue", "Expenses"];
        const values = [totalRevenues, totalExpenses];
        const colors = ["#4CAF50", "#F44336"];

        if (net !== 0) {
          labels.push(net > 0 ? "Profit" : "Loss");
          values.push(Math.abs(net));
          colors.push("#2196F3");
        }

        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              borderWidth: 1,
            },
          ],
        });

        setTotals({
          revenues: totalRevenues,
          expenses: totalExpenses,
          net,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotals();
  }, []);

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value: number, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc: number, val: any) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full flex flex-row items-center">
      {chartData ? (
        <>
          <div className="w-full h-[150px]">
            <Doughnut data={chartData} options={options} />
          </div>
          {totals && (
            <div className="mt-4 text-sm text-center text-gray-700">
              <p className="text-green-600">
                <strong>Total Revenue:</strong> ${totals.revenues.toFixed(2)}
              </p>
              <p className="text-red-600">
                <strong>Total Expenses:</strong> ${totals.expenses.toFixed(2)}
              </p>
              <p>
                <strong>{totals.net >= 0 ? "Profit" : "Loss"}:</strong>{" "}
                <span
                  className={
                    totals.net >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  ${Math.abs(totals.net).toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Loading chart...</p>
      )}
    </div>
  );
}
