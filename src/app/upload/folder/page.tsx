"use client";
import React, { useState, useRef } from "react";

const DEFAULT_FOLDER_INFO = {
  name: 'None selected',
  size: 0,
  fileCount: 0,
}

export default function FolderPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [folderStats, setFolderStats] = useState<{ name: string; size: number; fileCount: number }>(DEFAULT_FOLDER_INFO);


  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);

      let totalSize = 0;
      let fileCount = 0;
      let folderName = '';

      Array.from(selectedFiles).forEach((file) => {
        // Accumulate total size
        totalSize += file.size;
        fileCount += 1;

        // Get the folder name from webkitRelativePath if available
        if (file.webkitRelativePath) {
          const parts = file.webkitRelativePath.split('/');
          if (parts.length > 1) {
            folderName = parts[0]; // Get the folder name (first part of the path)
          }
        }
      });

      // Update the stats
      setFolderStats({
        name: folderName || 'Unknown Folder',
        size: totalSize,
        fileCount: fileCount,
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = () => {
    console.log("Files uploaded")
    setFolderStats(DEFAULT_FOLDER_INFO)
    setFiles(undefined)
  }

  return (
    <div className="sm:flex sm:justify-center flex-row p-4 gap-4">
      {/* Folder Selection */}
      <div className="sm:basis-2/5 text-center p-4 flex justify-center rounded-md shadow-md">
        <div className="flex flex-row space-x-6 gap-8">
          {/* Folder Stats Section */}
          <div className="text-left">
            <h3>Folder Stats:</h3>
            <p><strong>Folder Name:</strong> {folderStats.name}</p>
            <p><strong>Total Files:</strong> {folderStats.fileCount}</p>
            <p><strong>Total Size:</strong> {
            Math.round((folderStats.size /1024/1024/1024)*100)/100
            } G</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            {/* Select Folder Button */}
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Select Folder
            </button>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFolderSelect}
              multiple
              webkitdirectory="true" // Enables folder selection
              className="hidden"
            />

            {/* Upload Button */}
            <button
              onClick={handleUploadClick}
              className={`px-4 py-2 rounded-md ${
                folderStats.fileCount ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
              } text-white`}
              disabled={!folderStats.fileCount}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Selection Information */}
      <div className="sm:basis-3/5 text-left w-full bg-gray-100 p-4 rounded-md shadow-md">    
        <p className="font-medium mb-2">Selected Files:</p>
        <ul className="list-disc pl-5">
          {files && files.length > 0 ? (
            Array.from(files).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))
          ) : (
            <p className="text-gray-500">No files selected</p>
          )}
        </ul>
      </div>
  </div>

  );
}
