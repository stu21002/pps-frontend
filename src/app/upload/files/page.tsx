"use client";
import React, { useState, useRef } from "react";

const DEFAULT_FILE_INFO = {
  size: 0,
  fileCount: 0,
}

export default function FilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [fileStats, setFileStats] = useState<{size: number; fileCount: number }>(DEFAULT_FILE_INFO);


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);

      let totalSize = 0;
      let fileCount = 0;
      // let folderName = '';

      Array.from(selectedFiles).forEach((file) => {
        // Accumulate total size
        totalSize += file.size;
        fileCount += 1;

        // Get the folder name from webkitRelativePath if available
       
      });

      // Update the stats
      setFileStats({
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
    setFileStats(DEFAULT_FILE_INFO)
    setFiles(undefined)
  }

  return (
    <div className="flex sm:flex-row sm:justify-center p-4 gap-4">
      {/* Folder Selection */}
      <div className="sm:basis-2/5 text-center p-4 flex justify-center rounded-md shadow-md">
        <div className="flex flex-row space-x-6 gap-8">
          {/* Folder Stats Section */}
          <div className="text-left">
            <h3 className="mb-2">Upload Stats:</h3>
            <p><strong>Total Files:</strong> {fileStats.fileCount}</p>
            <p><strong>Total Size:</strong> {
            Math.round((fileStats.size /1024/1024/1024)*100)/100
            } G</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            {/* Select Folder Button */}
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

            {/* Upload Button */}
            <button
              onClick={handleUploadClick}
              className={`px-4 py-2 rounded-md ${
                fileStats.fileCount ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
              } text-white`}
              disabled={!fileStats.fileCount}
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
