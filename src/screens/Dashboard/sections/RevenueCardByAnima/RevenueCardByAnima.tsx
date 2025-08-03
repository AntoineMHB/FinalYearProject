import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import axios from "axios";

export const RevenueCardByAnima = (): JSX.Element => {
      const [departmentBudgetCount, setDepartmentBudgetCount] = useState(0);
      const [departmentRevenueTotal, setDepartmentRevenueTotal] = useState(0);
      const [budgetsAmount, setBudgetsAmount] = useState(0);
      const [expensesAmount, setExpensesAmount] = useState(0);


      // Here we fetch all the dpts from the DB and store them in the local storage
      useEffect(() => {
        const fetchDepartments = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/departments");
            const departments = response.data;
            localStorage.setItem("departments", JSON.stringify(departments));

            // Select and store the matched department for the logge-in user
            const userJson = localStorage.getItem("user");
            if (!userJson) return;

            const user = JSON.parse(userJson);
            const userEmail = user.email;

            let matchedDepartmentPrefix = null;
            if (userEmail?.startsWith("IT")) {
              matchedDepartmentPrefix = "IT";
            } else if (userEmail?.startsWith("HR")) {
              matchedDepartmentPrefix = "HR";
            } else if (userEmail?.startsWith("COM")) {
              matchedDepartmentPrefix = "COM";
            } else if (userEmail?.startsWith("Research")) {
              matchedDepartmentPrefix = "Research";
            }

            if (matchedDepartmentPrefix) {
              const matchedDepartment = departments.find(
                (dept: any) => dept.name === matchedDepartmentPrefix
              );

              if (matchedDepartment) {
                localStorage.setItem("department", JSON.stringify(matchedDepartment));
              } else {
                console.warn("No matching department found in DB for user email prefix.");
              }
            }
          }  catch (error) {
            console.error("Failed to fetch departments:", error);
          }
        };
        fetchDepartments();
      })

      // Here we use the selected dpt to fecth budget count
      useEffect(() => {
        const fetchBudgetCountAndRevenueByDpt = async () => {
          const departmentJson = localStorage.getItem("department");
          const userJson = localStorage.getItem("user");

        if (!departmentJson || !userJson) {
          console.warn("Missing department or user data in localStorage.");
          return;
        }

        const department = JSON.parse(departmentJson);

        try {
          const response = await axios.get(
            `http://localhost:8080/api/budgets/departments/${department.id}/budgets/count`
          );
          setDepartmentBudgetCount(response.data);

          // Fetch total revenue
          const revenueResponse = await axios.get(
            `http://localhost:8080/api/revenues/total-revenue-by-dpt/${department.id}`
          );
          setDepartmentRevenueTotal(revenueResponse.data);
        } catch (error) {
          console.error("Error fetching budget count:", error);
        }

        
      };

        fetchBudgetCountAndRevenueByDpt();
      }, []);

      // LOGIC TO CALCULATE THE DEPARTMENT TOTAL BUDGET AND THE DEPARTMENT TOTAL EXPENSE FOR CALCULATING THE BUDGET UTILIZATION PERCENTAGE
            useEffect(() => {
                const userJson = localStorage.getItem("user");
                const departmentJson = localStorage.getItem("department");

                if (!userJson || !departmentJson) {
                  console.warn("Missing user or department data");
                  return;
                }

                  const user = JSON.parse(userJson);
                  const department = JSON.parse(departmentJson);
                  const userEmail = user.email;
                  const userRole = user.role; // assumes you store 'ADMIN' or 'MANAGER'

                  let matchedDepartment: string = "";

                  if (userEmail?.startsWith("IT")) matchedDepartment = "IT";
                  else if (userEmail?.startsWith("HR")) matchedDepartment = "HR";
                  else if (userEmail?.startsWith("COM")) matchedDepartment = "COM";
                  else if (userEmail?.startsWith("Research")) matchedDepartment = "Research";

                  const isManager = userEmail?.endsWith("@gmail.com");

                  // 1. Fetch budgets amount
                  const fetchBudgetsAmount = async () => {
                    try {
                      if (isManager) {
                        const totalResponse = await axios.get("http://localhost:8080/api/budgets/total-by-department");
                        setBudgetsAmount(totalResponse.data[matchedDepartment] || 0);
                      } else {
                        const totalResponse = await axios.get("http://localhost:8080/api/budgets/total-budget");
                        setBudgetsAmount(totalResponse.data);
                      }
                    } catch (err) {
                      console.error("Error fetching budgets amount", err);
                    }
                  };

                  // 2. Fetch expenses amount
                  const fetchExpensesAmount = async () => {
                    try {
                      if (isManager) {
                        const totalResponse = await axios.get(`http://localhost:8080/api/expenses/total-expense-by-dpt/${department.id}`);
                        setExpensesAmount(totalResponse.data);
                        console.log(`This is the total expense of this department: ${expensesAmount}` )
                      } else {
                        const totalResponse = await axios.get("http://localhost:8080/api/expenses/total-expense");
                        setExpensesAmount(totalResponse.data);
                      }
                    } catch (err) {
                      console.error("Error fetching expenses amount", err);
                    }
                  }

                  // call all fetches
                    fetchBudgetsAmount();
                    fetchExpensesAmount();
                 
              }, []);

      const percentage = (expensesAmount / budgetsAmount) * 100;
      const formatted = `${percentage.toFixed(1)}%`;

  // Data for the cards to enable mapping
  const cardData = [
    {
      title: "Total Budgets",
      value: departmentBudgetCount.toString(),
      valueColor: "text-[#0e9cff]",
      actionText: "View Budgets",
      actionColor: "text-[#ea0505]",
      bgImage: null,
    },
    {
      title: "Revenue Overview",
      value: `$${departmentRevenueTotal}`,
      valueColor: "text-[#03ad3c]",
      actionText: "View Details",
      actionColor: "text-[#ea0505]",
      bgImage: null,
    },
    // {
    //   title: "Pending Tax Submissions",
    //   value: "3",
    //   valueColor: "text-[#ff7723]",
    //   actionText: "Submit now",
    //   actionColor: "text-[#ea0505]",
    //   bgImage: "null",
    // },
    // {
    //   title: "Compliance Alerts",
    //   value: "2",
    //   valueColor: "text-[#ea0505]",
    //   actionText: "Review issues",
    //   actionColor: "text-white",
    //   bgImage: "null",
    // },
    {
      title: "Budget Utilization",
      value: formatted,
      valueColor: "text-black",
      actionText: "Analyse spending",
      actionColor: "text-[#ea0505]",
      bgImage: "null",
    },
  ];

  return (
    <section className="w-full pt-[20px]">
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="relative h-[152px] rounded-3xl border border-solid border-[#5a57ff1a] shadow-[0px_4px_4px_#00000040] overflow-hidden"
            >
              {card.bgImage && (
                <div
                  className="absolute inset-0 w-full h-full object-cover"
                  // alt="Background"
                  // src={card.bgImage}
                />
              )}
              <CardContent className="relative z-10 flex flex-col h-full p-5">
                <div className="font-medium text-[#b0b0b4] text-base font-['Poppins',Helvetica]">
                  {card.title}
                </div>
                <div
                  className={`mt-6 font-bold text-2xl font-['Poppins',Helvetica] ${card.valueColor}`}
                >
                  {card.value}
                </div>
                <div
                  className={`mt-auto font-semibold text-[11px] font-['Poppins',Helvetica] ${card.actionColor}`}
                >
                  {card.actionText}
                </div>
              </CardContent>
            </Card>

          ))}
        </div>
      </div>
    </section>
  );
};
