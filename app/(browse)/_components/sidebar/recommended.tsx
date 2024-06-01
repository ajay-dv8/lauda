"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client"
import { UserItem } from "./user-item";
import { UserAvatarSkeleton } from "@/components/user-avatar";

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  // Do not show recommended label if there are no recommended users 
  const showLabel = !collapsed && data.length > 0;

  return (
    <div className="">
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Recommended
          </p>
        </div>
      )}

      {/* List Recommended users in sidebar */}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem 
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            // isLive={true}
          />
        ))}
      </ul>
    </div>
  );
};


export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserAvatarSkeleton key={i}/>
      ))}
    </ul>
  )
}