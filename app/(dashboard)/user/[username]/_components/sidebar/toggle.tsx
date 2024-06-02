"use client";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {

  const {
    collapsed,
    onExpand,
    onCollapse,
  } = useCreatorSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return(
    <>
      {collapsed && (
        <div className="hidden w-full lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button 
              onClick={onExpand}
              className="h-auto p-2"
              variant="ghost"
            >
              <ArrowRightFromLine className="size-4"/>
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="w-full p-3 pl-6 mb-2 flex items-center ">
          <p className="hidden lg:block font-semibold text-primary">
            Dashboard
          </p>

          <Hint label={label} side="right" asChild >
            <Button 
              onClick={onCollapse}
              className="h-auto p-2 ml-auto" 
              variant="ghost"
            >
              <ArrowLeftFromLine className="size-4 hidden lg:block"/>
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};


export const ToggleSkeleton = () => {
  return(
    <div className="pt-4 px-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="w-[6.25rem] h-6"/>
      <Skeleton className="w-6 h-6" />
    </div>
  )
}