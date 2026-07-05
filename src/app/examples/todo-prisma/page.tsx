import { Suspense } from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { createTodo, deleteTodo, toggleTodo } from './actions';

async function TodoList() {
  const todos = await prisma.prismaTodo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                todo.completed
                  ? 'bg-slate-800/50 border-slate-700/50'
                  : 'bg-slate-800 border-slate-700 hover:border-indigo-500/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <form action={toggleTodo.bind(null, todo.id, !todo.completed)}>
                  <button
                    type="submit"
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                      todo.completed
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-slate-500 hover:border-indigo-400'
                    }`}
                  >
                    {todo.completed && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </form>
                <span className={`text-lg transition-colors ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                  {todo.text}
                </span>
              </div>
              <form action={deleteTodo.bind(null, todo.id)}>
                <button
                  type="submit"
                  className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-700/50"
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PrismaTodoPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/examples" className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium transition-colors mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Examples
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Prisma Todo App</h1>
        <p className="text-slate-400">
          A server-side rendered Todo list using React Server Components, Server Actions, and Prisma ORM.
        </p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm mb-8">
        <form action={createTodo} className="flex gap-3 mb-6">
          <input
            type="text"
            name="text"
            placeholder="What needs to be done?"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Add
          </button>
        </form>

        <Suspense fallback={<div className="text-center py-8 text-slate-500">Loading tasks...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  );
}
