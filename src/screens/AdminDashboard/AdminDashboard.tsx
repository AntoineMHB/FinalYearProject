import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectTrigger, SelectValue } from "../../components/ui/select";
import { NbchartsLinechatsByAnima } from "./sections/NbchartsLinechatsByAnima";
import { RevenueCardByAnima } from "./sections/RevenueCardByAnima";
import { TransactionsTableByAnima } from "./sections/TransactionsTableByAnima";
import { SettingsLougOutSlideMenu } from "./sections/SettingsLougOutSlideMenu";
import { Bell } from "lucide-react";
import AddBudgetForm from "../../components/AddBudgetForm";
import AddDepartmentForm from "../../components/AddDepartmentForm";
// import { SlideMenuByAnimaAdmin } from "./sections/SlideMenuByAnimaAdmin";
import { SlideMenuByAnimaAdmin } from "./sections/SlideMenuByAnimaAdmin";




// Action buttons data
const actionButtons = [
//   { id: 1, text: "Record Transaction", left: "3.5" },
  { id: 2, text: "Create a Budget", left: "7", action:"showAddBudget" },
  { id: 3, text: "Record Revenue", left: "5", action:"showAddRevenue" },
  { id: 4, text: "Add Expense", left: "31", action:"showAddExpense" },
//   { id: 5, text: "Submit Taxes", left: "31" },
  { id: 6, text: "Add Department", left: "31", action:"showAddDepartment" },
];

type User = {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
}

export const AdminDashboard = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [activeAction, setActiveAction] = useState("");

  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  
    // Function to close the Add Budget form
    const handleBudgetAdded = () => {
      setShowAddBudgetForm(false); // Close the form after adding an budget
    };

    const handleDepartmentAdded = () => {
      setShowAddDepartmentForm(false); // Close the form after adding an budget
    };


    const handleCloseForm = () => {
      // setShowAddBudgetForm(false); // Close the form
      setActiveAction("");
    };

    //Function to handle the button actions
    const handleAction = (action: any) => {
      switch (action) {
        case "showAddBudget":
          setActiveAction("showAddBudget");
          break;
        case "showAddDepartment":
          setActiveAction("showAddDepartment");
          break;
        case "showAddExpense":
          setActiveAction("showAddExpense");
          break;
        default:
          console.warn("Unknown action:", action);
        
      }
    }

  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full">
      <div className="bg-[#faf9ff] overflow-hidden w-[1440px] relative">
        {/* Sidebar */}
        <div className="w-[250px] h-full fixed top-0  bg-[#5a57ff] rounded-[0px_30px_30px_0px] z-10 overflow-auto scrollbar-hide">
          
            <div className="pt-10 pl-[53px] [font-family:'Poppins',Helvetica] font-bold text-white text-xl">
              LIKUTA Track
            </div>
            
            <div className="pt-[30px]">
             <SlideMenuByAnimaAdmin />
            </div>

            <div className="pt-[30px]">
              <SettingsLougOutSlideMenu />
            </div>
          
        </div>

        {/* Main content */}
        <div className="ml-[298px] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="font-extrabold text-[#353535] text-4xl [font-family:'Poppins',Helvetica]">
                Admin Dashboard
              </h1>
              <p className="[font-family:'Poppins',Helvetica] font-medium text-[#cccccc] text-base">
                Welcome&nbsp;&nbsp;back, {user? user.firstname : "Loading..."}
              </p>
            </div>

            {/* Notification and profile */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="/ellipse-1.png" alt="Profile" />
                    <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute w-3 h-3 top-1 right-0 bg-[#53e88c] rounded-md border-2 border-solid border-[#faf9ff]" />
                </div>

                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-semibold text-black text-xl">
                    {user?.firstname}&nbsp;&nbsp;{user?.lastname}
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] font-light text-[#666668] text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

                {/* Centered Modal */}
      {activeAction === "showAddBudget" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <AddBudgetForm onBudgetAdded={handleBudgetAdded} onClose={handleCloseForm}  />
          </div>
        </div>
      )}


     {activeAction === "showAddDepartment" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <AddDepartmentForm onDepartmentAdded={handleDepartmentAdded} onClose={handleCloseForm}  />
          </div>
        </div>
      )}




          {/* Action buttons */}
          <div className="flex gap-3 mb-8">
            {actionButtons.map((button) => (
              <Button
                key={button.id}
                variant="outline"
                onClick={() => handleAction(button.action)}
                className="h-[50px] bg-white rounded-[20px] border border-solid border-gray-300 shadow-[0px_4px_4px_#00000040]"
              >
                <span
                  className={`[font-family:'Poppins',Helvetica] font-medium text-black text-xl`}
                >
                  {button.text}
                </span>
              </Button>
            ))}
          </div>

          {/* Revenue cards section */}
          <RevenueCardByAnima />

          {/* Transactions and charts section */}
          <div className="mt-6 grid grid-cols-12 gap-6 pt-[40px]">
            <div className="col-span-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#353535] text-2xl">
                  Recent Transactions
                </h2>
              </div>
              <TransactionsTableByAnima />
            </div>

            <div className="col-span-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#353535] text-2xl">
                  Revenue &amp; Expense&nbsp;&nbsp;Trends
                </h2>

                <Select>
                  <SelectTrigger className="w-36 h-[34px] rounded-xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
                    <SelectValue
                      placeholder="Last week"
                      className="[font-family:'Poppins',Helvetica] font-medium text-[#666668] text-xs"
                    />
                  </SelectTrigger>
                </Select>
              </div>

              <Card className="w-full h-[238px] bg-white rounded-3xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040]">
                <CardContent className="p-0">
                  <NbchartsLinechatsByAnima />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
