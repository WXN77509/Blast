// app/(main)/clientLayout.tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutSidebar } from "@/components/LayoutSidebar";
import { Separator } from "@/components/ui/separator";
import { SettingsLoader } from "@/components/SettingsLoader";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}

function LayoutContent({ children }: { children: ReactNode }) {
  const { isReady } = useAuth();

  if (!isReady) return null;

  return (
    <>
      <MergeGuestOnLogin />
      <SettingsLoader />
      <div className="flex flex-col pt-12">
        <Navbar />
        <Separator />
        <SidebarProvider>
          <div className="flex flex-row">
            <LayoutSidebar />
            <main>{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}

function MergeGuestOnLogin() {
  const { user, isGuest } = useAuth();
  const hasMerged = useRef(false);

  useEffect(() => {
    const guestUserId = localStorage.getItem("guestUserId");

    if (user && !isGuest && guestUserId && !hasMerged.current) {
      hasMerged.current = true;

      fetch("/api/merge-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestUserId })
      }).then(() => {
        localStorage.removeItem("guestUserId");
      });
    }
  }, [user, isGuest]);

  return null;
}
