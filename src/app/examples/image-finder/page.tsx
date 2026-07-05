'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Image as ImageIcon, Loader2 } from 'lucide-react';

interface MockImage {
  id: string;
  url: string;
  title: string;
  author: string;
  height: number;
}

const mockImages: MockImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', title: 'Mountain Landscape', author: 'John Doe', height: 400 },
  { id: '2', url: 'https://images.unsplash.com/photo-1682687982501-1e58f813222a', title: 'Ocean Waves', author: 'Jane Smith', height: 300 },
  { id: '3', url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538', title: 'Desert Dunes', author: 'Alice Brown', height: 500 },
  { id: '4', url: 'https://images.unsplash.com/photo-1682695794816-7b9da18ed470', title: 'Forest Path', author: 'Bob White', height: 350 },
  { id: '5', url: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b', title: 'City Skyline', author: 'Charlie Green', height: 450 },
  { id: '6', url: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc', title: 'Starry Night', author: 'Diana Blue', height: 300 },
  { id: '7', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', title: 'Peaceful Valley', author: 'Evan Black', height: 400 },
  { id: '8', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', title: 'Misty Mountains', author: 'Fiona Gray', height: 500 },
];

const fetchImages = async (searchQuery: string): Promise<MockImage[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!searchQuery) return mockImages;

  const q = searchQuery.toLowerCase();
  const filtered = mockImages.filter(img => 
    img.title.toLowerCase().includes(q) || img.author.toLowerCase().includes(q)
  );
  
  return filtered.length > 0 ? filtered : mockImages.slice(0, 3);
};

export default function ImageFinderApp() {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data: images = [], isLoading, isFetching } = useQuery({
    queryKey: ['images', activeQuery],
    queryFn: () => fetchImages(activeQuery),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setActiveQuery(searchInput);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 flex flex-col items-center">
      <div className="text-center mb-12 w-full max-w-2xl">
        <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl mb-4">
          <ImageIcon className="w-8 h-8 text-purple-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Image Finder
        </h1>
        <p className="text-slate-400">
          Search and discover beautiful imagery. This example uses simulated data mimicking the Unsplash API.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-12">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 group-focus-within:opacity-40 transition-opacity blur-lg"></div>
          <div className="relative flex items-center bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl focus-within:border-purple-500/50 transition-colors">
            <div className="pl-6 text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for 'mountains', 'ocean'..."
              className="flex-1 bg-transparent px-4 py-5 outline-none text-slate-200 placeholder:text-slate-600 text-lg"
            />
            <button
              type="submit"
              disabled={isLoading || isFetching}
              className="mx-3 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium rounded-xl transition-all disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading || isFetching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Image Grid */}
      <div className="w-full">
        {(isLoading || isFetching) && !hasSearched ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50"
              >
                <div 
                  className="w-full bg-slate-800 relative"
                  style={{ height: `${img.height}px` }}
                >
                  <img
                    src={`${img.url}?auto=format&fit=crop&w=600&q=80`}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-bold text-lg mb-1">{img.title}</h3>
                    <p className="text-slate-300 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                        {img.author.charAt(0)}
                      </span>
                      {img.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isFetching && images.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-4">
              <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-300 mb-2">No images found</h3>
            <p className="text-slate-500">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
