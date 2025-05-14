import React from "react";
import { Card } from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const TransactionsTableByAnima = (): JSX.Element => {
  // Table data for departments
  const departmentData = [
    {
      department: "IT",
      allocated: "$500,000",
      spent: "$200,000",
      remaining: "$300,000",
      status: "Completed",
      statusColor: "text-[#62cd81]",
    },
    {
      department: "Marketing",
      allocated: "$600,000",
      spent: "$300,000",
      remaining: "$300,000",
      status: "Canceled",
      statusColor: "text-[#ea0505]",
    },
    {
      department: "HR",
      allocated: "$900,000",
      spent: "$900,000",
      remaining: "$0",
      status: "Pending",
      statusColor: "text-[#b0b0b4]",
    },
    {
      department: "Security",
      allocated: "$400,000",
      spent: "$300,000",
      remaining: "$100,000",
      status: "Completed",
      statusColor: "text-[#62cd81]",
    },
  ];

  return (
    <Card className="w-full rounded-xl overflow-hidden border border-solid border-[#0000006e]">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#d9d9d9]">
            <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Department
            </TableHead>
            <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Allocated
            </TableHead>
            <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Spent
            </TableHead>
            <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Remaining
            </TableHead>
            <TableHead className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentData.map((row, index) => (
            <TableRow
              key={index}
              className="bg-white border-b [border-bottom-style:solid] border-[#818181]"
            >
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.department}
              </TableCell>
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.allocated}
              </TableCell>
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.spent}
              </TableCell>
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.remaining}
              </TableCell>
              <TableCell
                className={`px-6 py-3 [font-family:'Poppins',Helvetica] font-medium ${row.statusColor} text-sm`}
              >
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
