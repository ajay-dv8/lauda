"use client";
import { useSidebar } from "@/store/use-sidebar";
import { useIsClient } from "usehooks-ts";
import { cn } from "@/lib/utils";

import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
  children: React.ReactNode;
}

//wrapper handles the state of the sidebar, if its collapsed or not
export const Wrapper = ({ children }: WrapperProps) => {

  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) return (
    <aside className="fixed left-0 flex flex-col w-[4.375] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );

  return(
    <aside className={cn(
      "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
      collapsed && "w-[4.375rem]"
      )}>
      {children}
    </aside>
  )
}