import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type LoginProps = {
  onLogin: (loggedIn: boolean) => void;
};


export const Login = ({ onLogin }: LoginProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        userId: data.userId,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      }));

      onLogin(true);
      if (email.endsWith("@admincomp.com")){
        navigate("/adminDashboard");
      } else {
        navigate("/")
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col md:flex-row">
      {/* Left branding section */}
      <div className="hidden md:flex md:w-1/2 h-[300px] md:h-full bg-[#5a57ff] items-center justify-center">
        <h1 className="text-white font-bold text-4xl md:text-6xl font-['Poppins']">
          LIKUTA Track
        </h1>
      </div>

      {/* Login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10">
        <div className="w-full max-w-[400px]">
          <h2 className="text-3xl md:text-4xl font-bold font-['Inter'] mb-2">Login</h2>
          <p className="text-[#818181] text-base mb-6 font-['Inter']">
            Please enter your login details to sign in.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[50px] border border-[#d1d1d1] hover:border-[#5a57ff] focus:border-[#5a57ff] rounded-[10px] pl-[10px] outline-none transition mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[50px] border border-[#d1d1d1] hover:border-[#5a57ff] focus:border-[#5a57ff] rounded-[10px] pl-[10px] outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end mb-4">
              <Link
                to="/forgotPassword"
                className="text-[#5a57ff] text-sm underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button className="w-full h-[50px] bg-[#5a57ff] hover:bg-[#3633fa] rounded-[10px] text-white font-bold text-lg">
              Log in
            </Button>
          </form>

          {/* Sign up */}
          <div className="text-center mt-6 text-sm">
            <span className="text-[#818181]">Don't have an account? </span>
            <Link to="/signupPage" className="text-[#5a57ff] underline">
              Sign up
            </Link>
          </div>

          {/* Social logins */}
          <div className="mt-10">
            <div className="flex items-center justify-center">
              <Separator className="w-[60px]" />
              <span className="mx-2 text-[#818181] text-sm">or continue with</span>
              <Separator className="w-[60px]" />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="w-[50px] h-[40px] rounded-[10px] border border-[#eaeaea] flex items-center justify-center">
                <img
                  src="https://c.animaapp.com/mau52tnhb6Fp25/img/rectangle-32.png"
                  alt="Google"
                  className="w-[24px] h-[24px]"
                />
              </button>
              <button className="w-[50px] h-[40px] rounded-[10px] border border-[#eaeaea] flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
