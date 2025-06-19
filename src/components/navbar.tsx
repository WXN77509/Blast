"use client";

import { Grip, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { TooltipContent } from "./ui/tooltip";
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

const items = [
  {
    title: "Request confirmation before deleting",
    state: "Desactivated",
    shortCut: "⇧⌘P"
  },
  {
    title: "Add new tasks at the top",
    state: "Activated",
    shortCut: "⌘+B"
  },
  {
    title: "Move starred tasks upwards",
    state: "Activated",
    shortCut: "⌘A"
  },
  {
    title: "Read the audible completion alert",
    state: "Activated",
    shortCut: "⇧⌘C"
  },
  {
    title: "Display contextual menus",
    state: "Activated",
    shortCut: "⌘X"
  },
  {
    title: "Activate reminder notifications",
    state: "Activated",
    shortCut: "⌘+L"
  },
  {
    title: "Activate reminder notifications",
    state: "Desactivated",
    shortCut: "⇧⌘V"
  }
];

export function Navbar() {
  const [focusInput, setFocusInput] = useState(false);
  const [hoverInput, setHoverInput] = useState(false);
  const router = useRouter();

  const { user, isGuest } = useAuth();
  useEffect(() => {
    const guestUserId = localStorage.getItem("guestUserId");

    if (user && !isGuest && guestUserId) {
      fetch("/api/merge-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestUserId })
      }).then(() => {
        localStorage.removeItem("guestUserId");
      });
    }
  }, [user, isGuest]);

  const signOutUser = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    });
  };

  return (
    <nav className="fixed top-0 z-20 w-full flex flex-row justify-between items-center max-md:gap-1 px-4 py-1.5 bg-card text-card-foreground">
      <div className="flex flex-row items-center max-[430px]:gap-2 gap-6">
        <Grip size={21} />
        <Link href="/" className="font-semibold">
          To Do
        </Link>
      </div>
      <div
        className={
          "w-[120px] relative text-center md:w-[400px] max-md:p-1 max-md:rounded-sm"
        }
      >
        <input
          onMouseEnter={() => setHoverInput(true)}
          onMouseLeave={() => setHoverInput(false)}
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          placeholder={focusInput ? "Research" : undefined}
          className={
            "w-full h-full text-sm rounded-sm px-8 md:pl-10 py-1.5 outline-none cursor-pointer focus:cursor-auto bg-input text-black dark:text-white " +
            (hoverInput ? "hover:py-2 " : " ")
          }
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={
                  "absolute left-2.5 cursor-pointer " +
                  (hoverInput
                    ? "max-md:top-[0.55rem] top-2"
                    : "max-md:top-[0.55rem] top-1.5")
                }
              >
                <Search size={20} className="rotate-90" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rechercher</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <X
          size={20}
          className={
            "absolute right-2.5 " +
            (focusInput ? " " : "hidden ") +
            (hoverInput ? "top-[0.55rem]" : "top-1.5")
          }
        />
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
              <DropdownMenuLabel className="mt-4">Settings</DropdownMenuLabel>
              <DropdownMenuGroup className="flex flex-col gap-4 my-4">
                {items.map((value, index) => (
                  <DropdownMenuItem key={index}>
                    <div className="flex flex-col items-start gap-2">
                      {value.title}
                      <span className="inline-flex gap-4">
                        <Switch id="airplane-mode" />
                        <Label
                          htmlFor="airplane-mode"
                          className="text-muted-foreground"
                        >
                          {value.state}
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
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOutUser()}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ModeToggle />

        <div className="rounded-full p-0.5 transition-all focus:bg-muted focus:shadow-sm  focus:scale-105 hover:bg-muted hover:shadow-sm  hover:scale-105">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.image || undefined} alt="@" />
                <AvatarFallback className="text-sm">
                  {`${user?.name.split(" ")[0][0]}${user?.name.split(" ")[1][0]}`}
                </AvatarFallback>
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
                  href=""
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOutUser()}>
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
