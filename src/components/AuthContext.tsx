"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import { useSession } from "@/lib/auth-client";
import type { Session, User } from "better-auth";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession();
  const [guestUser, setGuestUser] = useState<User | null>(null);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);

  const session = data?.session ?? null;
  const loggedUser = data?.user ?? null;

  const isReady =
    !isPending &&
    !isLoadingGuest &&
    (loggedUser !== null ||
      guestUser !== null ||
      (loggedUser === null && guestUser === null));

  useEffect(() => {
    async function loadGuestUser() {
      setIsLoadingGuest(true);
      try {
        const guestUserId = localStorage.getItem("guestUserId");

        if (guestUserId) {
          const res = await fetch(`/api/guest/${guestUserId}`);
          if (res.ok) {
            const data = await res.json();
            setGuestUser(data.user);
            return;
          } else {
            localStorage.removeItem("guestUserId");
          }
        }

        const createRes = await fetch("/api/guest", { method: "POST" });
        const created = await createRes.json();
        console.log("Created new guest user:", created.guestUserId);
        localStorage.setItem("guestUserId", created.guestUserId);

        const guestFetch = await fetch(`/api/guest/${created.guestUserId}`);
        const guest = await guestFetch.json();
        setGuestUser(guest.user);
      } catch (err) {
        console.error("Error loading guest user:", err);
      } finally {
        setIsLoadingGuest(false);
      }
    }

    if (!loggedUser) {
      loadGuestUser();
    } else {
      localStorage.removeItem("guestUserId");
      setGuestUser(null);
    }
  }, [loggedUser]);

  const user = loggedUser || guestUser;
  const isGuest = !loggedUser && !!guestUser;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isGuest,
        isLoading: isPending || isLoadingGuest,
        isReady
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
