'use client';

import { Loader2, Send } from 'lucide-react';
import { useOptimistic, useRef, useState, useTransition } from 'react';
import { submitData } from '../actions';

export function OptimisticList() {
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
    <>
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
    </>
  );
}
