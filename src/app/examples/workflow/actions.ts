"use server";

import { start } from "workflow/api";
import { myWorkflow } from "./workflow";

export async function triggerWorkflowAction(data: { name: string; email: string }) {
  // In the Vercel Workflows SDK, you trigger the workflow by importing and calling the
  // client or the workflow directly. If you don't use the client explicitly,
  // the 'use workflow' function handles its own durable execution via the Vercel platform.
  
  await start(myWorkflow, [data]);
  return { success: true };
}
