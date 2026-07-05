'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { useTodoStore } from './store';

export default function TodoApp() {
  const [input, setInput] = useState('');
  
  // To avoid hydration mismatch with Zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const todos = useTodoStore(state => state.todos);
  const filter = useTodoStore(state => state.filter);
  const addTodoStore = useTodoStore(state => state.addTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const setFilter = useTodoStore(state => state.setFilter);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    addTodoStore(input.trim());
    setInput('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  if (!mounted) return null; // Wait for hydration

  return (
    <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center">
      <div className="text-center mb-10 w-full">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4">
          <ListTodo className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          Task Management
        </h1>
        <p className="text-slate-400">
          Stay organized with this premium to-do list featuring glassmorphism and smooth state transitions.
        </p>
      </div>

      <div className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2 text-slate-400 font-medium">
            <span>Task Progress</span>
            <span className="text-emerald-400">{completedCount} / {todos.length}</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${todos.length === 0 ? 0 : (completedCount / todos.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={addTodo} className="relative mb-8 group">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-focus-within:opacity-30 transition-opacity blur"></div>
          <div className="relative flex items-center bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 focus-within:border-emerald-500/50 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 bg-transparent px-6 py-4 outline-none text-slate-200 placeholder:text-slate-600"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="mx-2 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all disabled:cursor-not-allowed"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-6">
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f 
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>No tasks found. Time to relax! ☕</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div 
                key={todo.id}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  todo.completed 
                    ? 'bg-slate-900/40 border-slate-800/50 opacity-60' 
                    : 'bg-slate-800/40 border-slate-700 hover:border-emerald-500/30 hover:bg-slate-800/80'
                }`}
              >
                <button 
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0 text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                
                <span className={`flex-1 text-lg transition-all ${
                  todo.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                }`}>
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all focus:opacity-100 outline-none"
                  aria-label="Delete task"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
