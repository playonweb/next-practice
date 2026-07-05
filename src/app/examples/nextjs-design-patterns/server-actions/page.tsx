'use client';

import { ArrowLeft, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useOptimistic, useRef, useState, useTransition } from 'react';
import { submitData } from './actions';

export default function ServerActionsPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [items, setItems] = useState<string[]>(['Initial Server Data']);
  const [isPending, startTransition] = useTransition();

  // The optimistic state hook
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem: string) => [...state, newItem]
  );

  const handleSubmit = async (formData: FormData) => {
    const item = formData.get('item') as string;
    if (!item) return;

    formRef.current?.reset();

    startTransition(async () => {
      // 1. Instantly update the UI without waiting for the server
      addOptimisticItem(item);

      // 2. Actually call the server
      await submitData(formData);
      
      // 3. Update the "real" state
      setItems(prev => [...prev, item]);
    });
  };

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

        <form action={handleSubmit} ref={formRef} className="flex gap-4 mb-8">
          <input 
            type="text" 
            name="item" 
            placeholder="Type a new item..." 
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-emerald-500 transition-colors"
            required
          />
          <button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            Submit <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-200">Database Items</h3>
            {isPending && <span className="text-xs text-emerald-400 animate-pulse flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Syncing to server...</span>}
          </div>
          <ul className="space-y-3">
            {optimisticItems.map((item, index) => (
              <li key={index} className={`p-4 rounded-xl border flex items-center justify-between ${
                // If it's a new item and we're still pending, style it differently to show it's optimistic
                isPending && index === optimisticItems.length - 1 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                {item}
                {isPending && index === optimisticItems.length - 1 && (
                  <span className="text-[10px] uppercase font-bold px-2 py-1 bg-emerald-500/20 rounded">Optimistic</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
