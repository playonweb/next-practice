'use client';

import { useState } from 'react';
import { setKvValue, getKvValue, removeKvValue, setBlobValue, getBlobValue, removeBlobValue } from './actions';
import Link from 'next/link';

type StorageType = 'kv' | 'blob';

export default function UnstorageExample() {
  const [type, setType] = useState<StorageType>('kv');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const actions = {
    kv: { set: setKvValue, get: getKvValue, remove: removeKvValue },
    blob: { set: setBlobValue, get: getBlobValue, remove: removeBlobValue }
  };

  const handleSet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await actions[type].set(key, value);
      setMessage(`Successfully set "${key}" in ${type.toUpperCase()}!`);
      setResult(null);
    } catch (err) {
      setMessage(`Error setting value.`);
    }
  };

  const handleGet = async () => {
    try {
      const val = await actions[type].get(key);
      let displayVal = val;
      if (typeof val === 'object' && val !== null) {
        displayVal = JSON.stringify(val, null, 2);
      }
      setResult(displayVal !== null ? String(displayVal) : 'Not found');
      setMessage(`Successfully retrieved "${key}" from ${type.toUpperCase()}`);
    } catch (err) {
      setMessage(`Error getting value.`);
    }
  };

  const handleRemove = async () => {
    try {
      await actions[type].remove(key);
      setMessage(`Successfully removed "${key}" from ${type.toUpperCase()}`);
      setResult(null);
    } catch (err) {
      setMessage(`Error removing value.`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <div className="mb-8">
        <Link href="/examples" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 mb-6 transition-colors">
          &larr; Back to Examples
        </Link>
        <h1 className="text-3xl font-bold mb-2">Unstorage Example</h1>
        <p className="text-slate-400">Test your universal Key-Value and Blob storage implementation</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => { setType('kv'); setResult(null); setMessage(''); }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${type === 'kv' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            KV Storage
          </button>
          <button
            onClick={() => { setType('blob'); setResult(null); setMessage(''); }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${type === 'blob' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Blob Storage
          </button>
        </div>

        <form onSubmit={handleSet} className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap items-center bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
            <span className="text-xs font-medium text-slate-400 mr-2 uppercase tracking-wider">Quick Examples:</span>
            <button type="button" onClick={() => {setKey('user:101:profile'); setValue(JSON.stringify({ name: 'Alice', role: 'Admin' }))}} className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-md text-indigo-300 transition-colors">JSON Object</button>
            <button type="button" onClick={() => {setKey('settings:theme'); setValue('dark-mode')}} className="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-md text-emerald-300 transition-colors">Simple String</button>
            <button type="button" onClick={() => {setKey('assets/homepage/banner.txt'); setValue('Welcome to our new application!')}} className="text-xs bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 px-3 py-1.5 rounded-md text-pink-300 transition-colors">File Path (Blob)</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Key / Path</label>
            <input 
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={type === 'kv' ? "e.g. user:123:name" : "e.g. folder/file.txt"}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Content Value</label>
            <input 
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={type === 'kv' ? "e.g. John Doe" : "e.g. File content string..."}
            />
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Write
            </button>
            <button 
              type="button"
              onClick={handleGet}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Read
            </button>
            <button 
              type="button"
              onClick={handleRemove}
              className="flex-1 bg-rose-900/50 hover:bg-rose-900 border border-rose-800 text-rose-200 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-slate-300">{message}</p>
            {result !== null && (
              <div className="mt-2 font-mono bg-slate-900 p-3 rounded border border-slate-800 text-emerald-400 overflow-x-auto whitespace-pre-wrap break-words">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
