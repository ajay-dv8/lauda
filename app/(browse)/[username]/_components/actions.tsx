"use client";

import { onFollow } from "@/actions/follow";
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
  const onClick = () => {
    startTransition(() => {
      onFollow(userId)
      .then((data) => toast.success(`You are now following ${data.following.username}`))
      .catch(() => toast.error("Something went wrong"))
    })
  };

  return (
    <Button 
      onClick={onClick}
      disabled={isFollowing || isPending}
      variant="primary"
      className=" "
    >
      Follow
    </Button>
  )
}