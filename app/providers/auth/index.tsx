import type { User, AuthStatus, LoginCredentials } from "./types.d.ts";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

// API URL'lerini merkezi olarak tanımla
const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

// Zustand tipi
interface DataState {
  status: AuthStatus;
  setAuthStatus: (status: AuthStatus) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ success: boolean; message: string }>;
  initialSessionControl: () => Promise<void>;
}

// Auth Context
type AuthContextType = StoreApi<DataState> | undefined;
const AuthContext = createContext<AuthContextType>(undefined);

// Provider
export function AuthProvider({
  children,
  user: initialUser = null,
  status: initialStatus = "loading",
}: PropsWithChildren & {
  user?: User | null;
  status?: AuthStatus;
}) {
  const [store] = useState(() =>
    createStore<DataState>()(
      immer((set) => ({
        status: initialStatus,
        setAuthStatus: (status) => set({ status }),
        user: initialUser,
        setUser: (user) => set({ user }),

        // Kullanıcı çıkış işlemi
        logout: async () => {
          try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });
          } catch (error) {
            // Backend logout başarısız olsa bile local state güncellenmeli
            console.warn("Backend logout failed:", error);
          } finally {
            set({ user: null, status: "unauthorize" });
            window.location.reload();
          }
        },

        // Kullanıcı giriş işlemi
        login: async (credentials) => {
          try {
            const response = await fetch(`${API_BASE_URL}/public/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
              credentials: "include",
            });
            if (!response.ok) {
              const errorMsg = await response.text();
              throw new Error(errorMsg || "Login failed");
            }
            const user = await response.json();
            set({ user, status: "authorize" });
            return { success: true, message: "Login successful" };
          } catch (error) {
            set({ user: null, status: "unauthorize" });
            return {
              success: false,
              message: error instanceof Error ? error.message : "Login failed",
            };
          }
        },

        // Oturum kontrolü (ilk yüklemede)
        initialSessionControl: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/auth/get-me`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });
            if (!response.ok) {
              throw new Error("User not authenticated");
            }
            const userData = await response.json();
            set({ user: userData.user, status: "authorize" });
          } catch {
            set({ user: null, status: "unauthorize" });
          }
        },
      })),
    ),
  );

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

// useAuth hook'u
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook must be used within an AuthProvider");
  }
  return useStore(context, (state) => state);
}
