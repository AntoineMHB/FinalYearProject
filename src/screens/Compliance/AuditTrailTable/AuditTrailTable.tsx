import axios from "axios";
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import Papa from "papaparse";
import { Button } from "../../../components/ui/button";
import { DownloadIcon } from "lucide-react";

type AuditLog = {
  timestamp: string;     // or Date if you're parsing it
  user: string;
  action: string;
  entity: string;
  description: string;
};


export const AuditTrailTable = (): JSX.Element => {
    const [logs, setLogs] = useState<AuditLog[]>([]);

    useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/audit-logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      }
    };
    fetchLogs();
  }, []);

   const downloadCSV = () => {
    const csv = Papa.unparse(logs);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "audit_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   };

    return (
     <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          onClick={downloadCSV}
          className=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow"
        >
          <DownloadIcon className="mr-4 w-[38px] h-[38px]" />
          Download CSV
        </Button>
      </div>
    <div className="w-full rounded-xl overflow-hidden border border-solid border-[#0000006e]">
      <Table>
        <TableHeader className="bg-[#d9d9d9]">
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, idx) => (
            <TableRow key={idx}>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.entity}</TableCell>
              <TableCell>{log.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};

