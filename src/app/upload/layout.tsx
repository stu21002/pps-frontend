"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div>
      <div className="bg-slate-200 flex flex-row text-center">
        <Link
          href="/upload/folder"
          className={`basis-1/2 block px-3 py-2 rounded-md text-base font-medium ${
            pathname === "/upload/folder" ? "bg-blue-500 text-white" : "text-black hover:bg-blue-500"
          }`}
        >
          Folder
        </Link>
        <Link
          href="/upload/file"
          className={`basis-1/2 block px-3 py-2 rounded-md text-base font-medium ${
            pathname === "/upload/file" ? "bg-blue-500 text-white" : "text-black hover:bg-blue-500"
          }`}
        >
          File
        </Link>
      </div>
      {children}
    </div>
  );
}
