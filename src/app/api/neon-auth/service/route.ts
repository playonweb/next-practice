import { NextResponse } from 'next/server';
import { NEON_AUTH_URL, neonSignIn, neonSignUp, neonGetSession } from '@/lib/neon-auth';

export async function GET(request: Request) {
  try {
    const sessionData = await neonGetSession(
      request.headers.get('cookie') || '',
      request.headers.get('authorization') || ''
    );
    return NextResponse.json({
      user: sessionData?.user || null,
      session: sessionData?.session || null,
      neonAuthUrl: NEON_AUTH_URL,
    });
  } catch (err: any) {
    return NextResponse.json({ user: null, error: err.message, neonAuthUrl: NEON_AUTH_URL });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, email, password, name } = body;
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  try {
    if (action === 'sign-up') {
      const { data, headers } = await neonSignUp(email, password, name, origin);
      const response = NextResponse.json(data);
      const setCookie = headers.get('set-cookie');
      if (setCookie) {
        response.headers.set('set-cookie', setCookie);
      }
      return response;
    } else if (action === 'sign-in') {
      const { data, headers } = await neonSignIn(email, password, origin);
      const response = NextResponse.json(data);
      const setCookie = headers.get('set-cookie');
      if (setCookie) {
        response.headers.set('set-cookie', setCookie);
      }
      return response;
    } else if (action === 'sign-out') {
      const res = await fetch(`${NEON_AUTH_URL}/sign-out`, {
        method: 'POST',
        headers: {
          cookie: request.headers.get('cookie') || '',
          authorization: request.headers.get('authorization') || '',
        },
      });
      const data = await res.json().catch(() => ({}));
      const response = NextResponse.json(data);
      const setCookie = res.headers.get('set-cookie');
      if (setCookie) {
        response.headers.set('set-cookie', setCookie);
      }
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Neon Auth operation failed' }, { status: 400 });
  }
}
