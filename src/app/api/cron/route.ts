import { NextResponse } from 'next/server';
import { myWorkflow } from '../../examples/workflow/actions';

export async function GET(request: Request) {
  // 1. Security Check: Ensure the request comes from Vercel Cron
  // Vercel automatically passes an authorization header when invoking crons.
  // When testing locally, you can bypass this or provide the header manually.
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  // 2. Perform your scheduled task logic here
  console.log("Cron job running!");
  
  // Example: We can trigger our existing workflow on a schedule
  await myWorkflow({ name: "Daily Report System", email: "admin@example.com" });

  return NextResponse.json({ success: true, message: "Cron triggered workflow successfully" });
}
