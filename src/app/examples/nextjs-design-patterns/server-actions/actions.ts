'use server';

import { revalidatePath } from 'next/cache';

// Simulate a database
const db = new Set(['Initial Server Data']);

export async function submitData(formData: FormData) {
  const item = formData.get('item');

  if (typeof item !== 'string' || item.trim() === '') {
    return { error: 'Invalid input' };
  }

  // Artificial 2-second delay to prove optimistic UI works instantly
  await new Promise(resolve => setTimeout(resolve, 2000));

  db.add(item);
  console.log('db', db);
  revalidatePath('/examples/nextjs-design-patterns/server-actions');
}
