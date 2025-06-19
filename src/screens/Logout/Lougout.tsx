import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Lougout = (): JSX.Element => {

    const navigate = useNavigate();
    const handleReturnToDashboard = () => {
        navigate("/");
    }

    const handleReturnToLogin = () => {
        navigate("/Login");
    }

  return (
    <div className="bg-[#faf9ff] flex flex-row justify-center w-full min-h-screen">
      {/* <div className="bg-[#faf9ff] w-full max-w-[1440px] h-[700px] relative"> */}
        
        <Card className="absolute w-[712px] h-[525px] top-[40px] left-[290px] rounded-[20px] shadow-[0px_4px_4px_#00000040]">
          <CardContent className="p-0">
             <div className="relative w-[110px] h-[110px] top-[58px] left-[301px] bg-[#e7f0ff] rounded-[55px] flex items-center justify-center cursor-pointer hover:bg-[#d5e6fd] transition-colors">
                <LogOut size={32} className="text-[#5a57ff]" />
             </div>

            <h2 className="absolute top-[184px] left-[230px] font-['Poppins',Helvetica] font-bold text-black text-3xl tracking-[0] leading-[normal]">
              Ready to leave?
            </h2>

            <p className="absolute top-[252px] left-[153px] font-['Poppins',Helvetica] font-normal text-black text-xm tracking-[0] leading-[normal] text-center">
              Thank you for using our application. You can safely <br />
              logout here below
            </p>

            <Button 
                className="absolute top-[333px] left-[76px] w-[568px] h-[54px] bg-[#5a57ff] hover:bg-[#4845ff] rounded-[20px] font-['Poppins',Helvetica] font-bold text-white text-[20px]"
                onClick={handleReturnToLogin}>
               <LogOut size={32} className="text-white" />Logout
            </Button>

            <Button
              variant="outline"
              className="absolute top-[406px] left-[77px] w-[568px] h-[54px] bg-[#e7f0ff] border-[#e2e2e2] hover:bg-gray-50 rounded-[20px] font-['Poppins',Helvetica] font-normal text-black text-[20px]"
              onClick={handleReturnToDashboard}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      {/* </div> */}
    </div>
  );
};
