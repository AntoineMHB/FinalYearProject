import { useState, FormEvent } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { XIcon, Tag } from "lucide-react";

type AddDepartmentFormProps = {
  onDepartmentAdded: (data: any | null) => void;
  onClose: () => void;
};

const AddBudgetForm: React.FC<AddDepartmentFormProps> = ({ 
  onDepartmentAdded, 
  onClose 
}) => {
  const [name, setDepartmentName] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData.userId;

      if (!userId) {
        throw new Error("User ID not found. Please log in.");
      }

      const response = await axios.post("http://localhost:8080/api/departments", {
        name,
        user: { id: userId },
      });

      onDepartmentAdded(response.data);
      resetForm();
    } catch (error: any) {
      console.error("Error adding department:", error.response || error.message || error);
      alert(
        error.response?.data?.message ||
        "An error occurred while adding the department. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDepartmentName("");

  };

  const handleCancel = () => {
    resetForm();
    onClose();
    onDepartmentAdded(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-[#5a57ff] to-[#7c79ff] text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-poppins font-bold">
                Add New Department
              </CardTitle>
              <CardDescription className="text-white/90 mt-2">
                Create a new department to allow the manager to track the expenses and stay on top of the finances
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
            {/* Department Name */}
            <div className="space-y-3">
              <Label
                htmlFor="department_name"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-[#5a57ff]" />
                 Department Name
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="e.g., IT, Marketing, Human Ressources"
                id="department_name"
                className="h-11"
                required
              />
            </div>
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
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Department...
              </div>
            ) : (
              'Add Department'
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Helper Text */}
    </div>
  );
};

export default AddBudgetForm;