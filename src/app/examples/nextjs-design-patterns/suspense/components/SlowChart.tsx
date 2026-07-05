import { Loader2 } from 'lucide-react';
import { getSlowAnalyticsData } from '../lib/data';

export async function SlowChart() {
  const data = await getSlowAnalyticsData();
  
  return (
    <div className="flex items-end h-48 gap-2 w-full mt-8">
      {data.map((val, i) => (
        <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm" style={{ height: `${val}%` }}></div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-48 w-full mt-8 bg-slate-950 border border-slate-800 border-dashed rounded-xl">
      <div className="flex flex-col items-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-500" />
        <span>Streaming heavy data...</span>
      </div>
    </div>
  );
}
