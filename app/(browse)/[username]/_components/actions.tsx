"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing : boolean;
  userId : string;
}

export const Actions = ({ isFollowing, userId }: ActionProps) => {

  const [isPending, startTransition] = useTransition();

  // follow user onClick
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
      .then((data) => toast.success(`You are now following ${data.following.username}`))
      .catch(() => toast.error("Something went wrong"))
    })
  };

  // unfollow user onClick
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
      .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
      .catch(() => toast.error("Something went wrong"))
    })
  };

  //on button click Unfollow if the user is already being followed
  //on button click follow if the user is not already being followed 
  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }
  return (
    <Button 
      onClick={onClick}
      disabled={isPending}
      variant="primary"
      className=" "
    >
    {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}