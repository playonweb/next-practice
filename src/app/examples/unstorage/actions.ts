'use server';

import { kvStorage, blobStorage } from '@/services/storage';
import { revalidatePath } from 'next/cache';

// KV Actions
export async function setKvValue(key: string, value: string) {
  if (!key) throw new Error('Key is required');
  await kvStorage.setItem(key, value);
  revalidatePath('/examples/unstorage');
}

export async function getKvValue(key: string) {
  if (!key) return null;
  const value = await kvStorage.getItem(key);
  return value as string | null;
}

export async function removeKvValue(key: string) {
  if (!key) throw new Error('Key is required');
  await kvStorage.removeItem(key);
  revalidatePath('/examples/unstorage');
}

// Blob Actions
export async function setBlobValue(key: string, value: string) {
  if (!key) throw new Error('Key is required');
  await blobStorage.setItem(key, value);
  revalidatePath('/examples/unstorage');
}

export async function getBlobValue(key: string) {
  if (!key) return null;
  const value = await blobStorage.getItem(key);
  return value as string | null;
}

export async function removeBlobValue(key: string) {
  if (!key) throw new Error('Key is required');
  await blobStorage.removeItem(key);
  revalidatePath('/examples/unstorage');
}
