import axios from "axios";
import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

type Payment = {
  id: number;
  txRef: string;
  email: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  paymentDate: string;
};

const PaymentList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Payment[]>("http://localhost:8080/api/payment/all")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Failed to fetch payments:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          All Payments
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="text-center text-gray-500">
            No payments have been made yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {payments.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-200"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{p.email}</p>
                  <p className="text-xl font-bold text-indigo-600 mb-2">
                    {p.amount} {p.currency}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(p.paymentDate).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  {p.status.toLowerCase() === "completed" && (
                    <span className="inline-flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" /> Completed
                    </span>
                  )}
                  {p.status.toLowerCase() === "pending" && (
                    <span className="inline-flex items-center text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium">
                      <Clock className="w-4 h-4 mr-1" /> Pending
                    </span>
                  )}
                  {p.status.toLowerCase() === "failed" && (
                    <span className="inline-flex items-center text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">
                      <XCircle className="w-4 h-4 mr-1" /> Failed
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs text-gray-400">TX Ref: {p.txRef}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
