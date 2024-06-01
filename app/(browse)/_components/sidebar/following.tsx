"use client";
import { useSidebar } from '@/store/use-sidebar';
import { Follow, User } from '@prisma/client'; 
import { UserItem, UserItemSkeleton } from './user-item';

interface FollowingProps {
  data: (Follow & { following: User }) [];
} 

// show component if user is following another user or users
export const Following = ({data}: FollowingProps) => {

  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {/* show following label if the sidebar is not collapsed */}
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Following
          </p>
        </div>
      )}

      {/* show users i am following */}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem 
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            // isLive={true}
          />
        ))}
      </ul> 
    </div>
  )
};




export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i}/>
      ))}
    </ul>
  );
};