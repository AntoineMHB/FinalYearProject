import axios from 'axios';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    axios.get<Payment[]>('http://localhost:8080/api/payment/all')
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch payments:", err);
      });
  }, []);

  return (
    <div>
      <h2>All Payments</h2>
      {payments.length === 0 ? (
        <p>No payments have been made yet.</p>
      ) : (
        <ul>
          {payments.map((p, index) => (
            <li key={index}>
              {p.name} paid {p.amount} {p.currency} on {new Date(p.paymentDate).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentList;
