import { db } from "@/db";
import { todos } from "@/db/schema";
import { desc } from "drizzle-orm";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default async function TodoPage() {
  const allTodos = await db.select().from(todos).orderBy(desc(todos.id));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl dark:bg-zinc-900 border dark:border-zinc-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-800 dark:text-zinc-100">
        RSC Todo List
      </h1>
      <TodoForm />
      <div className="mt-6">
        <TodoList todos={allTodos} />
      </div>
    </div>
  );
}
