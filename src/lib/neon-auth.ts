export const NEON_AUTH_URL =
  process.env.NEON_AUTH_URL ||
  process.env.NEXT_PUBLIC_NEON_AUTH_URL ||
  'https://ep-winter-mud-alsraxzm.neonauth.c-3.eu-central-1.aws.neon.tech/neondb/auth';

export type NeonUser = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  role?: string;
  createdAt?: string;
};

export type NeonSession = {
  user: NeonUser;
  token?: string;
};

export async function neonSignUp(email: string, password: string, name?: string, origin = 'http://localhost:3000') {
  const res = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
    },
    body: JSON.stringify({
      email,
      password,
      name: name || email.split('@')[0],
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.code || 'Neon Auth sign up failed');
  }
  return { data, headers: res.headers };
}

export async function neonSignIn(email: string, password: string, origin = 'http://localhost:3000') {
  const res = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.code || 'Neon Auth sign in failed');
  }
  return { data, headers: res.headers };
}

export async function neonGetSession(cookieHeader?: string, authHeader?: string) {
  try {
    const res = await fetch(`${NEON_AUTH_URL}/get-session`, {
      headers: {
        cookie: cookieHeader || '',
        authorization: authHeader || '',
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}
