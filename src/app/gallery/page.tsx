import Image from "next/image";

export default function GalleryPage() {
  return (
    <div className="min-h-screen grid grid-cols-5 md:grid-cols-6">
      {/* YEARS Section */}
      <div className="hidden md:block bg-slate-200 h-screen overflow-y-auto">
        <div className="p-4 font-bold">YEARS</div>
        <ul>
          {Array.from({ length: 50 }, (_, i) => (
            <li key={i} className="p-2 border-b">
              Year {2000 + i}
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="col-span-5 p-2 h-screen overflow-y-auto">
        <div className="grid grid-cols-5 gap-1">
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
