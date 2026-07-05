'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useCounterStore } from './store';

export default function CounterApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  const reset = useCounterStore(state => state.reset);

  if (!mounted) return null; // Wait for hydration

  return (
    <div className="max-w-2xl mx-auto mt-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Interactive Counter
        </h1>
        <p className="text-slate-400">
          A beautifully designed counter demonstrating React state with micro-interactions.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-xl transition-all group-hover:opacity-40"></div>
        
        <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-12 shadow-2xl flex flex-col items-center">
          
          <div className="relative flex items-center justify-center w-48 h-48 mb-8">
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${Math.min(100, Math.max(0, 50 + count * 5))}% 0%, 100% ${Math.min(100, Math.max(0, count * 5))}%, ${Math.min(100, Math.max(0, 100 - count * 5))}% 100%, 0% ${Math.min(100, Math.max(0, 100 - (count - 10) * 5))}%, 0% 0%)`,
                opacity: count === 0 ? 0 : 1
              }}
            ></div>
            <span className={`text-7xl font-black transition-all duration-300 ${count > 0 ? 'text-blue-400' : count < 0 ? 'text-red-400' : 'text-slate-200'}`}>
              {count}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={decrement}
              className="group flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 transition-all hover:bg-slate-700 hover:text-white hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Decrement"
            >
              <Minus className="w-8 h-8 transition-transform group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={reset}
              className="group flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 transition-all hover:bg-slate-700 hover:text-white hover:rotate-180 active:scale-95"
              aria-label="Reset"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={increment}
              className="group flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 border border-blue-500 text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              aria-label="Increment"
            >
              <Plus className="w-8 h-8 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
