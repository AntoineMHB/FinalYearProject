import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Download, ArrowLeft, Receipt, Shield, Clock } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const [txRef, setTxRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tx_ref = query.get("tx_ref");
    if (tx_ref) {
      setTxRef(tx_ref);
      setShowConfetti(true);
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [location]);

  const downloadReceipt = async () => {
    if (!txRef) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/payment/receipt/${txRef}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${txRef}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to download receipt.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-md w-full relative z-10">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-2xl animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-lg text-gray-600">Your transaction has been completed successfully</p>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-opacity-95">
          <div className="p-8">
            {/* Transaction Details */}
            {txRef && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Receipt className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Reference ID:</span>
                    <span className="text-sm font-mono bg-white px-3 py-1 rounded-lg border text-gray-900">
                      {txRef}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Completed
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Date:</span>
                    <span className="text-sm text-gray-900">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {txRef && (
                <button
                  onClick={downloadReceipt}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      <span>Download Receipt</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={goBack}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition duration-200 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>

            {/* Next Steps */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">What happens next?</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <Clock className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Confirmation Email</p>
                    <p className="text-xs text-gray-500">You'll receive a confirmation email within 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Receipt className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Receipt Available</p>
                    <p className="text-xs text-gray-500">Download your receipt anytime from your dashboard</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <Shield className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Secure Processing</p>
                    <p className="text-xs text-gray-500">Your payment was processed securely via Flutterwave</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
              <span>Transaction secured by Flutterwave</span>
              <span>•</span>
              <span>PCI DSS Compliant</span>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-green-600 hover:text-green-700 font-medium">Contact Support</a>
          </p>
        </div>
      </div>

      <style >{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;