import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const TransactionsTableByAnima = (): JSX.Element => {
  // Define transaction data for easier mapping
  const transactions = [
    {
      date: "07/10/2024",
      description: "Taxes October",
      amount: "$450",
      status: "Completed",
      statusColor: "text-[#62cd81]",
    },
    {
      date: "02/03/2025",
      description: "Buying supplies",
      amount: "$385",
      status: "Canceled",
      statusColor: "text-[#ea0505]",
    },
    {
      date: "09/01/2025",
      description: "Salaries",
      amount: "$500",
      status: "Pending",
      statusColor: "text-[#b0b0b4]",
    },
    {
      date: "10/11/2024",
      description: "Taxes November",
      amount: "$200",
      status: "Completed",
      statusColor: "text-[#62cd81]",
    },
  ];

  return (
    <Card className="w-full rounded-xl border border-solid border-[#0000006e] overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#d9d9d9]">
              <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
                Date
              </TableHead>
              <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
                Description
              </TableHead>
              <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
                Amount
              </TableHead>
              <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={index}
                className="bg-white border-b [border-bottom-style:solid] border-[#818181]"
              >
                <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                  {transaction.date}
                </TableCell>
                <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                  {transaction.description}
                </TableCell>
                <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                  {transaction.amount}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <span
                    className={`[font-family:'Poppins',Helvetica] font-medium text-sm ${transaction.statusColor}`}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
