"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

export const ConnectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">
          Generate connection
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type"/>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="WHIP">WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert>
          <AlertTriangle className="size-4"/>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This will reset all active streams using this connection.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between">
          <DialogClose>
            <Button variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          
          <Button
            variant="primary"
            onClick={() => {}}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// RTMP ingress type is used for streaming apps eg OBS