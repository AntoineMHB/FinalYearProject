import React from "react";

export const SlideMenuByAnima = (): JSX.Element => {
  // Menu items data for easier management and mapping
  const menuItems = [
    { id: 1, label: "Dashboard", isActive: true },
    { id: 2, label: "Budget Automation", isActive: false },
    { id: 3, label: "Tax Calculations", isActive: false, multiline: true },
    { id: 4, label: "Data Analytics", isActive: false, multiline: true },
    { id: 5, label: "Settings", isActive: false },
    { id: 6, label: "Log out", isActive: false },
  ];

  return (
    <nav className="w-[326px] py-4">
      <ul className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <li key={item.id} className="relative flex items-center">
            {item.isActive && (
              <div className="absolute left-0 w-1 h-[72px] bg-[#faf9ff]" />
            )}
            <div
              className={`flex items-center px-4 py-2 ml-[109px] ${
                item.isActive ? "text-white" : "text-[#c2c0ff]"
              }`}
            >
              <span
                className={`font-normal text-xl [font-family:'Poppins',Helvetica] leading-normal ${
                  item.multiline ? "whitespace-pre-line" : ""
                }`}
              >
                {item.multiline ? item.label.split(" ").join("\n") : item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
