"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  MessageCircleMore,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { Logo } from "@/components/Logo";

import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Surf",
    email: "m@example.com",
    avatar: "/icon-128.png",
  },
  navMain: [
    {
      title: "Researcher",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        // {
        //   title: "History",
        //   url: "#",
        // },
        // {
        //   title: "Starred",
        //   url: "#",
        // },
        // {
        //   title: "Settings",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Documents",
      url: "#",
      icon: BookOpen,
      items: [
        // {
        //   title: "Introduction",
        //   url: "#",
        // },
        // {
        //   title: "Get Started",
        //   url: "#",
        // },
        // {
        //   title: "Tutorials",
        //   url: "#",
        // },
        // {
        //   title: "Changelog",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Connectors",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Add Connector",
          url: "#",
        },
        {
          title: "Manage Connectors",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "SEARCH SPACE",
      url: "#",
      icon: LifeBuoy,
    },
  ],
  RecentChats: [
    {
      name: "Design Engineering",
      url: "#",
      icon: MessageCircleMore,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: MessageCircleMore,
    },
    {
      name: "Travel",
      url: "#",
      icon: MessageCircleMore,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Logo className="rounded-lg" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SurfSense</span>
                  <span className="truncate text-xs">beta v0.0.6</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.RecentChats} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
