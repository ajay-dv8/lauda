"use client";
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import {
  Fullscreen,
  MessageSquare,
  KeyRound,
  Users
} from "lucide-react"
import { NavItem, NavItemSkeleton } from "./nav-tem";

// Navigation component contains a list of navigation routes in the sidebar

export const Navigation = () => {
  const pathname = usePathname();
  // extract user from clerk useUser
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `/user/${user?.username}`, 
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/user/${user?.username}/keys`, 
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/user/${user?.username}chat`, 
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/user/${user?.username}community`, 
      icon: Users,
    },
  ];

  if (!user?.username) { 
    return (
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    )
  }




  return(
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={pathname === route.href}
          //isActive={pathname.startsWith(route.href)}
        />
      ))}
    </ul>
  )
}