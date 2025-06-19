import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const TransactionsTableByAnima = (): JSX.Element => {
  // Table data for easier mapping
  const tableData = [
    {
      timestamp: "IT",
      user: "Frank MHB",
      department: "IT",
      action: "Created",
      entity: "Budget",
      status: { text: "Completed", color: "text-[#62cd81]" },
    },
    {
      timestamp: "Marketing",
      user: "Divin",
      department: "Marketing",
      action: "Updated",
      entity: "Expenses",
      status: { text: "Canceled", color: "text-[#ea0505]" },
    },
    {
      timestamp: "HR",
      user: "Benedicte",
      department: "HR",
      action: "Deleted",
      entity: "Revenuses",
      status: { text: "Pending", color: "text-[#b0b0b4]" },
    },
    {
      timestamp: "Security",
      user: "Lwanzo",
      department: "Security",
      action: "Created",
      entity: "Taxes",
      status: { text: "Completed", color: "text-[#62cd81]" },
    },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-solid border-[#0000006e]">
      <Table>
        <TableHeader className="bg-[#d9d9d9]">
          <TableRow className="border-b border-[#818181]">
            <TableHead className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Timestamp
            </TableHead>
            <TableHead className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              User
            </TableHead>
            <TableHead className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Department
            </TableHead>
            <TableHead className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Action
            </TableHead>
            <TableHead className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Entity
            </TableHead>
            <TableHead className="[font-family:'Poppins',Helvetica] font-medium text-black text-sm">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              className="bg-white border-b border-[#818181]"
            >
              <TableCell className="[font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.timestamp}
              </TableCell>
              <TableCell className="[font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.user}
              </TableCell>
              <TableCell className="[font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.department}
              </TableCell>
              <TableCell className="[font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.action}
              </TableCell>
              <TableCell className="[font-family:'Poppins',Helvetica] font-medium text-[#818181] text-sm">
                {row.entity}
              </TableCell>
              <TableCell
                className={`[font-family:'Poppins',Helvetica] font-medium ${row.status.color} text-sm`}
              >
                {row.status.text}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
