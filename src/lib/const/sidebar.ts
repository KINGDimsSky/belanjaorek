import { BookOpen, Bot, Frame, Map, PieChart, Settings2, SquareTerminal } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { FaQuestion, FaStore } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosHeartHalf } from "react-icons/io";
import { MdReport } from "react-icons/md";

export const UserNav = [
    {id: 1, name: 'Dashboard', icon: ImProfile, href : '/dashboard'},
    {id: 2, name: 'Your Profile', icon: CgProfile, href: '/profile'},
    {id: 3, name: 'Liked Product', icon: IoIosHeartHalf, href: '/Liked'},
    {id: 4, name: 'Reports!', icon: MdReport, href: '/reports'}
]

export const pagesNav = [
    {id: 1, name: 'Marketplace', icon: FaStore, href: '/store'},
    {id: 2, name: 'About', icon: FaQuestion, href: '/about'}
]

export const dataSidebar = {
  navMain: [
    {
      title: "Analytics Products",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Payment Info",
          url: "/dashboard/payment",
        },
        {
          title: "History Selling",
          url: "/dashboard/history",
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
          url: "/dashboard/products/add",
        },
        {
          title: "Manage Product",
          url: "/dashboard/products/manage",
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