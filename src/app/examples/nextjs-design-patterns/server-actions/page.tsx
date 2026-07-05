import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { OptimisticList } from './components/OptimisticList';

export default function ServerActionsPage() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link href="/examples/nextjs-design-patterns" className="inline-flex items-center text-slate-400 hover:text-emerald-400 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Patterns
      </Link>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">CLIENT BOUNDARY</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Server Actions + Optimistic UI</h1>
        <p className="text-slate-400 mb-8 max-w-2xl">
          When you submit this form, it calls a secure Server Action that sleeps for 2 seconds. Because we are using <code>useOptimistic</code>, the UI updates <strong>instantly</strong>, offering a lightning-fast user experience while the backend processes the mutation.
        </p>

        <OptimisticList />
      </div>
    </div>
  );
}
