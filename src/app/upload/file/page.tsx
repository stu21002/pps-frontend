"use client";
import Image from "next/image";
import React from "react";

export default function folderPage() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => file.name);
      console.log("Selected Files:", fileList);
      alert(`Selected Files: ${fileList.join(", ")}`);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="sm:flex flex-row">
      <div className="sm:basis-2/5 text-center">
      <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select Files</h1>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Select Files
      </button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        multiple
        className="hidden"
      />
    </div>
      </div>
      <div className="sm:basis-3/5 text-center">
        Selected
      </div>

    </div>
  );
}
