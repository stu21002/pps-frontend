"use client";

import Image from "next/image";
import { useState } from "react";
import YearsSidebar from "../components/yearbar/yearbar";

export default function GalleryPage() {

  const [selectedYear,setSelectedYear] = useState<number|null>(null);

  return (
    <div className="min-h-screen flex">
      {/* YEARS Section */}
      <YearsSidebar onYearClick={setSelectedYear}></YearsSidebar>

      {/* Gallery Section */}
      <div className="flex-1 p-2 h-screen overflow-y-auto">
        <div className="grid grid-cols-4 md:grid-cols-5 gap-1">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="border border-sky-500 aspect-square flex items-center justify-center"
            >
              Image {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
