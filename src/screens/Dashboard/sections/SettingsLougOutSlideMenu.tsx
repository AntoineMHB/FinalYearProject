import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // make sure you are using react-router

export const SettingsLougOutSlideMenu = (): JSX.Element => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, path: "/settings", label: "Settings", icon: CiSettings, multiline: true },
    { id: 2, path: "/logOut", label: "Loug Out", icon:IoLogOut, multiline: false },
  ];

  // Track the currently active item's ID
  const [activeId, setActiveId] = useState<number>(0); // default active item

  const handleItemClick = (id: number, path: string) => {
    setActiveId(id);       // update active menu
    navigate(path);        // navigate to the clicked path
  };

  return (
    <div className="w-[326px] py-4">
      <ul className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li
              key={item.id}
              className="relative flex items-center cursor-pointer"
              onClick={() => handleItemClick(item.id, item.path)}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-[72px] bg-[#faf9ff]" />
              )}

              <div
                className={`flex items-center px-4 py-2 ml-[10px]  top-[546px] transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#c2c0ff]"
                }`}
              >
                {item.icon &&
                  React.createElement(item.icon as React.ElementType, {
                    className: "mr-2 text-2xl",
                  })}

                <span
                  className={`font-normal text-xl [font-family:'Poppins',Helvetica] leading-normal ${
                    item.multiline ? "whitespace-pre-line" : ""
                  }`}
                >
                  {item.multiline
                    ? item.label.split(" ").join("\n")
                    : item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
