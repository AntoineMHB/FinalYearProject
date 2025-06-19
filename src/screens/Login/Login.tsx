import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";

export const Login = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-screen relative">
        {/* Left side with brand */}
        <div className="absolute w-[800px] h-screen top-0 left-0 bg-[#5a57ff] flex items-center justify-center">
          <h1 className="font-['Poppins',Helvetica] font-bold text-white text-6xl tracking-[0] leading-[normal] whitespace-nowrap">
            LIKUTA Track
          </h1>
        </div>

        {/* Right side with login form */}
        <div className="absolute top-[40px] left-[900px] space-y-4">
          <h2 className="font-['Inter',Helvetica] font-bold text-black text-[50px] tracking-[0] leading-[normal]">
            Login
          </h2>

          <p className="font-['Inter',Helvetica] font-normal text-[#818181] text-base tracking-[0] leading-[normal] whitespace-nowrap">
            Please enter your login details to sign in.
          </p>

          {/* Email input */}
          <Card className="w-[370px] h-[60px] mt-6 border-[#5a57ff] rounded-[10px]">
            <CardContent className="p-0">
              <div className="relative w-full h-full">
                <div className="absolute top-1.5 left-3.5 font-['Inter',Helvetica] font-normal text-[#818181] text-[11px] tracking-[0] leading-[normal] whitespace-nowrap">
                  Email Address
                </div>
                <div className="absolute top-[29px] left-3.5 font-['Inter',Helvetica] font-normal text-black text-base tracking-[0] leading-[normal] whitespace-nowrap">
                  info@gmail.com
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password input */}
          <Card className="w-[370px] h-[60px] border-[#d1d1d1] rounded-[10px]">
            <CardContent className="p-0">
              <div className="relative w-full h-full">
                <div className="absolute top-5 left-3.5 font-['Inter',Helvetica] font-normal text-[#818181] text-base tracking-[0] leading-[normal] whitespace-nowrap">
                  Password
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remember me and forgot password */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-3">
              <Checkbox
                id="remember"
                className="w-[23px] h-[23px] rounded-sm bg-[#5a57ff] border-none"
              >
                <img
                  className="w-2 h-[7px]"
                  alt="Vector"
                  src="https://c.animaapp.com/mau52tnhb6Fp25/img/vector-1.svg"
                />
              </Checkbox>
              <label
                htmlFor="remember"
                className="font-['Inter',Helvetica] font-normal text-[#818181] text-base tracking-[0] leading-[normal] whitespace-nowrap"
              >
                Keep me logged in
              </label>
            </div>
            <button className="font-['Inter',Helvetica] font-normal text-[#5a57ff] text-base text-right tracking-[0] leading-[normal] whitespace-nowrap">
              Forgot password
            </button>
          </div>

          {/* Login button */}
          <Button className="w-[370px] h-[60px] bg-[#5a57ff] rounded-[10px] shadow-[0px_15px_30px_-10px_#5a57ff2e] mt-10">
            <span className="font-['Inter',Helvetica] font-bold text-[#faf9ff] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Log in
            </span>
          </Button>

          {/* Sign up link */}
          <div className="text-center mt-6 font-['Inter',Helvetica] font-normal text-base tracking-[0] leading-[normal] whitespace-nowrap">
            <span className="text-[#818181]">Don&apos;t have an account? </span>
            <span className="font-bold text-[#5a57ff]">Sign up</span>
          </div>

          {/* Social login section */}
          <div className="mt-16 w-[372px]">
            <div className="flex items-center justify-center">
              <Separator className="w-[82px]" />
              <span className="mx-4 font-['Inter',Helvetica] font-normal text-[#818181] text-base tracking-[0] leading-[normal] whitespace-nowrap">
                or continue with
              </span>
              <Separator className="w-[82px]" />
            </div>

            {/* Social login buttons */}
            <div className="flex justify-end gap-2 mt-8">
              <div className="w-[55px] h-[41px] rounded-[10px] border border-solid border-[#eaeaea] flex items-center justify-center">
                <img
                  className="w-[27px] h-[29px] object-cover"
                  alt="Google"
                  src="https://c.animaapp.com/mau52tnhb6Fp25/img/rectangle-32.png"
                />
              </div>
              <div className="w-[55px] h-[41px] rounded-[10px] border border-solid border-[#eaeaea] flex items-center justify-center">
                <img
                  className="w-5 h-[25px] object-cover"
                  alt="Apple"
                  src="https://c.animaapp.com/mau52tnhb6Fp25/img/rectangle.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
