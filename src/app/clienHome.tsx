"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useRef } from "react";

export function ClientHome() {
  const { open, openMobile, isMobile } = useSidebar();
  const isSidebarOpen = open || openMobile;
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative h-full w-full px-2">
      {!isSidebarOpen && <SidebarTrigger ref={ref1} />}
      {isMobile && !ref1.current && <SidebarTrigger ref={ref2} />}
      <h1>Hello, World!</h1>
    </div>
  );
}
