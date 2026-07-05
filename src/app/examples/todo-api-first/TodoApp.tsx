"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTodos, useCreateTodo, useToggleTodo, useDeleteTodo } from "./sdk";

export default function TodoApp() {
  const [text, setText] = useState("");

  const { data: todos, isLoading, isError } = useTodos();
  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      createMutation.mutate(text, {
        onSuccess: () => setText(""),
      });
    }
  };

  if (isLoading) return <p className="text-center text-zinc-500">Loading todos...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load todos.</p>;

  return (
    <div>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          disabled={createMutation.isPending}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {todos?.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400 mt-4">
          No todos yet. Add one above!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-md dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleMutation.mutate(todo)}
                  disabled={toggleMutation.isPending}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                />
                <span
                  className={`text-lg transition-all ${
                    todo.completed
                      ? "line-through text-zinc-400 dark:text-zinc-500"
                      : "text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteMutation.mutate(todo.id)}
                disabled={deleteMutation.isPending}
                className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 rounded-md transition-colors disabled:opacity-50"
                aria-label="Delete todo"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
