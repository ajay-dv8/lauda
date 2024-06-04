import { Button } from "@/components/ui/button"
import { UrlCard } from "./_components/url-card"
import { getSelf } from "@/lib/auth-service"
import { getStreamByUserId } from "@/lib/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {

  const self = await getSelf();// to get current user
  const stream = await getStreamByUserId(self.id) //passed self.id to get the stream of the current user

  if (!stream) {
    throw new Error ("Stream not found");
  }


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Keys & URLs
        </h1>

        {/* connect model here */}
        <ConnectModal />

        {/* <Button
          variant="primary"
        >
          Generate
        </Button> */}
      </div>

      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  )
}

export default KeysPage