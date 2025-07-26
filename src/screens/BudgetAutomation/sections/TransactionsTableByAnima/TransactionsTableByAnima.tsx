import React, { useEffect, useState } from "react";
import { Card } from "../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import axios from "axios";

type DepartmentSummary = {
  department: string;
  allocated: number;
  spent: number;
  remaining: number;
};

export const TransactionsTableByAnima = (): JSX.Element => {
    const [departmentData, setDepartmentData] = useState<DepartmentSummary[]>([]);
  // Table data for departments

  useEffect(() => {
    axios.get("http://localhost:8080/api/departments/budget-summary")
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching department summary:", error);
      });
  }, []);
  

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
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#04AD3C] text-sm">
                ${row.allocated.toLocaleString()}
              </TableCell>
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#EB0606] text-sm">
                ${row.spent.toLocaleString()}
              </TableCell>
              <TableCell className="px-6 py-3 [font-family:'Poppins',Helvetica] font-medium text-[#FF8B06] text-sm">
                ${row.remaining.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
