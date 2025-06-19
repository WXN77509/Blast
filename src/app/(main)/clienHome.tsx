"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useRef } from "react";
import { useAuth } from "@/components/AuthContext";

export function ClientHome() {
  const { open, openMobile, isMobile } = useSidebar();
  const isSidebarOpen = open || openMobile;

  const { user, isLoading } = useAuth();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldRenderTrigger = !isSidebarOpen;

  return (
    <div className="relative h-full w-full px-2">
      {shouldRenderTrigger && <SidebarTrigger ref={triggerRef} />}
      {isMobile && <SidebarTrigger ref={triggerRef} />}

      <div>
        {isLoading && <p>Chargement...</p>}
        {!user ? (
          <p>Utilisateur non connecté.</p>
        ) : (
          <>
            <h1>Bienvenue, {user.name}</h1>
            <p>Email : {user.email}</p>
            <p>Session expire le : {""}</p>
          </>
        )}
      </div>
    </div>
  );
}
