import { Bell, BellIcon, Download } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type User = {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null);

          useEffect(() => {
            const userData = localStorage.getItem("user");
            if (userData) {
              setUser(JSON.parse(userData));
            }
          }, []);
          
    return (
        <>
                {/* Header */}
                <header className="w-full h-[111px] bg-[#faf9ff] flex items-center justify-between px-6 relative z-10">
                  <div className="absolute top-[47px] left-[360px]">
                    <h1 className="font-['Poppins',Helvetica] font-extrabold text-[#353535] text-4xl">
                      Tax Calculator
                    </h1>
                  </div>
        
                  <div className="flex items-center gap-4 ml-auto">

        
                    <div className="relative">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Bell className="w-6 h-6 text-gray-600" />
                        <Badge className="absolute w-2 h-2 top-px right-px bg-[#ff5787] rounded border border-solid border-[#faf9ff]" />
                      </Button>
                    </div>
        
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-[50px] h-[50px]">
                          <AvatarImage
                            src="https://c.animaapp.com/masu33i4lo9YhV/img/ellipse-1.png"
                            alt="User avatar"
                          />
                          <AvatarFallback>{user?.firstname[0]}{user?.lastname[0]}</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute w-3 h-3 top-1 right-0 bg-[#53e88c] rounded-md border-2 border-solid border-[#faf9ff]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-['Poppins',Helvetica] font-semibold text-black text-xl">
                          {user?.firstname}&nbsp;&nbsp;{user?.lastname}
                        </span>
                        <span className="font-['Poppins',Helvetica] font-light text-[#666668] text-sm">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </header>
        </>
    )
}