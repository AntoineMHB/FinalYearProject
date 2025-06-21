import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export const Signup = (): JSX.Element => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/register", {
        firstname,
        lastname,
        email,
        password,
        role,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/login");
    } catch (error: unknown) {
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        alert(`Signup failed: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-white">
      {/* Left side */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#5a57ff] items-center justify-center">
        <h1 className="text-white font-bold text-4xl md:text-6xl font-['Poppins']">
          LIKUTA Track
        </h1>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10">
        <div className="w-full max-w-[400px]">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-['Inter']">Sign up</h2>
          <p className="text-[#818181] text-base mb-6 font-['Inter']">
            Please enter your details to create an account.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className="w-full h-[50px] mb-4 border border-[#d1d1d1] hover:border-[#5a57ff] focus:border-[#5a57ff] rounded-[10px] pl-[10px] outline-none transition"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-[50px] mb-4 border border-[#d1d1d1] hover:border-[#5a57ff] focus:border-[#5a57ff] rounded-[10px] pl-[10px] outline-none transition"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full h-[50px] mb-4 border border-[#d1d1d1] hover:border-[#5a57ff] focus:border-[#5a57ff] rounded-[10px] pl-[10px] outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

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

            <Button className="w-full h-[50px] bg-[#5a57ff] hover:bg-[#3633fa] rounded-[10px] shadow-[0px_15px_30px_-10px_#5a57ff2e] text-white font-bold text-lg">
              Create account
            </Button>
          </form>

          <div className="text-center mt-6 text-sm">
            <span className="text-[#818181]">Already have an account? </span>
            <Link to="/login" className="text-[#5a57ff] underline font-semibold">Log in</Link>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-center">
              <Separator className="w-[60px]" />
              <span className="mx-2 text-[#818181] text-sm">or continue with</span>
              <Separator className="w-[60px]" />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button className="w-[50px] h-[40px] border border-[#eaeaea] rounded-[10px] flex items-center justify-center">
                <img
                  src="https://c.animaapp.com/mau52tnhb6Fp25/img/rectangle-32.png"
                  alt="Google"
                  className="w-[24px] h-[24px]"
                />
              </button>
              <button className="w-[50px] h-[40px] border border-[#eaeaea] rounded-[10px] flex items-center justify-center">
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
