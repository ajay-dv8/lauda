"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({value}: CopyButtonProps) => {
  // state to change copy icon when user clicks
  const [ isCopied, setIstCopied] = useState(false);

  // copy function
  const onCopy = () => {
    if (!value) return; //do non if there's non to copy, else next line

    setIstCopied(true);
    navigator.clipboard.writeText(value); // copy the value to clipboard
    // show icon to indicate user copied something for 1sec and setIsCopied to false 
    setTimeout(() => {
      setIstCopied(false);
    }, 1000);
  };

  // dynamic copy icon variable; "check and copy" icons
  const Icon = isCopied ? CheckCheck : Copy ;
  return (
    <Button
      variant="ghost"
      onClick={onCopy}
      disabled={!value || isCopied}
      size="sm"
    >
      <Icon className="size-4"/>
    </Button>
  )
}