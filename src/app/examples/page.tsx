import Link from 'next/link';

const examples = [
  {
    title: 'Counter App',
    href: '/examples/counter',
    description: 'A beautiful counter application demonstrating state management and micro-animations.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Todo App',
    href: '/examples/todo',
    description: 'Task management with CRUD operations, smooth transitions, and local state.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Image Finder',
    href: '/examples/image-finder',
    description: 'Search and discover images with a masonry grid layout and mock API integration.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Next Blog',
    href: '/examples/blog',
    description: 'A simple blog application demonstrating Next.js routing and data fetching.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Design Patterns',
    href: '/examples/nextjs-design-patterns',
    description: 'Explore advanced React and Next.js 14+ architectural patterns including Server Components.',
    color: 'from-fuchsia-500 to-rose-500',
  },
  {
    title: 'RSC Todo App',
    href: '/examples/todo-rsc',
    description: 'A Server Components-based Todo app integrated with SQLite and Drizzle ORM.',
    color: 'from-indigo-500 to-cyan-500',
  },
  {
    title: 'Enterprise MVC Todo',
    href: '/examples/todo-rsc-mvc',
    description: 'A scalable pattern separating Data Access (Service), Server Actions (Controller), and UI (View).',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'API-First Todo',
    href: '/examples/todo-api-first',
    description: 'A classic API-driven architecture using Next.js Route Handlers and TanStack React Query.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Prisma Todo App',
    href: '/examples/todo-prisma',
    description: 'A Server Components-based Todo app integrated with SQLite and Prisma ORM.',
    color: 'from-fuchsia-500 to-purple-500',
  },
  {
    title: 'Custom Storage',
    href: '/examples/storage',
    description: 'A playground to test custom Key-Value and Blob storage wrappers.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Vercel Workflows',
    href: '/examples/workflow',
    description: 'Durable background tasks that can pause, resume, and handle errors automatically.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Vercel Cron Jobs',
    href: '/api/cron',
    description: 'An automated scheduled task that triggers a background workflow daily.',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function ExamplesPage() {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          React <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Example Apps</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Explore these premium example applications built with Next.js, Tailwind CSS, and React. 
          Each app demonstrates different core concepts and modern design aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:bg-slate-800 hover:border-slate-700"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20`}>
              <div className={`h-24 w-24 rounded-full bg-gradient-to-br blur-2xl ${example.color}`} />
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
              {example.title}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {example.description}
            </p>
            
            <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
              View App
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
