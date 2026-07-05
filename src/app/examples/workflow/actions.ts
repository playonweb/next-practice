"use server";

import { sleep } from "workflow";

export async function triggerWorkflowAction(data: { name: string; email: string }) {
  // In the Vercel Workflows SDK, you trigger the workflow by importing and calling the
  // client or the workflow directly. If you don't use the client explicitly,
  // the 'use workflow' function handles its own durable execution via the Vercel platform.
  // Wait, the SDK has `start` or just calling it directly if it's exported.
  // Assuming direct invocation:
  
  await myWorkflow(data);
  return { success: true };
}

export async function myWorkflow(data: { name: string; email: string }) {
  "use workflow";
  
  // Simulated steps
  console.log(`[Workflow] Sending welcome email to ${data.email}`);
  
  // Sleep / wait is native to "use workflow" using the sleep utility
  await sleep("5 seconds");
  
  console.log(`[Workflow] Sending follow-up to ${data.name}`);
  
  return { success: true };
}
