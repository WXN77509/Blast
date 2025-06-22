import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Sun,
  Star,
  Calendar,
  Home,
  User,
  Plus,
  SquarePlus
} from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const items = [
  {
    title: "My day",
    url: "/",
    icon: Sun
  },
  {
    title: "Important",
    url: "#",
    icon: Star
  },
  {
    title: "Planned",
    url: "#",
    icon: Calendar
  },
  {
    title: "Assigned to me",
    url: "#",
    icon: User
  },
  {
    title: "Tasks",
    url: "#",
    icon: Home
  }
];

export function LayoutSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="pt-12">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={clsx(
                        pathname === item.url
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-2">
          <Separator />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="w-full py-2">
              <SidebarMenuItem className="w-full flex flex-row items-center justify-between">
                <div className="flex items-center gap-2 rounded-sm pl-1.75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <button className="h-8 text-sm cursor-pointer">
                    <Plus size={18} />
                  </button>
                  <input
                    placeholder="New list"
                    className="h-8 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>

                <button className="px-2.5 h-8 rounded-sm cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <SquarePlus size={18} />
                </button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
