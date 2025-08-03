import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  description: string;
  createdAt: string;
  type: "REVENUE" | "EXPENSE";
}

export const TransactionsTableByAnimaAdmin = (): JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Get user and department info from localStorage
        const userJson = localStorage.getItem("user");
        const departmentJson = localStorage.getItem("department");

        if (!userJson || !departmentJson) {
          console.warn("Missing user or department info in localStorage");
          return;
        }

        const user = JSON.parse(userJson);
        const department = JSON.parse(departmentJson);

        // Manager check by email domain (same as your chart component)
        const isManager = user.email?.endsWith("@gmail.com");

        // Use filtered URLs if manager, otherwise fetch all
        const expensesUrl = isManager
          ? `http://localhost:8080/api/expenses/by-department/${department.id}`
          : "http://localhost:8080/api/expenses";

        const revenuesUrl = isManager
          ? `http://localhost:8080/api/revenues/by-department/${department.id}`
          : "http://localhost:8080/api/revenues";

        const [expensesRes, revenuesRes] = await Promise.all([
          axios.get(expensesUrl),
          axios.get(revenuesUrl),
        ]);

        const expenses: Transaction[] = expensesRes.data.map((expense: any) => ({
          id: expense.id,
          name: expense.expenseName,
          amount: expense.amount,
          description: expense.description,
          createdAt: expense.createdAt,
          type: "EXPENSE",
        }));

        const revenues: Transaction[] = revenuesRes.data.map((revenue: any) => ({
          id: revenue.id,
          name: revenue.revenueName,
          amount: revenue.amount,
          description: revenue.description,
          createdAt: revenue.createdAt,
          type: "REVENUE",
        }));

        const allTransactions = [...expenses, ...revenues].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTransactions(allTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Card className="w-full rounded-xl border border-solid border-[#0000006e] overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[238px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#d9d9d9]">
                <TableHead className="px-6 py-3 font-medium text-black text-sm">Date</TableHead>
                <TableHead className="px-6 py-3 font-medium text-black text-sm">Type</TableHead>
                <TableHead className="px-6 py-3 font-medium text-black text-sm">Description</TableHead>
                <TableHead className="px-6 py-3 font-medium text-black text-sm">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={`${tx.type}-${tx.id}`}
                  className="bg-white border-b border-[#818181]"
                >
                  <TableCell className="px-6 py-3 font-medium text-[#818181] text-sm">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    className={`px-6 py-3 font-medium text-sm ${
                      tx.type === "EXPENSE" ? "text-[#EB0606]" : "text-[#04AD3C]"
                    }`}
                  >
                    {tx.type}
                  </TableCell>
                  <TableCell className="px-6 py-3 font-medium text-[#818181] text-sm">
                    {tx.description}
                  </TableCell>
                  <TableCell
                    className={`px-6 py-3 font-medium text-sm ${
                      tx.type === "EXPENSE" ? "text-[#EB0606]" : "text-[#04AD3C]"
                    }`}
                  >
                    ${tx.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
