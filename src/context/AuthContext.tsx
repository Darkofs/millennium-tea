"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for active session in LocalStorage on mount
    const savedSession = localStorage.getItem("millennium_active_session");
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        console.error("Failed to parse active session:", e);
        localStorage.removeItem("millennium_active_session");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    // Simulate brief network delay for premium feel
    await new Promise((r) => setTimeout(r, 600));

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const savedUsers = JSON.parse(localStorage.getItem("millennium_users") || "[]");
      
      const foundUser = savedUsers.find(
        (u: any) => u.email.trim().toLowerCase() === normalizedEmail && u.password === password
      );

      if (foundUser) {
        const sessionUser = { name: foundUser.name, email: foundUser.email };
        setUser(sessionUser);
        localStorage.setItem("millennium_active_session", JSON.stringify(sessionUser));
        setLoading(false);
        return true;
      } else {
        throw new Error("Invalid email or password credentials.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      setLoading(false);
      return false;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    // Simulate brief network delay for premium feel
    await new Promise((r) => setTimeout(r, 600));

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!name.trim()) throw new Error("Please enter your name.");
      if (!normalizedEmail) throw new Error("Please enter your email.");
      if (password.length < 6) throw new Error("Password must be at least 6 characters.");

      const savedUsers = JSON.parse(localStorage.getItem("millennium_users") || "[]");
      const exists = savedUsers.some((u: any) => u.email.trim().toLowerCase() === normalizedEmail);

      if (exists) {
        throw new Error("An account already exists with this email.");
      }

      const newUser = { name: name.trim(), email: normalizedEmail, password };
      savedUsers.push(newUser);
      localStorage.setItem("millennium_users", JSON.stringify(savedUsers));

      // Automatically log in user after successful registration
      const sessionUser = { name: newUser.name, email: newUser.email };
      setUser(sessionUser);
      localStorage.setItem("millennium_active_session", JSON.stringify(sessionUser));

      setLoading(false);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      setLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("millennium_active_session");
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
