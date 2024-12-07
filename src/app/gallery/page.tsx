"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import YearsSidebar from "../components/yearbar/yearbar";

// TypeScript type for the photo data
interface Photo {
  id: number;
  src: string;
  year: number;
}

// Sample API call function for fetching paginated photos
const fetchPhotos = async (page: number, year: number | null): Promise<Photo[]> => {
  const response = await fetch(`/api/photos?page=${page}&limit=20&year=${year}`);
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  return await response.json();
};

const localImageUrl = "/1.JPG";

const generateFakePhotos = async (page: number, limit: number): Promise<Photo[]> => {
  const photos: Photo[] = [];
  for (let i = 0; i < limit; i++) {
    photos.push({
      id: page * limit + i + 1,
      src: localImageUrl, // Use the same image for testing
      year: 2020 + (i % 5), // Just some random year assignment for testing
    });
  }
  return photos;
};

export default function GalleryPage() {
  const [renderedImages, setRenderedImages] = useState<Photo[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch initial photos when the page or year changes
  const loadPhotos = useCallback(async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const newPhotos = await generateFakePhotos(page, 20);
      setRenderedImages((prev) => [...prev, ...newPhotos]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedYear, loading]);

  // Effect to trigger initial load and subsequent page fetches
  useEffect(() => {
    loadPhotos();
  }, [page, selectedYear]);

  // Handle scroll event for infinite scrolling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; // Cast to HTMLDivElement
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1); // Trigger loading of more images
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* YEARS Section */}
      <YearsSidebar onYearClick={setSelectedYear} />

      {/* Gallery Section */}
      <div
        className="flex-1 p-2 h-screen overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="grid grid-cols-4 md:grid-cols-5 gap-1">
          {renderedImages.map((image, i) => (
            <div
              key={image.id || i}
              className="border border-sky-500 aspect-square flex items-center justify-center"
            >
              <Image
                src={image.src}
                alt={`Image ${i + 1}`}
                width={200}
                height={200}
                className="object-cover w-full h-full" // Ensures the image covers the container
              />
            </div>
          ))}
        </div>

        {loading && <div className="text-center py-4">Loading...</div>}
      </div>
    </div>
  );
}
