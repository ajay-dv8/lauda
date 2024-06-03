"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon : Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {

  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent",
      )}
    >
      <Link href={href} className="">
        <div className="flex item-center gap-x-4">
          <Icon className={cn(
            "size-4",
            collapsed ? "mr-0" : "mr-2"
          )}/>
          {/* Render label if sidebar is not collapsed */}
          {!collapsed && (
            <span className="">{label}</span>
          )}
        </div>
      </Link>
    </Button>
  )
};



export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-12 min-w-12"/>
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6"/>
      </div>
    </li>
  )
}