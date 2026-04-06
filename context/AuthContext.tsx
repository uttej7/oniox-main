"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { User, AuthCredentials } from "@/lib/auth";
import {
  validateCredentials,
  generateToken,
  getHomePath,
  AUTH_COOKIE_NAME,
  USER_COOKIE_NAME,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials, callbackUrl?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
function getCookie(name: string): string | null {
  return (
    document.cookie.split("; ").find((r) => r.startsWith(`${name}=`))?.split("=")[1] ?? null
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie(AUTH_COOKIE_NAME);
    const userJson = getCookie(USER_COOKIE_NAME);
    if (token && userJson) {
      try {
        setUser(JSON.parse(decodeURIComponent(userJson)));
      } catch {
        deleteCookie(AUTH_COOKIE_NAME);
        deleteCookie(USER_COOKIE_NAME);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (
      credentials: AuthCredentials,
      callbackUrl?: string
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        const validUser = await validateCredentials(credentials);
        if (!validUser) return { success: false, error: "Invalid email or password." };

        const token = generateToken(validUser);
        setCookie(AUTH_COOKIE_NAME, token);
        setCookie(USER_COOKIE_NAME, JSON.stringify(validUser));
        setUser(validUser);

        // Role-based redirect: HR → /hr/dashboard, Admin → /dashboard
        const destination = callbackUrl && callbackUrl !== "/" ? callbackUrl : getHomePath(validUser);
        router.replace(destination);
        return { success: true };
      } catch {
        return { success: false, error: "An unexpected error occurred." };
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    deleteCookie(AUTH_COOKIE_NAME);
    deleteCookie(USER_COOKIE_NAME);
    setUser(null);
    // Use a hard redirect so the browser makes a fresh request to the server.
    // This ensures the middleware sees cleared cookies and re-evaluates the
    // route correctly, preventing stale client-side cache from skipping the
    // portal selection page.
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
