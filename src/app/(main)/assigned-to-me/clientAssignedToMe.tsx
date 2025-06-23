"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useRef, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { AlignLeft, Ellipsis, LayoutGrid, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import Image from "next/image";
import picture from "@/icons/image.png";
import clsx from "clsx";

export function ClientAssignedToMe() {
  const { open, openMobile, isMobile } = useSidebar();
  const isSidebarOpen = open || openMobile;

  const {} = useAuth();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldRenderTrigger = !isSidebarOpen;
  const [listType, setListType] = useState<"grid" | "list">("list");

  return (
    <div className="relative flex flex-col items-center gap-6 h-full w-full p-4 md:p-6">
      <div className="w-full flex flex-row items-center gap-3">
        {shouldRenderTrigger && (
          <SidebarTrigger className="!p-0" ref={triggerRef} />
        )}
        {isMobile && !shouldRenderTrigger && (
          <SidebarTrigger className="!p-0" ref={triggerRef} />
        )}
        {!isMobile && !shouldRenderTrigger && <User size={21} />}

        <span className="flex flex-col font-semibold text-[20px]">
          Assigned to me
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <Ellipsis className="ml-2" size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>List Options Menu</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={() => setListType("grid")}
                className={clsx(
                  "cursor-pointer ml-2 sm:ml-4 inline-flex items-center gap-2",
                  listType === "grid"
                    ? "border-b-4 border-muted-foreground pb-0.5"
                    : ""
                )}
              >
                <LayoutGrid size={18} /> {isMobile ? "" : "Grid"}
              </span>
            </TooltipTrigger>
            <TooltipContent>Grid view</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={() => setListType("list")}
                className={clsx(
                  "cursor-pointer ml-2 sm:ml-4 inline-flex items-center gap-2",
                  listType === "list"
                    ? "border-b-4 border-muted-foreground pb-0.5"
                    : ""
                )}
              >
                <AlignLeft size={18} /> {isMobile ? "" : "List"}
              </span>
            </TooltipTrigger>
            <TooltipContent>Viewing the list</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-center gap-8">
        <Image
          width={250}
          height={200}
          src={picture}
          alt="picture of website"
        />
        <p className="text-muted-foreground font-semibold text-center text-[20px] max-w-[350px]">
          The tasks assigned to you in the To Do or Planner apps are displayed
          here
        </p>
      </div>
    </div>
  );
}
