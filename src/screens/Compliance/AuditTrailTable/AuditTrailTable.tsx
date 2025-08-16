import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Papa from "papaparse";
import { Button } from "../../../components/ui/button";
import { DownloadIcon } from "lucide-react";

type AuditLog = {
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  description: string;
};

export const AuditTrailTable = (): JSX.Element => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/audit-logs"
        );
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const downloadCSV = () => {
    const csv = Papa.unparse(logs);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "audit_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full p-4">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={downloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow flex items-center space-x-2"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Download CSV</span>
        </Button>
      </div>

      {/* Scrollable Table */}
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl shadow-sm">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-100 sticky top-0 z-10">
            <TableRow>
              <TableHead className="text-left px-4 py-2">Time</TableHead>
              <TableHead className="text-left px-4 py-2">User</TableHead>
              <TableHead className="text-left px-4 py-2">Action</TableHead>
              <TableHead className="text-left px-4 py-2">Entity</TableHead>
              <TableHead className="text-left px-4 py-2">Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  Loading logs...
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No audit logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, idx) => (
                <TableRow
                  key={idx}
                  className={
                    idx % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100 transition-colors"
                  }
                >
                  <TableCell className="px-4 py-2">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-2">{log.user}</TableCell>
                  <TableCell className="px-4 py-2">{log.action}</TableCell>
                  <TableCell className="px-4 py-2">{log.entity}</TableCell>
                  <TableCell className="px-4 py-2">{log.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
