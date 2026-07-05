import { ArrowLeft, Network } from 'lucide-react';
import Link from 'next/link';

// Simulating a slow 2-second user fetch
async function getUser() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { name: 'Alice Johnson', role: 'Admin' };
}

// Simulating a slow 2-second posts fetch
async function getPosts() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    { id: 1, title: 'Optimizing Next.js' },
    { id: 2, title: 'Understanding React 19' }
  ];
}

export default async function ParallelFetchingPage({ searchParams }: { searchParams: Promise<{ waterfall?: string }> }) {
  const params = await searchParams;
  const isWaterfall = params.waterfall === 'true';
  const startTime = Date.now();

  let user, posts;

  if (isWaterfall) {
    // Bad Pattern: Waterfall (Takes 4 seconds total)
    user = await getUser();
    posts = await getPosts();
  } else {
    // Good Pattern: Parallel (Takes 2 seconds total)
    [user, posts] = await Promise.all([
      getUser(),
      getPosts()
    ]);
  }

  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link href="/examples/nextjs-design-patterns" className="inline-flex items-center text-slate-400 hover:text-indigo-400 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Patterns
      </Link>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-400" /> Parallel Data Fetching
          </h1>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/30">SERVER COMPONENT</span>
        </div>

        <p className="text-slate-400 mb-8 max-w-2xl">
          This page fetches two independent endpoints that each take 2 seconds to resolve. Click the buttons below to toggle between Waterfall and Parallel fetching to see the performance difference.
        </p>

        <div className="flex gap-4 mb-8 p-4 bg-slate-950 rounded-2xl border border-slate-800">
          <Link 
            href="/examples/nextjs-design-patterns/parallel-fetching" 
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex-1 text-center ${!isWaterfall ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Run Parallel (Promise.all)
          </Link>
          <Link 
            href="/examples/nextjs-design-patterns/parallel-fetching?waterfall=true" 
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex-1 text-center ${isWaterfall ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Run Waterfall
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="text-sm text-slate-500 mb-1">Time Taken</div>
            <div className={`text-4xl font-black ${isWaterfall ? 'text-red-400' : 'text-indigo-400'}`}>
              {timeTaken}s
            </div>
          </div>

          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="text-sm text-slate-500 mb-4">Data Fetched</div>
            <div className="space-y-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">User Profile</span>
                <span className="text-slate-200">{user.name} ({user.role})</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Posts</span>
                <span className="text-slate-200">{posts.length} items retrieved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
