import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { XIcon, DollarSign, FileText, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type AddExpenseFormProps = {
  onExpenseAdded: (data: any | null) => void;
  onClose: () => void;
};

interface Budget {
  id: number
  budgetName: string,
  amount: number,
  description: string,
  user: {
    user_id: number
  },
  department: {
    "id": number
  }
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ 
  onExpenseAdded, 
  onClose 
}) => {
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string>("");

      useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
          axios.get("http://localhost:8080/api/budgets", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setBudgets(response.data);
          })
          .catch((error) => {
            console.error("Error fetching departments:", error);
          });
        } else {
          console.error("No token found in localStorage");
        }
      }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData.userId;

      if (!userId) {
        throw new Error("User ID not found. Please log in.");
      }

      const response = await axios.post("http://localhost:8080/api/expenses", {
        expenseName,
        amount: expenseAmount,
        description,
        user: { id: userId },
        budget: { id: selectedBudgetId },
      });

      onExpenseAdded(response.data);
      resetForm();
    } catch (error: any) {
      console.error("Error adding revenue:", error.response || error.message || error);
      alert(
        error.response?.data?.message ||
        "An error occurred while adding the revenue. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setExpenseName("");
    setExpenseAmount("");
    setDescription("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
    onExpenseAdded(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-[#5a57ff] to-[#7c79ff] text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-poppins font-bold">
                Add New Expense
              </CardTitle>
              <CardDescription className="text-white/90 mt-2">
                Record a new expense source to keep track of your finances
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-200 hover:bg-white/20 h-8 w-8"
              onClick={handleCancel}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Expense Name */}
            <div className="space-y-3">
              <Label
                htmlFor="revenue-name"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-[#5a57ff]" />
                Expense Name
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="e.g., Sales, Donations, Services"
                id="expense-name"
                className="h-11"
                required
              />
            </div>

            {/* Expense Amount */}
            <div className="space-y-3">
              <Label
                htmlFor="expense-amount"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4 text-[#5a57ff]" />
                Expense Amount
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="expense-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="1000.00"
                  className="h-11 pl-10"
                  required
                />
              </div>
            </div>

            {/* Expense Description */}
            <div className="space-y-3">
              <Label
                htmlFor="revenue-description"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-[#5a57ff]" />
                Expense Description
                <span className="text-gray-400 text-xs">(Optional)</span>
              </Label>
              <Textarea
                id="expense-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the source or details of this expense..."
                className="min-h-[100px] resize-none"
              />
            </div>
                        <Select value={selectedBudgetId} onValueChange={(value) => setSelectedBudgetId(value)}>
                          <SelectTrigger className="w-80 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-md">
                            <SelectValue placeholder="Budget" />
                          </SelectTrigger>
                          <SelectContent>
                             {budgets.map((budget) => (
                                <SelectItem key={budget.id} value={budget.id.toString()}>
                                  {budget.budgetName}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-11"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 h-11 bg-[#5a57ff] hover:bg-[#4845ff]"
            onClick={handleSubmit}
            disabled={isSubmitting || !expenseName.trim() || !expenseAmount.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Revenue...
              </div>
            ) : (
              'Add Revenue'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddExpenseForm;
