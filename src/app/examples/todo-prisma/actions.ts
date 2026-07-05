'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function createTodo(formData: FormData) {
  const text = formData.get('text') as string;
  if (!text || text.trim() === '') return;

  await prisma.prismaTodo.create({
    data: {
      text: text.trim(),
    },
  });

  revalidatePath('/examples/todo-prisma');
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.prismaTodo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath('/examples/todo-prisma');
}

export async function deleteTodo(id: string) {
  await prisma.prismaTodo.delete({
    where: { id },
  });

  revalidatePath('/examples/todo-prisma');
}
