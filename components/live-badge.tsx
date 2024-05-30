import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div className={cn(
      "bg-green-500 text-center text-[10px] p-0.5 px-1.5 rounded-md uppercase border border-background tracking-wide font-semibold", 
      className
    )}>
      Live
    </div>
  )
}