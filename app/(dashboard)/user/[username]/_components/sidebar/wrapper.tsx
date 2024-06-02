"use client";

import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"; 

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {

  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside className={cn(
      "w-[4.375rem] lg:w-60 fixed left-0 flex flex-col h-full bg-background border-r border-[#2D2E35] z-50",
      collapsed && "lg:w-[4.375rem]"
    )}>
      {children}
    </aside>
  )
}