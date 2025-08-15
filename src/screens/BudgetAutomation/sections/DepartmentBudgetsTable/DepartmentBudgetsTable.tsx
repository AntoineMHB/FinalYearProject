import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Budget {
  id: number;
  budgetName: string;
  amount: number;
  description: string;
  departmentId: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
}

const DepartmentBudgetsTable: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userJson = localStorage.getItem("user");
      const departmentJson = localStorage.getItem("department");

      if (!token || !userJson || !departmentJson) {
        console.warn("Missing token, user, or department in localStorage.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userJson);
      const department = JSON.parse(departmentJson);
      const userEmail = user.email;

      let matchedDepartmentName: string | null = null;
      if (userEmail?.startsWith("IT")) {
        matchedDepartmentName = "IT";
      } else if (userEmail?.startsWith("HR")) {
        matchedDepartmentName = "HR";
      } else if (userEmail?.startsWith("COM")) {
        matchedDepartmentName = "COM";
      } else if (userEmail?.startsWith("Research")) {
        matchedDepartmentName = "Research";
      }

      try {
        const deptResponse = await axios.get(
          "http://localhost:8080/api/departments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allDepartments = deptResponse.data;
        const matchedDepartment = allDepartments.find(
          (dept: any) => dept.name === matchedDepartmentName
        );

        if (!matchedDepartment) {
          console.warn("No matching department found for the user.");
          setLoading(false);
          return;
        }

        const budgetsResponse = await axios.get(
          "http://localhost:8080/api/budgets",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allBudgets: Budget[] = budgetsResponse.data;
        const filteredBudgets = allBudgets.filter(
          (budget) => budget.departmentId === matchedDepartment.id
        );

        setBudgets(filteredBudgets);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-6 h-6 animate-spin text-[#5a57ff]" />
        <span className="ml-2">Loading budgets...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      {budgets.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#5a57ff] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Budget Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Allocated Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {budget.budgetName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  ${budget.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {budget.createdAt
                    ? new Date(budget.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {budget.description || "No description"}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      budget.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : budget.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {budget.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center p-4 text-gray-500">
          No budgets found for your department.
        </p>
      )}
    </div>
  );
};

export default DepartmentBudgetsTable;
