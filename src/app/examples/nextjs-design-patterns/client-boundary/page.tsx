import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductList } from './components/ProductList';
import { getHeavyServerData } from './lib/data';

export default async function ClientBoundaryPage() {
  // This runs entirely on the server and does not ship to the client.
  const data = await getHeavyServerData();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link href="/examples/nextjs-design-patterns" className="inline-flex items-center text-slate-400 hover:text-fuchsia-400 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Patterns
      </Link>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-400 text-xs font-bold rounded-full border border-fuchsia-500/30">SERVER COMPONENT</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Client Boundary Push</h1>
        <p className="text-slate-400 mb-8 max-w-2xl">
          This entire page is a Server Component. It fetched the list of products below securely from the server (with a simulated 2s delay). Because we only need interactivity for the counter, we isolated the <code>"use client"</code> directive into a tiny leaf component.
        </p>

        <ProductList data={data} />
      </div>
    </div>
  );
}
