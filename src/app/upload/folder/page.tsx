"use client";
import React from "react";

export default function FolderPage() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      // Loop through the fileList directly and print each file's name
      Array.from(files).forEach((file) => {
        // Print the file name and webkitRelativePath if available
        console.log(file.name);
        if (file.webkitRelativePath) {
          console.log(`Full path: ${file.webkitRelativePath}`);
        }
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="sm:flex flex-row">
      {/* Folder Selection */}
      <div className="sm:basis-2/5 text-center p-4">
        <h1 className="text-xl font-bold mb-4">Select a Folder</h1>
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Select Folder
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          multiple
          webkitdirectory="true" // Enables folder selection
          className="hidden"
        />
      </div>

      {/* Selection Information */}
      <div className="sm:basis-3/5 text-center p-4">
        <h2 className="text-lg font-semibold">Selected</h2>
        {/* Placeholder for displaying selected files/folder contents */}
        <p className="text-gray-500">Files will appear here...</p>
      </div>
    </div>
  );
}
