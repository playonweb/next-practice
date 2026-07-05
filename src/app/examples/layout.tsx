import Link from 'next/link';
import { Providers } from './providers';

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto px-4">
          <div className="flex gap-6 md:gap-10">
            <Link href="/examples" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Examples</span>
            </Link>
            <nav className="flex gap-6">
              <Link
                href="/examples/counter"
                className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Counter
              </Link>
              <Link
                href="/examples/todo"
                className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Todo
              </Link>
              <Link
                href="/examples/image-finder"
                className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Image Finder
              </Link>
              <Link
                href="/examples/blog"
                className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Providers>
          {children}
        </Providers>
      </main>
    </div>
  );
}
