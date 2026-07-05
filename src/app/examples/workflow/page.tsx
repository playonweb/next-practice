"use client";

import { useState, useTransition } from "react";
import { triggerWorkflowAction } from "./actions";
import { Button } from "@/components/ui/button";

export default function WorkflowExamplePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const triggerWorkflow = () => {
    if (!email || !name) {
      setStatus("Please provide email and name.");
      return;
    }

    setStatus("Triggering workflow...");

    startTransition(async () => {
      try {
        const result = await triggerWorkflowAction({ email, name });
        if (result.success) {
          setStatus("Workflow triggered via Vercel Workflows SDK!");
        } else {
          setStatus("Workflow trigger returned false");
        }
      } catch (err: any) {
        setStatus(`Error: ${err.message}`);
      }
    });
  };

  return (
    <div className="container py-10 max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Vercel Workflows Example</h1>
        <p className="text-muted-foreground">
          This example demonstrates the official Vercel Workflows SDK. It uses the <code>"use workflow"</code> directive to create a durable function that can survive server restarts, pause its own execution without blocking compute, and handle errors automatically.
        </p>
      </div>

      <div className="border rounded-xl shadow-sm overflow-hidden bg-card text-card-foreground">
        <div className="p-6 space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Onboarding Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Triggers a background workflow that sends a welcome email, waits for 5 seconds, and then sends a follow-up.
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <input 
              id="name" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="John Doe" 
              value={name} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <input 
              id="email" 
              type="email" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="john@example.com" 
              value={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
            />
          </div>
        </div>
        <div className="flex items-center p-6 pt-0 gap-4">
          <Button onClick={triggerWorkflow} disabled={isPending}>
            {isPending ? "Triggering..." : "Start Workflow"}
          </Button>
          {status && <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{status}</p>}
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-semibold mb-2">How it works</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>UI calls a Server Action (<code>triggerWorkflowAction</code>)</li>
          <li>Server Action invokes the function marked with <code>"use workflow"</code></li>
          <li>The Vercel Workflows SDK compiles the function to run durably on the Vercel platform</li>
        </ul>
      </div>
    </div>
  );
}
