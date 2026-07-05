// Simulating a slow 2-second user fetch
export async function getUser() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { name: 'Alice Johnson', role: 'Admin' };
}

// Simulating a slow 2-second posts fetch
export async function getPosts() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    { id: 1, title: 'Optimizing Next.js' },
    { id: 2, title: 'Understanding React 19' }
  ];
}
