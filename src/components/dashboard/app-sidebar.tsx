"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "KINGDimsSky",
    email: "dimasmarcelo2004@gmail.com",
    avatar: "/dimas.jpg",
  },
  navMain: [
    {
      title: "Analytics Products",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Analytics",
          url: "/dashboard",
        },
        {
          title: "History Selling",
          url: "#",
        },
      ],
    },
    {
      title: "Your Products",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add Product",
          url: "#",
        },
        {
          title: "Manage Product",
          url: "#",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Blog",
          url: "#",
        },
        {
          title: "Manage Blog",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Users Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Manage Users",
          url: "#",
        },
        {
          title: "Users Data",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
