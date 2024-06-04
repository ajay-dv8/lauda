"use client";
import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
}

export const KeyCard = ({value}: KeyCardProps) => {
  // to Show hidden key
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">
          Stream key
        </p>

        <div className="w-full space-y-2">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              placeholder="Stream key"
              disabled
            />
            <CopyButton value={value || ""} />
          </div>

          <Button
            size="sm"
            variant="link"
            onClick={() => setShow(!show)}
          >
            { show ? "Hide" : "Show" }
          </Button>
        </div>
      </div>
    </div>
  )
}