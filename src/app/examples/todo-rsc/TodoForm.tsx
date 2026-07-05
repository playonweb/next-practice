"use client";

import { useRef } from "react";
import { addTodo } from "./actions";

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addTodo(formData);
        formRef.current?.reset();
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        name="text"
        required
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add
      </button>
    </form>
  );
}
