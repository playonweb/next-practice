// Artificial 3-second delay
export async function getSlowAnalyticsData() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return [12, 45, 67, 89, 34, 56, 90, 100];
}
