import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "react-toastify";

interface Budget {
  id: number;
  name: string;
  amount: number;
  status: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
  };
}

export const PendingBudgetsPage = () => {
  const [pendingBudgets, setPendingBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/budgets/pending");
      setPendingBudgets(res.data);
    } catch (error) {
      console.error("Failed to fetch pending budgets", error);
    }
  };

  const handleAction = async (budgetId: number, action: "approve" | "reject") => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:8080/api/budgets/${budgetId}/${action}`);
      toast.success(`Budget ${action}ed successfully.`);
      fetchPendingBudgets();
    } catch (err) {
      console.error(`Failed to ${action} budget`, err);
      toast.error(`Failed to ${action} budget.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBudgets();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pending Budgets</h1>
      {pendingBudgets.length === 0 ? (
        <p className="text-gray-500">No pending budgets at the moment.</p>
      ) : (
        pendingBudgets.map((budget) => (
          <Card key={budget.id}>
            <CardHeader>
              <CardTitle>{budget.name} — ${budget.amount}</CardTitle>
              <p className="text-sm text-gray-600">Requested by {budget.user.firstname} {budget.user.lastname} ({budget.user.email})</p>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button
                onClick={() => handleAction(budget.id, "approve")}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleAction(budget.id, "reject")}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                Reject
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
