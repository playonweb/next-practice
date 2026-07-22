'use client';

import { useState, useEffect, useCallback } from 'react';

export type NeonUserProfile = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role?: string;
  createdAt?: string;
};

export function useNeonAuthSession() {
  const [user, setUser] = useState<NeonUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [neonAuthUrl, setNeonAuthUrl] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('neon_auth_token') : null;
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/neon-auth/service', {
        headers,
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setNeonAuthUrl(data.neonAuthUrl || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const signIn = async (email: string, password?: string) => {
    const res = await fetch('/api/neon-auth/service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sign-in', email, password }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || 'Neon Auth Sign in failed');
    }

    if (data.token) {
      localStorage.setItem('neon_auth_token', data.token);
    }
    if (data.user) {
      setUser(data.user);
    }
    await refreshSession();
    return data;
  };

  const signUp = async (email: string, name?: string, password?: string) => {
    const res = await fetch('/api/neon-auth/service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sign-up', email, password, name }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || 'Neon Auth Sign up failed');
    }

    if (data.token) {
      localStorage.setItem('neon_auth_token', data.token);
    }
    if (data.user) {
      setUser(data.user);
    }
    await refreshSession();
    return data;
  };

  const signOut = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('neon_auth_token') : null;
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    await fetch('/api/neon-auth/service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ action: 'sign-out' }),
    });

    localStorage.removeItem('neon_auth_token');
    setUser(null);
    await refreshSession();
  };

  return {
    user,
    loading,
    neonAuthUrl,
    signIn,
    signUp,
    signOut,
    refreshSession,
  };
}
