import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2, Lock } from 'lucide-react';

export const ResetPassword = () => {
type PageState = 'forgot' | 'reset' | 'success';

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

    const validatePassword = (password: string) => {
    return password.length >= 2;
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

      setIsLoading(true);

      try {
        await axios.post("http://localhost:8080/reset-password", { token, password, });
        setMessage("Password reset successful.");
      } catch {
        setMessage("Reset failed.");
      } finally {
        setIsLoading(false);
      }   
    }

  const handleBackToLogin = () => {
    setCurrentPage('forgot');
    setIsSubmitted(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    navigate("/login");
  };



  return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#5A57FF' }}>
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Set new password</h1>
              <p className="text-gray-600 leading-relaxed">
                Your new password must be different from previously used passwords.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your new password"
                    className={`
                      w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200
                      placeholder-gray-400 text-gray-900 bg-white
                      focus:outline-none focus:ring-0
                      ${focusedField === 'password' ? 'border-[#5A57FF] shadow-[0_0_0_3px_rgba(90,87,255,0.1)]' : 'border-gray-200'}
                      ${error && !password ? 'border-red-300 focus:border-red-500' : ''}
                      hover:border-gray-300
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 8 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Confirm your new password"
                    className={`
                      w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200
                      placeholder-gray-400 text-gray-900 bg-white
                      focus:outline-none focus:ring-0
                      ${focusedField === 'confirmPassword' ? 'border-[#5A57FF] shadow-[0_0_0_3px_rgba(90,87,255,0.1)]' : 'border-gray-200'}
                      ${error && password !== confirmPassword ? 'border-red-300 focus:border-red-500' : ''}
                      hover:border-gray-300
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

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
                    Updating password...
                  </div>
                ) : (
                  'Update password'
                )}
              </button>
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
};



