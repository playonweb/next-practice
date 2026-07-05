"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo } from "./actions";
import { Trash2 } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();

  if (todos.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400 mt-4">
        No todos yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-3 border rounded-md dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 transition-all hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                startTransition(() => {
                  toggleTodo(todo.id, todo.completed);
                });
              }}
              disabled={isPending}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer disabled:opacity-50"
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
            onClick={() => {
              startTransition(() => {
                deleteTodo(todo.id);
              });
            }}
            disabled={isPending}
            className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 rounded-md transition-colors disabled:opacity-50"
            aria-label="Delete todo"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
