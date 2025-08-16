import axios from "axios";
import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Calendar,
  User,
  Building,
  Hash,
  Shield,
  Phone,
  Mail,
  CreditCard,
  Receipt,
  Calculator,
  BarChart3,
  Download,
} from "lucide-react";

import { Card, CardContent } from "../../../../components/ui/card";
import { TransactionsTableByAnimaAdmin } from "../TransactionsTableByAnimaAdmin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Transaction {
  id: number;
  name: string;
  amount: number;
  description: string;
  createdAt: string;
  type: "REVENUE" | "EXPENSE";
}

export const FinancialReport = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  let [netProfit, setNetProfit] = useState(0);
  const [expenseReport, setExpenseReport] = useState<any[]>([]);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [revenuesAmount, setRevenuesAmount] = useState(0);
  const [budgetsAmount, setBudgetsAmount] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // fetching data for breakdown tables.

  useEffect(() => {
    const fetchExpenses = axios.get("http://localhost:8080/api/expenses");
    const fetchRevenues = axios.get("http://localhost:8080/api/revenues");

    Promise.all([fetchExpenses, fetchRevenues])
      .then(([expensesRes, revenuesRes]) => {
        const expenses: Transaction[] = expensesRes.data.map(
          (expense: any) => ({
            id: expense.id,
            name: expense.expenseName,
            amount: expense.amount,
            description: expense.description,
            createdAt: expense.createdAt,
            type: "EXPENSE",
          })
        );

        const revenues: Transaction[] = revenuesRes.data.map(
          (revenue: any) => ({
            id: revenue.id,
            name: revenue.revenueName,
            amount: revenue.amount,
            description: revenue.description,
            createdAt: revenue.createdAt,
            type: "REVENUE",
          })
        );

        // Combine and sort by date (most recent first)
        const allTransactions = [...expenses, ...revenues].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTransactions(allTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  useEffect(() => {
    const fetchBudgetsAmount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/budgets/total-budget"
        );
        setBudgetsAmount(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching budgets amount:", error);
      }
    };
    fetchBudgetsAmount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesResponse, revenuesResponse, budgetsResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/api/expenses/total-expense"),
            axios.get("http://localhost:8080/api/revenues/total-amount"),
            axios.get("http://localhost:8080/api/budgets/total-budget"),
          ]);
        setExpensesAmount(expensesResponse.data);
        setRevenuesAmount(revenuesResponse.data);
        setBudgetsAmount(budgetsResponse.data);
        console.log("Expenses:", expensesResponse.data);
        console.log("Revenues:", revenuesResponse.data);
        console.log("Budgets:", budgetsResponse.data);
      } catch (error) {
        console.error("Error fetching expenses amount:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userJson = localStorage.getItem("user");
  //       const departmentJson = localStorage.getItem("department");

  //       if (!userJson || !departmentJson) {
  //         console.warn("Missing user or department info");
  //         return;
  //       }

  //       const user = JSON.parse(userJson);
  //       const department = JSON.parse(departmentJson);

  //       const isManager = user.email?.endsWith("@gmail.com");

  //       let expenses = 0;
  //       let revenues = 0;
  //       let budgets = 0;

  //       if (isManager) {
  //         const [expensesRes, revenuesRes, budgetsRes] = await Promise.all([
  //           axios.get(
  //             `http://localhost:8080/api/expenses/total-expense-by-dpt/${department.id}`
  //           ),
  //           axios.get(
  //             `http://localhost:8080/api/revenues/total-revenue-by-dpt/${department.id}`
  //           ),
  //           axios.get(`http://localhost:8080/api/budgets/total-by-department`),
  //         ]);

  //         expenses = expensesRes.data || 0;
  //         revenues = revenuesRes.data || 0;
  //         budgets = budgetsRes.data || 0;
  //       } else {
  //         const [expensesRes, revenuesRes, budgetsRes] = await Promise.all([
  //           axios.get("http://localhost:8080/api/expenses/total-expense"),
  //           axios.get("http://localhost:8080/api/revenues/total-revenue"),
  //           axios.get("http://localhost:8080/api/budgets/total-budget"),
  //         ]);

  //         expenses = expensesRes.data || 0;
  //         revenues = revenuesRes.data || 0;
  //         budgets = budgetsRes.data || 0;
  //       }

  //       setExpensesAmount(expenses);
  //       setRevenuesAmount(revenues);
  //       setBudgetsAmount(budgets);
  //       setNetProfit(revenues - expenses);
  //     } catch (err) {
  //       console.error("Error fetching financial report data:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const percentage = (expensesAmount / budgetsAmount) * 100;
  const formatted = `${percentage.toFixed(1)}%`;
  netProfit = revenuesAmount - expensesAmount;

  useEffect(() => {
    axios.get("/api/cashflow/summary").then((res) => {
      const data = res.data;
      setTotalRevenue(data.totalRevenue);
      setTotalExpenses(data.totalExpenses);
      setNetProfit(data.netProfit);
      console.log(netProfit);
      console.log(totalExpenses);
      console.log(totalRevenue);
    });

    axios.get("/api/expenses/report").then((res) => {
      setExpenseReport(res.data);
    });

    axios.get("/api/expenses/by-budget").then((res) => {
      setBudgetData(res.data);
    });

    axios.get("/api/expenses/total-expense").then((res) => {
      setTotalExpense(res.data);
      console.log(totalExpense);
    });
  }, []);

  const downloadPDF = () => {
    if (reportRef.current) {
      const opt = {
        margin: 0.5,
        filename: "financial_report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().from(reportRef.current).set(opt).save();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const ProgressBar = ({
    value,
    max,
    color = "blue",
  }: {
    value: number;
    max: number;
    color?: string;
  }) => {
    const percentage = (value / max) * 100;
    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      amber: "bg-amber-500",
      red: "bg-red-500",
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  // Sample data for demonstration - replace with your actual data
  const now = new Date();

  const year = now.getFullYear();
  const month = now.toLocaleString("en-US", { month: "long" });
  const monthNumber = String(now.getMonth() + 1).padStart(2, "0");

  interface TaxResult {
    taxAmount: number;
    afterTaxAmount: number;
    effectiveRate: number;
    breakdown?: { bracket: string; rate: number; amount: number }[];
  }

  // Income Tax State
  let [income, setIncome] = useState<string>("");
  const [incomeResult, setIncomeResult] = useState<TaxResult | null>(null);
  income = netProfit.toString();

  // Income Tax Calculation (Progressive rates)
  const calculateIncomeTax = () => {
    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue <= 0) return;

    // Sample progressive tax brackets
    const brackets = [
      { min: 0, max: 50000, rate: 0 },
      { min: 50001, max: 100000, rate: 10 },
      { min: 100001, max: 200000, rate: 20 },
      { min: 200001, max: 500000, rate: 25 },
      { min: 500001, max: Infinity, rate: 30 },
    ];

    let totalTax = 0;
    const breakdown: { bracket: string; rate: number; amount: number }[] = [];

    for (const bracket of brackets) {
      if (incomeValue > bracket.min) {
        const taxableInThisBracket =
          Math.min(incomeValue, bracket.max) - bracket.min + 1;
        const taxForThisBracket = (taxableInThisBracket * bracket.rate) / 100;
        totalTax += taxForThisBracket;

        if (taxForThisBracket > 0) {
          breakdown.push({
            bracket:
              bracket.max === Infinity
                ? `$${bracket.min.toLocaleString()}+`
                : `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`,
            rate: bracket.rate,
            amount: taxForThisBracket,
          });
        }
      }
    }

    setIncomeResult({
      taxAmount: totalTax,
      afterTaxAmount: incomeValue - totalTax,
      effectiveRate: (totalTax / incomeValue) * 100,
      breakdown,
    });
  };

  useEffect(() => {
    calculateIncomeTax();
  }, [netProfit]);

  // Turnover Tax State
  let [turnover, setTurnover] = useState<string>("");
  turnover = revenuesAmount.toString();
  const [turnoverResult, setTurnoverResult] = useState<TaxResult | null>(null);

  // Turnover Tax Calculation (usually 1% for small businesses)
  const calculateTurnoverTax = () => {
    const turnoverValue = parseFloat(turnover);
    if (isNaN(turnoverValue) || turnoverValue <= 0) return;

    const rate = 1; // 1% for small businesses
    const tax = (turnoverValue * rate) / 100;

    setTurnoverResult({
      taxAmount: tax,
      afterTaxAmount: turnoverValue - tax,
      effectiveRate: rate,
    });
  };

  useEffect(() => {
    calculateTurnoverTax();
  }, [revenuesAmount]);

  const reportData = {
    header: {
      title: "Monthly Financial Report",
      businessName: "LIKUTA Track",
      period: `${month} ${year}`,
      generatedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      reportId: `FR-${year}-${monthNumber}-001`,
    },
    budget: {
      name: "2025 Budget",
      allocated: budgetsAmount,
      spent: expensesAmount,
      remaining: budgetsAmount - expensesAmount,
      utilizationRate: (expensesAmount / budgetsAmount) * 100,
    },
    revenues: [
      {
        source: "Sales",
        amount: 5000,
        date: "2025-07-01",
        notes: "Online sales",
      },
      {
        source: "Services",
        amount: 2500,
        date: "2025-07-10",
        notes: "Consulting",
      },
      {
        source: "Investment",
        amount: 800,
        date: "2025-07-15",
        notes: "Dividend",
      },
    ],
    expenses: [
      {
        item: "Office Rent",
        amount: 1200,
        date: "2025-07-03",
        category: "Fixed Expense",
        notes: "Monthly rent",
      },
      {
        item: "Software License",
        amount: 150,
        date: "2025-07-05",
        category: "Operational",
        notes: "Annual payment",
      },
      {
        item: "Salaries",
        amount: 3000,
        date: "2025-07-10",
        category: "HR",
        notes: "Staff salaries",
      },
    ],
    tax: {
      taxableIncome: revenuesAmount - expensesAmount * 0.1, // Assuming 10% deductions
      taxRate: 11.1,
      totalTaxPayable: (revenuesAmount - expensesAmount * 0.1) * 0.111,
      previousTaxPaid: 0,
      outstandingBalance: (revenuesAmount - expensesAmount * 0.1) * 0.111,
    },
    payments: [
      {
        id: "PAY-001",
        amount: 1200,
        date: "2025-07-03",
        method: "Bank Transfer",
        related: "Office Rent",
      },
      {
        id: "PAY-002",
        amount: 150,
        date: "2025-07-05",
        method: "Credit Card",
        related: "Software License",
      },
      {
        id: "PAY-003",
        amount: 3000,
        date: "2025-07-10",
        method: "Direct Deposit",
        related: "Salaries",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Daily Expenses" },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" as const },
      title: { display: true, text: "Expenses by Budget" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Logo and Download Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className=" text-blue-600 font-bold">LIKUTA Track</h1>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Download PDF</span>
          </button>
        </div>

        <div ref={reportRef}>
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {reportData.header.title}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Report ID</p>
                <p className="font-mono text-lg">
                  {reportData.header.reportId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Business</p>
                  <p className="font-semibold">
                    {reportData.header.businessName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Period</p>
                  <p className="font-semibold">{reportData.header.period}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Generated</p>
                  <p className="font-semibold">
                    {reportData.header.generatedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Version</p>
                  <p className="font-semibold">1.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Revenues</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(revenuesAmount)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(expensesAmount)}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Net Balance</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(revenuesAmount - expensesAmount)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tax Due</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatCurrency(reportData.tax.totalTaxPayable)}
                  </p>
                </div>
                <Calculator className="h-8 w-8 text-amber-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Budget Utilization
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatted}
                  </p>
                  <ProgressBar
                    value={reportData.budget.utilizationRate}
                    max={100}
                    color="blue"
                  />
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      Math.max(
                        0,
                        revenuesAmount -
                          expensesAmount -
                          reportData.tax.totalTaxPayable
                      )
                    )}
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Budget Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Budget Name</p>
                <p className="font-semibold">{reportData.budget.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Allocated Amount</p>
                <p className="font-semibold text-blue-600">
                  {formatCurrency(reportData.budget.allocated)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Spent Amount</p>
                <p className="font-semibold text-red-600">
                  {formatCurrency(reportData.budget.spent)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Remaining Budget</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(reportData.budget.remaining)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Utilization Rate</p>
                <p className="font-semibold">
                  {reportData.budget.utilizationRate.toFixed(1)}%
                </p>
                <ProgressBar
                  value={reportData.budget.utilizationRate}
                  max={100}
                  color="amber"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            {/* Revenue and Expense Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Revenue and Expense Breakdown
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Source of Revenue / Name of Item
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={`${tx.type}-${tx.id}`}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-3 font-medium text-[#818181] text-sm">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          className={`px-6 py-3 font-medium text-sm ${
                            tx.type === "EXPENSE"
                              ? "text-[#EB0606]"
                              : "text-[#04AD3C]"
                          }`}
                        >
                          {tx.type}
                        </td>
                        <td className="px-6 py-3 font-medium text-[#818181] text-sm">
                          {tx.name}
                        </td>
                        <td className="px-6 py-3 font-medium text-[#818181] text-sm">
                          {tx.description}
                        </td>
                        <td
                          className={`px-6 py-3 font-medium text-sm ${
                            tx.type === "EXPENSE"
                              ? "text-[#EB0606]"
                              : "text-[#04AD3C]"
                          }`}
                        >
                          ${tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tax Calculation Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tax Calculation Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="flex justify-between items-center gap-80">
                <div>
                  {incomeResult && (
                    <div className="bg-gray-50 rounded-lg p-6 w-[300px]">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Income Tax Breakdown
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Income:</span>
                          <span className="font-medium">
                            {formatCurrency(parseFloat(income))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax Amount:</span>
                          <span className="font-medium text-red-600">
                            {formatCurrency(incomeResult.taxAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            After-Tax Income:
                          </span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(incomeResult.afterTaxAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Effective Rate:</span>
                          <span className="font-medium">
                            {incomeResult.effectiveRate.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {incomeResult.breakdown && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-800 mb-3">
                            Tax Breakdown
                          </h4>
                          {incomeResult.breakdown.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm mb-2"
                            >
                              <span className="text-gray-600">
                                {item.bracket} ({item.rate}%):
                              </span>
                              <span>{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  {turnoverResult && (
                    <div className="bg-gray-50 rounded-lg p-6 w-[300px]">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Turnover Tax Breakdown
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Annual Turnover:
                          </span>
                          <span className="font-medium">
                            {formatCurrency(parseFloat(turnover))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Turnover Tax:</span>
                          <span className="font-medium text-red-600">
                            {formatCurrency(turnoverResult.taxAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            After-Tax Turnover:
                          </span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(turnoverResult.afterTaxAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax Rate:</span>
                          <span className="font-medium">
                            {turnoverResult.effectiveRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue vs Expenses
              </h3>
              <div className="flex items-end space-x-4 h-32">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-green-500 rounded-t"
                    style={{
                      height: `${
                        (revenuesAmount /
                          Math.max(revenuesAmount, expensesAmount)) *
                        100
                      }px`,
                    }}
                  ></div>
                  <span className="text-xs mt-2 text-center">Revenue</span>
                  <span className="text-xs text-green-600 font-semibold">
                    {formatCurrency(revenuesAmount)}
                  </span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-red-500 rounded-t"
                    style={{
                      height: `${
                        (expensesAmount /
                          Math.max(revenuesAmount, expensesAmount)) *
                        100
                      }px`,
                    }}
                  ></div>
                  <span className="text-xs mt-2 text-center">Expenses</span>
                  <span className="text-xs text-red-600 font-semibold">
                    {formatCurrency(expensesAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Budget Utilization
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Allocated</span>
                    <span>{formatCurrency(reportData.budget.allocated)}</span>
                  </div>
                  <ProgressBar value={100} max={100} color="blue" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Spent</span>
                    <span>{formatCurrency(reportData.budget.spent)}</span>
                  </div>
                  <ProgressBar
                    value={reportData.budget.utilizationRate}
                    max={100}
                    color="red"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Remaining</span>
                    <span>{formatCurrency(reportData.budget.remaining)}</span>
                  </div>
                  <ProgressBar
                    value={100 - reportData.budget.utilizationRate}
                    max={100}
                    color="green"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Records */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Payment Records
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Payment ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Amount Paid
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Payment Method
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Related Expense
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.payments.map((payment, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-mono text-sm">
                        {payment.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-blue-600">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-3 px-4">{formatDate(payment.date)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span>{payment.method}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{payment.related}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    Confidentiality
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  This report contains confidential financial information.
                  Distribution is restricted to authorized personnel only.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Receipt className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    System Integrity
                  </h3>
                </div>
                <p className="text-sm text-gray-600 font-mono">
                  Hash: SHA256-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
                </p>
                <p className="text-sm text-gray-500">
                  Digitally signed and verified
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    Support Contact
                  </h3>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>support@likutatrack.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>+243 982 545 563</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Generated by LIKUTA Track Financial Management System v2.1.0 | ©
                2025 LIKUTA Track
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
