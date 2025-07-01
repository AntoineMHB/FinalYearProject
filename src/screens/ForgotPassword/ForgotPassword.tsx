import { useState } from 'react';
import axios from 'axios';
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, Shield } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPassword } from '../ResetPassword/ResetPassword';

type PageState = 'forgot' | 'reset' | 'success';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<PageState>('forgot');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

    const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

    const validatePassword = (password: string) => {
    return password.length >= 2;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) {
    setError('Email address is required');
    return;
  }

  if (!validateEmail(email)) {
    setError('Please enter a valid email address');
    return;
  }

  setError(''); // clear previous errors
  setIsLoading(true);

  try {
    await axios.post("http://localhost:8080/forgotPassword", { email });
    setMessage("Check your email for the reset link.");
    setIsSubmitted(true); 
  } catch (err) {
    setMessage("Something went wrong.");
  } finally {
    setIsLoading(false);
  }
};


  const handleBackToLogin = () => {
    setCurrentPage('forgot');
    setIsSubmitted(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    navigate("/login");
  };

  const goToResetPage = () => {
    setCurrentPage('reset');
    setIsSubmitted(false);
    setError('');
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Password is required');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!confirmPassword) {
      setError('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post("http://localhost:8080/reset-password", { token, password });
      setMessage("Password reset successful.");
    } catch {
      setMessage("Reset failed.");
    }

    setIsLoading(true);
    
  }


  // Reset password page
  if (currentPage === 'reset') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <ResetPassword />
 
      </div>
    );
  }

    // Email sent confirmation page
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center space-y-6 animate-in fade-in-50 duration-500">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
              <p className="text-gray-600 leading-relaxed">
                We've sent a password reset link to
                <span className="block font-medium text-gray-900 mt-1">{email}</span>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">Didn't receive the email?</p>
              <p>Check your spam folder or try again in a few minutes.</p>
            </div>

            {/* Demo button to simulate clicking reset link */}
            <div className="pt-2">
              <button
                onClick={goToResetPage}
                className={`
                  w-full py-3 px-4 rounded-lg font-semibold text-white
                  transition-all duration-200 transform
                  focus:outline-none focus:ring-4 focus:ring-[#5A57FF]/20
                  hover:scale-[1.02] hover:shadow-lg
                  mb-4
                `}
                style={{ backgroundColor: '#5A57FF' }}
              >
                <Shield className="w-5 h-5 inline mr-2" />
                Demo: Go to Reset Password
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={handleBackToLogin}
                className="inline-flex items-center gap-2 text-sm font-medium hover:text-gray-900 transition-colors duration-200 group"
                style={{ color: '#5A57FF' }}
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="space-y-8 animate-in fade-in-50 duration-500">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#5A57FF' }}>
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Forgot password?</h1>
            <p className="text-gray-600 leading-relaxed">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email"
                  className={`
                    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
                    placeholder-gray-400 text-gray-900 bg-white
                    focus:outline-none focus:ring-0
                    ${isFocused ? 'border-[#5A57FF] shadow-[0_0_0_3px_rgba(90,87,255,0.1)]' : 'border-gray-200'}
                    ${error ? 'border-red-300 focus:border-red-500' : ''}
                    hover:border-gray-300
                  `}
                />
                {error && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white
                transition-all duration-200 transform
                focus:outline-none focus:ring-4 focus:ring-[#5A57FF]/20
                hover:scale-[1.02] hover:shadow-lg
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                relative overflow-hidden
              `}
              style={{ backgroundColor: '#5A57FF' }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending reset link...
                </div>
              ) : (
                'Send Email'
              )}
            </button>
            <p className="flex items-center justify-center text-[#5A57FF]">{message}</p>
          </form>

          

          {/* Back to login */}
          <div className="text-center pt-4 border-t border-gray-100">
            <button
              onClick={handleBackToLogin}
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-gray-900 transition-colors duration-200 group"
              style={{ color: '#5A57FF' }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ForgotPassword;
