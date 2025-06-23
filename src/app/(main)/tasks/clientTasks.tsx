"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useRef, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import clsx from "clsx";
import {
  AlignLeft,
  ArrowUpDown,
  Bell,
  CalendarDays,
  Circle,
  Ellipsis,
  Home,
  LayoutGrid,
  PanelLeft,
  Plus,
  RefreshCcw
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export function ClientTasks() {
  const { open, openMobile, isMobile } = useSidebar();
  const isSidebarOpen = open || openMobile;

  const {} = useAuth();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const shouldRenderTrigger = !isSidebarOpen;
  const [focusInput, setFocusInput] = useState(false);
  const [listType, setListType] = useState<"grid" | "list">("list");

  return (
    <div className="relative flex flex-col items-center gap-1 h-full w-full p-4 md:p-6">
      <div
        className={clsx("w-full flex flex-row justify-between items-center")}
      >
        <div className="flex flex-row items-center gap-3">
          {shouldRenderTrigger && (
            <SidebarTrigger className="!p-0" ref={triggerRef} />
          )}
          {isMobile && !shouldRenderTrigger && (
            <SidebarTrigger className="!p-0" ref={triggerRef} />
          )}
          {!isMobile && !shouldRenderTrigger && <Home size={21} />}

          <span className="flex flex-col font-semibold text-[20px]">Tasks</span>
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
        <div className="flex flex-row items-center gap-2 sm:gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="cursor-pointer mr-2 sm:mr-4 inline-flex items-center gap-2">
                  <ArrowUpDown size={18} /> {isMobile ? "" : "Sort"}
                </span>
              </TooltipTrigger>
              <TooltipContent>Sort</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="mr-2 sm:mr-4 inline-flex items-center gap-2">
                  <PanelLeft size={18} /> {isMobile ? "" : "Group"}
                </span>
              </TooltipTrigger>
              <TooltipContent>Group</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div
        className="w-full flex flex-col mt-4 rounded-sm shadow-sm bg-card"
        onBlur={() => setFocusInput(false)}
      >
        <div className="relative flex flex-col w-full px-12 py-4 rounded-sm">
          <input
            placeholder="Add a task"
            className="outline-none text-sm"
            onFocus={() => setFocusInput(true)}
          />
          {focusInput ? (
            <Circle
              className="absolute left-4 top-4.5"
              size={18}
              color="#2564cf"
            />
          ) : (
            <Plus
              className="absolute left-4 top-4.25"
              size={20}
              color="#2564cf"
            />
          )}
        </div>
        {focusInput && (
          <>
            <Separator />
            <div className="flex flex-row justify-between px-4 py-2.5 rounded-sm bg-[#faf9f8] dark:bg-card">
              <div className="flex flex-row items-center gap-4">
                <CalendarDays size={18} color="#2564cf" />
                <Bell size={18} color="#2564cf" />
                <RefreshCcw size={18} color="#2564cf" />
              </div>
              <button className="text-sm bg-white dark:bg-input p-1 border border-[#e1dfdd] dark:border-none px-2 text-muted-foreground">
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
