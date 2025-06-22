"use client";

import { Grip, Search, Settings, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { useState, useEffect, useCallback } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Setting } from "@prisma/client";

export function Navbar() {
  const [focusInput, setFocusInput] = useState(false);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user, isGuest } = useAuth();

  const fetchSettings = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/settings/${user.id}`);
      const json = await res.json();
      if (res.ok) {
        setSettings(json.userSettings);
        setError(null);
      } else {
        setError(json.error || "Recovery error");
      }
    } catch {
      setError("Network error");
    }
  }, [user?.id]);

  /*async function createSettings(newSettings: Setting[]) {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/settings/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings)
      });
      const json = await res.json();
      if (res.ok) {
        console.log("Settings created:", json.createdCount);
        fetchSettings();
      } else {
        setError(json.error || "Error during creation");
      }
    } catch {
      setError("Network error");
    }
  }*/

  async function updateSetting(settingId: string, data: Partial<Setting>) {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/settings/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settingId, data })
      });
      const json = await res.json();
      if (res.ok) {
        console.log("Setting updated");
        fetchSettings();
      } else {
        setError(json.error || "Update error");
      }
    } catch {
      setError("Network error");
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchSettings();
    }
  }, [fetchSettings, user?.id]);

  const signOutUser = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <nav className="fixed top-0 z-20 w-full flex flex-row justify-between items-center max-md:gap-1 px-4 py-1.5 bg-card text-card-foreground">
      <div className="flex flex-row items-center max-[430px]:gap-2 gap-6">
        <Grip size={21} />
        <Link href="/" className="font-semibold">
          To Do
        </Link>
      </div>

      <div className="w-[120px] relative text-center md:w-[400px] max-md:p-1 max-md:rounded-sm">
        <input
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          placeholder={focusInput ? "Research" : undefined}
          className="w-full h-full text-sm rounded-sm px-8 md:pl-10 py-1.5 outline-none cursor-pointer focus:cursor-auto bg-input text-black dark:text-white"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="absolute top-[5px] left-2.5 cursor-pointer">
                <Search size={20} className="rotate-90" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rechercher</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {focusInput && <X size={20} className="absolute right-2.5 top-[5px]" />}
      </div>

      <div className="flex flex-row items-center max-[430px]:gap-2 gap-4">
        <div className="rounded-full p-1.5 transition-all focus:bg-muted focus:shadow-sm  focus:scale-105 hover:bg-muted hover:shadow-sm hover:scale-110">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <Settings className="text-muted-foreground" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuGroup className="flex flex-col gap-4 mb-4 mt-2">
                {[...settings]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((value) => (
                    <DropdownMenuItem key={value.id}>
                      <div className="flex flex-col items-start gap-2">
                        {value.title}
                        <span className="inline-flex gap-4">
                          <Switch
                            id={`setting-${value.id}`}
                            checked={value.state === "Activated"}
                            onCheckedChange={(checked) =>
                              updateSetting(value.id, {
                                state: checked ? "Activated" : "Desactivated"
                              })
                            }
                          />
                          <Label
                            htmlFor={`setting-${value.id}`}
                            className="text-muted-foreground font-medium"
                          >
                            {value.title}
                          </Label>
                        </span>
                      </div>
                      <DropdownMenuShortcut>
                        {value.shortCut}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              {isGuest ? (
                <Link href="/sign-in">
                  <DropdownMenuItem className="font-bold text-primary underline-offset-4 hover:underline">
                    Sign in
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem onClick={signOutUser}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ModeToggle />

        <div className="rounded-full p-0.5 transition-all focus:bg-muted focus:shadow-sm  focus:scale-105 hover:bg-muted hover:shadow-sm  hover:scale-105">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                {user?.image ? (
                  <AvatarImage src={user.image} alt="user avatar" />
                ) : (
                  <AvatarFallback>
                    <UserPlus size={21} />
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  {user?.name}
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user?.email}
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href="https://github.com"
                  className="font-bold text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOutUser}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
