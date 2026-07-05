"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const text = formData.get("text");

  if (!text || typeof text !== "string") {
    return { error: "Invalid text" };
  }

  await db.insert(todos).values({ text });
  
  revalidatePath("/examples/todo-rsc");
}

export async function toggleTodo(id: number, currentStatus: boolean) {
  await db.update(todos)
    .set({ completed: !currentStatus })
    .where(eq(todos.id, id));
    
  revalidatePath("/examples/todo-rsc");
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  
  revalidatePath("/examples/todo-rsc");
}
