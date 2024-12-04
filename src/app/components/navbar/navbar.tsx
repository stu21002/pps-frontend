"use client"; 

import { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState("Home");

  return (
    <nav className="bg-blue-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <Link  href="/" className="text-white font-bold text-xl">MyApp</Link> */}
            <div className="text-white font-bold text-xl">{page}</div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link onClick={()=>setPage("Home")} href="/" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  Home
              </Link>
              <Link onClick={()=>setPage("Gallery")} href="/gallery" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  Gallery
              </Link>
              <Link onClick={()=>setPage("Upload")} href="/upload" className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Upload
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-500 text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link onClick={()=>setPage("Home")} href="/" className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                Home
            </Link>
            <Link onClick={()=>setPage("Gallery")} href="/gallery" className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium">
                Gallery
            </Link>
            <Link onClick={()=>setPage("Upload")} href="/upload"  className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium">
              Upload
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
