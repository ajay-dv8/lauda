"use client";

import { Switch } from "@/components/ui/switch";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

// types of toggles
type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}

export const ToggleCard = ({
  label,
  value,
  field,
}: ToggleCardProps) => {

  const [isPending, startTransition] = useTransition();

  // update stream field types, send toast if success or error  
  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value } )
      .then(() => toast.success("Chat settings updated!"))
      .catch(() => toast.error("Something went wrong"))
    });
  }

  return (
    <div className="p-6 rounded-xl bg-muted">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">
          {label}
        </p>
        <div className="space-y-2">
          {/* to manage chat enabled state */}
          <Switch
            checked={value}
            disabled={isPending}
            onCheckedChange={onChange}
          >
            {value ? "on" : "off"}
          </Switch>
        </div>
      </div>
    </div>
  )
};




export const ToggleCardSkeleton = () => {
  return(
    <Skeleton className="w-full rounded-xl p-10"/>
  )
}