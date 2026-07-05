import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ChartSkeleton, SlowChart } from './components/SlowChart';

export default function SuspensePage() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link href="/examples/nextjs-design-patterns" className="inline-flex items-center text-slate-400 hover:text-blue-400 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Patterns
      </Link>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">Static Shell + Dynamic Islands</h1>
        <p className="text-slate-400 mb-8 max-w-2xl">
          This shell loaded instantly. We wrapped the heavy analytics chart below in a native React <code>&lt;Suspense&gt;</code> boundary. The server streams the HTML for the shell first, and then pops in the chart data 3 seconds later without blocking the page load.
        </p>

        {/* Instant Static Shell content */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 text-sm mb-1">Total Users</div>
            <div className="text-2xl font-bold text-slate-200">24,592</div>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 text-sm mb-1">Revenue</div>
            <div className="text-2xl font-bold text-slate-200">$45,231</div>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-slate-500 text-sm mb-1">Active Now</div>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 1,204
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-800 rounded-2xl bg-slate-900/50 relative">
          <div className="absolute top-0 right-0 p-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">STREAMED ISLAND</span>
          </div>
          <h3 className="text-xl font-bold text-slate-200">Live Traffic</h3>
          
          <Suspense fallback={<ChartSkeleton />}>
            <SlowChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
