import { CgProfile } from "react-icons/cg";
import { FaBloggerB, FaQuestion, FaStore } from "react-icons/fa";
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
    {id: 1, name: 'Blog', icon: FaBloggerB, href: '/blog'},
    {id: 2, name: 'Marketplace', icon: FaStore, href: '/store'},
    {id: 3, name: 'About', icon: FaQuestion, href: '/about'}
]