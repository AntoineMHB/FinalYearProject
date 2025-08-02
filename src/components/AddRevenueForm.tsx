import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { XIcon, DollarSign, FileText, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type AddRevenueFormProps = {
  onRevenueAdded: (data: any | null) => void;
  onClose: () => void;
};



interface Department {
  id: number;
  name: string;
  user: {
    id: number;
  };
}


const AddRevenueForm: React.FC<AddRevenueFormProps> = ({ 
  onRevenueAdded, 
  onClose 
}) => {
  const [revenueName, setRevenueName] = useState<string>("");
  const [revenueAmount, setRevenueAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");

useEffect(() => {
  const fetchDepartments = async () => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    const departmentJson = localStorage.getItem("department");

    if (!token || !userJson || !departmentJson) {
      console.warn("Missing token, user or department in localStorage.");
      return;
    }

    const user = JSON.parse(userJson);
    const department = JSON.parse(departmentJson);
    const userEmail = user.email;

    // Match department based on email prefix
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
      const response = await axios.get("http://localhost:8080/api/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allDepartments: Department[] = response.data;

      // Filter only department matching the manager
      const matched = allDepartments.filter(
        (dept) => dept.name === matchedDepartmentName
      );

      setDepartments(matched);

      // Optionally preselect the department
      if (matched.length === 1) {
        setSelectedDepartmentId(matched[0].id.toString());
      }

    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  fetchDepartments();
}, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData.userId;
      const token = localStorage.getItem("token");

      if (!userId) {
        throw new Error("User ID not found. Please log in.");
      }

      const response = await axios.post("http://localhost:8080/api/revenues", {
        revenueName,
        amount: revenueAmount,
        description,
        user: { id: userId },
        department: { id: selectedDepartmentId },
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      onRevenueAdded(response.data);
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
    setRevenueName("");
    setRevenueAmount("");
    setDescription("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
    onRevenueAdded(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-[#5a57ff] to-[#7c79ff] text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-poppins font-bold">
                Add New Revenue
              </CardTitle>
              <CardDescription className="text-white/90 mt-2">
                Record a new revenue source to keep track of your income
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
            {/* Revenue Name */}
            <div className="space-y-3">
              <Label
                htmlFor="revenue-name"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-[#5a57ff]" />
                Revenue Name
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={revenueName}
                onChange={(e) => setRevenueName(e.target.value)}
                placeholder="e.g., Sales, Donations, Services"
                id="revenue-name"
                className="h-11"
                required
              />
            </div>

            {/* Revenue Amount */}
            <div className="space-y-3">
              <Label
                htmlFor="revenue-amount"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4 text-[#5a57ff]" />
                Revenue Amount
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="revenue-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={revenueAmount}
                  onChange={(e) => setRevenueAmount(e.target.value)}
                  placeholder="1000.00"
                  className="h-11 pl-10"
                  required
                />
              </div>
            </div>

            {/* Revenue Description */}
            <div className="space-y-3">
              <Label
                htmlFor="revenue-description"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-[#5a57ff]" />
                Revenue Description
                <span className="text-gray-400 text-xs">(Optional)</span>
              </Label>
              <Textarea
                id="revenue-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the source or details of this revenue..."
                className="min-h-[100px] resize-none"
              />
            </div>
            <Select value={selectedDepartmentId} onValueChange={(value) => setSelectedDepartmentId(value)}>
              <SelectTrigger className="w-80 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-md">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                 {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.name}
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
            disabled={isSubmitting || !revenueName.trim() || !revenueAmount.trim()}
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

export default AddRevenueForm;
