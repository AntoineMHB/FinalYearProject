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
    const fetchExpenses = axios.get("http://localhost:8080/api/expenses");
    const fetchRevenues = axios.get("http://localhost:8080/api/revenues");

    Promise.all([fetchExpenses, fetchRevenues])
      .then(([expensesRes, revenuesRes]) => {
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

        // Combine and sort by date (most recent first)
        const allTransactions = [...expenses, ...revenues].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTransactions(allTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <Card className="w-full rounded-xl border border-solid border-[#0000006e] overflow-hidden">
      <CardContent className="p-0">
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
              <TableRow key={`${tx.type}-${tx.id}`} className="bg-white border-b border-[#818181]">
                <TableCell className="px-6 py-3 font-medium text-[#818181] text-sm">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className={`px-6 py-3 font-medium text-sm ${
                  tx.type === "EXPENSE" ? "text-[#EB0606]" : "text-[#04AD3C]"}`}>
                  {tx.type}
                </TableCell>
                <TableCell className="px-6 py-3 font-medium text-[#818181] text-sm">
                  {tx.description}
                </TableCell>
                <TableCell className={`px-6 py-3 font-medium text-sm ${
                  tx.type === "EXPENSE" ? "text-[#EB0606]" : "text-[#04AD3C]"}`}>
                  ${tx.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
