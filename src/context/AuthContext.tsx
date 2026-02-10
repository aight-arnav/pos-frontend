"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthApi } from "@/lib/api/AuthApi";
import { UserData, LoginForm, SignupForm } from "@/lib/types/Auth";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (form: LoginForm) => Promise<void>;
  signup: (form: SignupForm) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const PUBLIC_ROUTES = ["/", "/login", "/signup"];

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // 🔑 Restore session
  useEffect(() => {
    async function loadMe() {
      try {
        const me = await AuthApi.me();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isPublic = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    if (!user && !isPublic) {
      router.replace("/login");
    }

    if (user && (pathname === "/login" || pathname === "/register")) {
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, router]);

  async function login(form: LoginForm) {
    const user = await AuthApi.login(form);
    setUser(user);
    toast.success("Logged in successfullly");
  }

  async function signup(form: SignupForm) {
    const user = await AuthApi.signup(form);
    setUser(user);
    toast.success("Account registered successfully");
  }

  async function logout() {
    await AuthApi.logout();
    setUser(null);
    router.push("/login");
    toast.success("Logged out successfully");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}