import React from "react";

interface YearsSidebarProps {
  onYearClick: (year: number) => void; // Callback function for when a year is clicked
}

const YearsSidebar: React.FC<YearsSidebarProps> = ({ onYearClick }) => {
  return (
    <div className="hidden md:block bg-slate-200 w-1/5 h-screen overflow-y-auto">
      <ul>
        {Array.from({ length: 50 }, (_, i) => {
          const year = 2000 + i;
          return (
            <li
              key={year}
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => onYearClick(year)} // Trigger onYearClick when clicked
            >
              Year {year}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default YearsSidebar;
