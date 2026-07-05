// Simulate a slow database query
export async function getHeavyServerData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    { id: 1, name: "Enterprise Server Rack" },
    { id: 2, name: "Edge Compute Node" },
    { id: 3, name: "Database Cluster" }
  ];
}
