import React, { useState } from 'react';
import axios from 'axios';
import { CreditCard, Mail, User, Download, Shield, Lock } from 'lucide-react';

export default function PaymentPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [receiptLink, setReceiptLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!email || !name || !amount) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/payment/initialize", {
        email,
        name,
        amount,
      });
      window.location.href = res.data.data.link; // Redirect to Flutterwave
    } catch (err) {
      alert("Payment initialization failed");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReceipt = async (txRef: string) => {
    const response = await axios.get(`http://localhost:8080/api/payment/receipt/${txRef}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt-${txRef}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h1>
          <p className="text-gray-600">Complete your transaction safely and securely</p>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Amount Field */}
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">$</span>
                  </div>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-8 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-xl p-3">
                <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>

              {/* Payment Button */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={isLoading || !email || !name || !amount}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Pay Securely Now</span>
                  </>
                )}
              </button>

              {/* Receipt Download */}
              {receiptLink && (
                <button
                  type="button"
                  onClick={() => downloadReceipt(receiptLink)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Receipt</span>
                </button>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
              <span>Powered by Flutterwave</span>
              <span>•</span>
              <span>PCI DSS Compliant</span>
              <span>•</span>
              <span>SSL Secured</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Trusted by thousands of customers worldwide</p>
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="h-4 w-4" />
              <span className="text-xs">Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs">PCI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}